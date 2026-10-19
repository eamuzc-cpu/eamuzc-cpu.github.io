# Verifica el pipeline de punta a punta (requiere que `docker compose up -d --build --wait` ya haya terminado):
#   1) los cinco servicios están sanos   2) hay mensajes MQTT   3) InfluxDB recibe puntos de energía y de proceso
#   4) Grafana responde, su fuente de datos está conectada y el tablero provisionado existe
# Uso:  powershell -ExecutionPolicy Bypass -File .\verificar.ps1 [-EsperaSeg 40]
param([int]$EsperaSeg = 40)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# Valores de .env si existe; si no, los de prueba que usa docker-compose.yml
$cfg = @{ INFLUX_TOKEN = 'token-de-prueba-cambiar'; INFLUX_ORG = 'planta'; INFLUX_BUCKET = 'planta'; GRAFANA_USUARIO = 'admin'; GRAFANA_CLAVE = 'clave-de-prueba-123' }
if (Test-Path .env) { Get-Content .env | Where-Object { $_ -match '^\s*([A-Z_]+)=(.*)$' } | ForEach-Object { $cfg[$Matches[1]] = $Matches[2].Trim() } }

$fallos = @()
function Comprobar($nombre, $ok, $detalle = '') { $marca = if ($ok) { 'OK ' } else { 'FALLA' }; Write-Host ("[{0}] {1} {2}" -f $marca, $nombre, $detalle); if (-not $ok) { $script:fallos += $nombre } }

# 1) servicios sanos
$servicios = docker compose ps --format json | ForEach-Object { $_ | ConvertFrom-Json }
foreach ($s in $servicios) { Comprobar "servicio $($s.Service)" ($s.State -eq 'running' -and ($s.Health -eq 'healthy' -or $s.Health -eq '')) "($($s.State) $($s.Health))" }

Write-Host "Esperando $EsperaSeg s para acumular datos..."; Start-Sleep -Seconds $EsperaSeg

# 2) mensajes MQTT en el broker
$mensajes = docker compose exec -T mosquitto mosquitto_sub -h localhost -t 'planta/#' -C 4 -W 15 -v 2>$null
Comprobar 'mensajes MQTT en planta/#' (($mensajes | Measure-Object).Count -ge 2) "($(($mensajes | Measure-Object).Count) recibidos)"
$mensajes | Select-Object -First 2 | ForEach-Object { Write-Host "      $_" }

# 3) puntos en InfluxDB por medición (últimos 10 minutos)
$flux = @"
from(bucket: "$($cfg.INFLUX_BUCKET)") |> range(start: -10m) |> filter(fn: (r) => r._field == "v" or r._field == "temp") |> group(columns: ["_measurement"]) |> count()
"@
$csv = Invoke-RestMethod -Method Post -Uri "http://localhost:8086/api/v2/query?org=$($cfg.INFLUX_ORG)" -Headers @{ Authorization = "Token $($cfg.INFLUX_TOKEN)" } -ContentType 'application/vnd.flux' -Body $flux
$filas = $csv -split "`n" | Where-Object { $_ -match ',_result,' } | ForEach-Object { $c = ($_.Trim()) -split ','; [pscustomobject]@{ Medicion = $c[6]; Puntos = [int]$c[5] } }
foreach ($m in 'energia', 'proceso') { $n = ($filas | Where-Object Medicion -eq $m).Puntos; Comprobar "InfluxDB recibe «$m»" ($n -ge 5) "($n puntos)" }

# 4) Grafana
$salud = Invoke-RestMethod -Uri 'http://localhost:3000/api/health'
Comprobar 'Grafana responde' ($salud.database -eq 'ok') "(versión $($salud.version))"
$auth = @{ Authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($cfg.GRAFANA_USUARIO):$($cfg.GRAFANA_CLAVE)")) }
$ds = Invoke-RestMethod -Uri 'http://localhost:3000/api/datasources/uid/influx-planta/health' -Headers $auth
Comprobar 'fuente de datos InfluxDB conectada' ($ds.status -eq 'OK') "($($ds.message))"
$tablero = Invoke-RestMethod -Uri 'http://localhost:3000/api/search?type=dash-db' -Headers $auth
Comprobar 'tablero provisionado' (($tablero | Where-Object uid -eq 'planta') -ne $null) "($(@($tablero).Count) tablero(s) en Grafana)"

if ($fallos.Count) { Write-Host "`nFALLARON: $($fallos -join '; ')" -ForegroundColor Red; exit 1 }
Write-Host "`nTodo en orden. Abre http://localhost:3000" -ForegroundColor Green
