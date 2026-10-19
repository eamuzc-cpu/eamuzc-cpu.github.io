# Monitor de energía con ESP32 y PZEM-004T → MQTT

Firmware de Arduino para medir tensión, corriente, potencia, energía, frecuencia y factor de potencia, y publicarlos por MQTT.
El panel interactivo del portafolio (`demos/monitor-energia-esp32`) usa **datos simulados** con el mismo esquema de mensaje.

> **Estado:** escrito y revisado contra la documentación de las bibliotecas, **sin probar aún en hardware real**.
> Lo verificado con pruebas automáticas es el esquema del mensaje, su validación y los cálculos del panel (15 pruebas).

> **Compatibilidad:** escrito para el núcleo Arduino-ESP32 2.x. En el 3.x la función `esp_task_wdt_init` recibe una estructura
> de configuración: hay que adaptar esa única línea de `setup()`.

## Materiales
- ESP32 Dev Module.
- Medidor PZEM-004T v3.0 (con pinza amperimétrica de 100 A) o la variante equivalente.
- Fuente de 5 V para el módulo y una caja cerrada.

## Conexión
| PZEM-004T v3 | ESP32 | Nota |
|---|---|---|
| TX | GPIO16 (RX2) | UART2, 9600 baudios, Modbus-RTU |
| RX | GPIO17 (TX2) | |
| 5 V | 5 V (VIN) | alimenta los optoacopladores del módulo |
| GND | GND | |

**Seguridad:** el módulo mide la red de 220 V. Instálalo en una caja cerrada, con protección aguas arriba y por una persona
calificada. Para practicar sin riesgo usa `MODO_SIMULADO 1` (no necesita el PZEM).

## Cómo usarlo
1. Instala en el Arduino IDE las bibliotecas **PubSubClient** y **PZEM-004T-v30**, y la placa «ESP32 Dev Module».
2. Copia `config.example.h` como `config.h` y completa Wi-Fi, broker y `ID_MEDIDOR`.
3. Compila y sube `monitor-energia.ino`. Con `MODO_SIMULADO 1` publica un motor que cicla; con `0` lee el PZEM.
4. Comprueba con cualquier cliente MQTT:
   ```
   mosquitto_sub -h <broker> -t "planta/energia/#" -v
   ```

## Mensaje
Tópico `planta/energia/<id>`, QoS 0, cada 2 s:
```json
{"id":"medidor1","ts":1760000000,"v":229.8,"i":3.42,"p":742.1,"pf":0.95,"f":50.01,"e":123.456}
```
| Campo | Unidad | Rango aceptado por el validador |
|---|---|---|
| `ts` | s (Unix, UTC) | entero > 1,5·10⁹ |
| `v` | V | 80 a 300 |
| `i` | A | 0 a 100 |
| `p` | W | 0 a 25 000 |
| `pf` | – | 0 a 1 |
| `f` | Hz | 45 a 65 |
| `e` | kWh acumulados | 0 a 10⁷ |

Además publica `planta/energia/<id>/estado` (retenido): `online`, `offline` (última voluntad) o `error_medidor`.

## Comportamiento
- Reconexión de Wi-Fi y de MQTT con espera creciente (1 s hasta 30 s), sin bloquear el `loop`.
- Perro guardián de 30 s: reinicia el ESP32 si se cuelga.
- No publica hasta tener hora válida por NTP, para no enviar un `ts` incorrecto.
- Si el PZEM no responde (valores `NaN`), avisa por el tópico de estado en vez de enviar datos falsos.

## Pipeline
Este mismo mensaje lo consume `proyectos/pipeline-mqtt-grafana` (Mosquitto → Telegraf → InfluxDB → Grafana con Docker Compose).

## Pendiente
- Probar con un PZEM real y contrastar contra un multímetro o pinza calibrada.
- Autenticación y TLS en el broker para uso fuera de una red local de pruebas.
