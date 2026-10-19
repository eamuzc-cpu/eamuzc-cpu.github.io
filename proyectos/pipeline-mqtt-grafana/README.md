# Pipeline de telemetría industrial: MQTT → Telegraf → InfluxDB → Grafana

Pila de cinco contenedores con Docker Compose que recibe mensajes MQTT de una planta (un medidor de energía como el del
ESP32 del proyecto `monitor-energia-esp32` y un pasteurizador simulado), los guarda en una base de series de tiempo y los muestra
en un tablero de Grafana ya provisionado. Se levanta con un solo comando y quedó **probada de punta a punta**
(`verificar.ps1`).

```
 simulador ──MQTT──▶ Mosquitto ──▶ Telegraf ──▶ InfluxDB 2 ──Flux──▶ Grafana
 (o el ESP32)       :1883        json_v2       :8086                 :3000
```

| Servicio | Imagen | Función |
|---|---|---|
| `mosquitto` | `eclipse-mosquitto:2.0` | broker MQTT (persistencia y *healthcheck*) |
| `telegraf` | `telegraf:1.32` | consume `planta/energia/+` y `planta/proceso/+`, interpreta el JSON y escribe en InfluxDB con la hora del mensaje |
| `influxdb` | `influxdb:2.7` | series de tiempo; organización, bucket, token y retención de 30 días creados al iniciar |
| `grafana` | `grafana/grafana-oss:11.2.0` | fuente de datos Flux y tablero «Planta: energía y proceso» provisionados desde archivos |
| `simulador` | `node:22-alpine` (build local) | publica un medidor con cinco cargas y un pasteurizador con fallas de vapor periódicas |

## Cómo ejecutarlo
Requisitos: Docker Desktop (o Docker Engine con Compose v2) y unos 1,5 GB de descarga la primera vez.

```powershell
cd proyectos/pipeline-mqtt-grafana
docker compose up -d --build --wait     # espera a que los servicios estén sanos
powershell -ExecutionPolicy Bypass -File .\verificar.ps1    # comprueba MQTT, InfluxDB y Grafana
```
Abre http://localhost:3000 (visor sin login) y espera 1 a 2 minutos para ver series completas.
Para administrar Grafana: usuario `admin` y la clave de `.env` (por defecto, una clave de prueba).

Para cambiar claves, copia `.env.example` como `.env` **antes** del primer arranque. Para borrar todo, incluidos los datos:
`docker compose down -v`.

## Lo que verifica `verificar.ps1`
1. Los cinco servicios están en ejecución y los que tienen *healthcheck* están sanos.
2. Llegan mensajes por MQTT en `planta/#`.
3. InfluxDB recibe puntos de las mediciones `energia` y `proceso`.
4. Grafana responde, su fuente de datos está conectada y el tablero provisionado existe.

Resultado en el equipo de desarrollo (Docker Desktop 29, Windows 10): 5/5 servicios sanos, 56 puntos de cada medición tras 2 minutos y la latencia del
mensaje desde que se publica hasta que se puede consultar en InfluxDB fue de **0,23 s de mediana (máximo 2,3 s)** en 5 intentos.

## Mensajes
```json
planta/energia/medidor1   {"id":"medidor1","ts":1760000000,"v":229.8,"i":3.42,"p":742.1,"pf":0.95,"f":50.01,"e":123.456}
planta/proceso/htst1      {"id":"htst1","ts":1760000000,"temp":72.4,"sp":72,"flujo":5004,"desvio":0,"vapor":55.2}
```
`ts` es la hora Unix en segundos; Telegraf la usa como marca de tiempo del punto. Un mensaje que no es JSON válido se descarta y queda
registrado en el log de Telegraf (`docker compose logs telegraf`).

## Decisiones de diseño
- **Telegraf en vez de Node-RED** para la ingesta: es declarativo (un archivo de configuración), no necesita instalar nodos y es más fácil de revisar
  y de versionar. Node-RED tiene sentido si hay lógica de flujo o alarmas por reglas.
- **Aprovisionamiento por archivos** (fuente de datos y tablero): el tablero se reconstruye igual en cualquier equipo, sin pasos manuales.
- **Flux** como lenguaje de consulta de InfluxDB 2 (`aggregateWindow` con `v.windowPeriod` para que cada panel pida lo justo).
- **`depends_on` con `service_healthy`** y `restart: unless-stopped` para un arranque ordenado y una recuperación sencilla.
- Los puertos quedan atados a `127.0.0.1`: nada se publica a la red.

## Seguridad: qué falta para usarlo fuera de tu equipo
Es una pila de **pruebas y aprendizaje**. Antes de exponerla:
- Broker con usuario y clave (`mosquitto_passwd`), TLS en 8883 y ACL por tópico (hoy permite anónimos).
- Quitar el acceso anónimo de Grafana (`GF_AUTH_ANONYMOUS_ENABLED`) y poner un proxy inverso con HTTPS.
- Cambiar todas las claves y el token por valores largos y aleatorios (`.env`), y no subir `.env` al repositorio (ya está en `.gitignore`).
- Copias de seguridad de los volúmenes `influx-datos` y `grafana-datos`.

## Archivos
```
docker-compose.yml           los cinco servicios, volúmenes y healthchecks
mosquitto/mosquitto.conf     broker de pruebas
telegraf/telegraf.conf       entradas MQTT (json_v2) y salida a InfluxDB
grafana/provisioning/        fuente de datos y proveedor de tableros
grafana/dashboards/planta.json
simulador/                   publicador de datos (Node 22) y su Dockerfile
verificar.ps1                prueba de punta a punta
.env.example                 variables de ejemplo
```
