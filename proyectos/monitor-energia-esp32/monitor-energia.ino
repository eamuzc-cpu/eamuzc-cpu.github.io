/*
 * Monitor de energía con ESP32 + PZEM-004T v3.0 -> MQTT
 *
 * Lee tensión, corriente, potencia, energía, frecuencia y factor de potencia por UART (Modbus-RTU) y los publica
 * como JSON cada PUBLICAR_MS en  planta/energia/<ID_MEDIDOR>  con QoS 0. Mantiene un estado «online/offline»
 * retenido en  planta/energia/<ID_MEDIDOR>/estado  (última voluntad del cliente MQTT).
 *
 * ESTADO: escrito y revisado contra las bibliotecas indicadas; NO probado todavía en hardware real.
 * Bibliotecas (Arduino IDE o PlatformIO): PubSubClient (Nick O'Leary) y PZEM-004T-v30 (Jakub Mandula).
 * Placa: ESP32 Dev Module. Copia config.example.h a config.h y completa tus datos.
 *
 * SEGURIDAD: el PZEM-004T se conecta a la red de 220 V. Instálalo en una caja cerrada, con protección aguas arriba y por
 * una persona calificada. Para pruebas sin riesgo usa la variante con pinza amperimétrica sobre un cable aislado.
 */
#include <WiFi.h>
#include <PubSubClient.h>
#include <esp_task_wdt.h>
#include <time.h>
#include "config.h"

#if !MODO_SIMULADO
#include <PZEM004Tv30.h>
PZEM004Tv30 pzem(Serial2, PIN_RX_PZEM, PIN_TX_PZEM);
#endif

WiFiClient red;
PubSubClient mqtt(red);

char topicDatos[64];
char topicEstado[72];
unsigned long ultimoEnvio = 0;
unsigned long proximoIntentoMqtt = 0;
unsigned int esperaMqttMs = 1000;   // espera creciente entre reconexiones (hasta 30 s)
float energiaSimuladaKwh = 1200.0f; // solo para el modo simulado

// ---------------------------------------------------------------------------------------------------------
void conectarWifi() {
  if (WiFi.status() == WL_CONNECTED) return;
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_CLAVE);
  unsigned long ini = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - ini < 15000) {
    delay(250);
    esp_task_wdt_reset();
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("WiFi conectado, IP %s\n", WiFi.localIP().toString().c_str());
    configTime(0, 0, "pool.ntp.org", "time.google.com");  // hora UTC para el campo ts
  } else {
    Serial.println("WiFi sin conexión: se reintenta en el próximo ciclo");
  }
}

// Reconexión con espera creciente (1 s, 2 s, 4 s ... 30 s); no bloquea el loop.
void conectarMqtt() {
  if (mqtt.connected() || WiFi.status() != WL_CONNECTED) return;
  if (millis() < proximoIntentoMqtt) return;
  String idCliente = String("esp32-") + ID_MEDIDOR + "-" + String((uint32_t)ESP.getEfuseMac(), HEX);
  // connect(id, usuario, clave, topicVoluntad, qos, retener, mensajeVoluntad)
  bool ok = (strlen(MQTT_USUARIO) > 0)
                ? mqtt.connect(idCliente.c_str(), MQTT_USUARIO, MQTT_CLAVE, topicEstado, 1, true, "offline")
                : mqtt.connect(idCliente.c_str(), nullptr, nullptr, topicEstado, 1, true, "offline");
  if (ok) {
    Serial.println("MQTT conectado");
    mqtt.publish(topicEstado, "online", true);
    esperaMqttMs = 1000;
  } else {
    Serial.printf("MQTT falló (rc=%d), reintento en %u ms\n", mqtt.state(), esperaMqttMs);
    proximoIntentoMqtt = millis() + esperaMqttMs;
    esperaMqttMs = min(esperaMqttMs * 2, 30000u);
  }
}

// Lectura del medidor. Devuelve false si el PZEM no responde (valores NaN).
bool leerMedidor(float &v, float &i, float &p, float &e, float &f, float &pf) {
#if MODO_SIMULADO
  float t = millis() / 1000.0f;
  v = 230.0f + 3.0f * sinf(t / 600.0f);
  float duty = (fmodf(t, 600.0f) < 330.0f) ? 1.0f : 0.0f;  // un motor que cicla
  p = 180.0f + 3000.0f * duty;
  pf = duty > 0 ? 0.82f : 0.8f;
  i = p / (v * pf);
  f = 50.0f;
  energiaSimuladaKwh += p * (PUBLICAR_MS / 1000.0f) / 3.6e6f;
  e = energiaSimuladaKwh;
  return true;
#else
  v = pzem.voltage();
  i = pzem.current();
  p = pzem.power();
  e = pzem.energy();
  f = pzem.frequency();
  pf = pzem.pf();
  return !(isnan(v) || isnan(i) || isnan(p) || isnan(e) || isnan(f) || isnan(pf));
#endif
}

void publicarLectura() {
  float v, i, p, e, f, pf;
  if (!leerMedidor(v, i, p, e, f, pf)) {
    Serial.println("PZEM sin respuesta: revisa el cableado TX/RX y la alimentación de 5 V");
    mqtt.publish(topicEstado, "error_medidor", true);
    return;
  }
  time_t ahora = time(nullptr);
  if (ahora < 1700000000) return;  // aún sin hora válida por NTP: no publiques un ts incorrecto
  // Mismo esquema y orden de campos que valida el panel web (id, ts, v, i, p, pf, f, e)
  char carga[160];
  int n = snprintf(carga, sizeof(carga),
                   "{\"id\":\"%s\",\"ts\":%lu,\"v\":%.2f,\"i\":%.2f,\"p\":%.1f,\"pf\":%.2f,\"f\":%.2f,\"e\":%.3f}",
                   ID_MEDIDOR, (unsigned long)ahora, v, i, p, pf, f, e);
  if (n > 0 && n < (int)sizeof(carga)) {
    mqtt.publish(topicDatos, carga, false);
    Serial.println(carga);
  }
}

void setup() {
  Serial.begin(115200);
  snprintf(topicDatos, sizeof(topicDatos), "planta/energia/%s", ID_MEDIDOR);
  snprintf(topicEstado, sizeof(topicEstado), "planta/energia/%s/estado", ID_MEDIDOR);
  esp_task_wdt_init(30, true);  // perro guardián de 30 s: si el loop se cuelga, reinicia
  esp_task_wdt_add(NULL);
  mqtt.setServer(MQTT_SERVIDOR, MQTT_PUERTO);
  mqtt.setKeepAlive(30);
  conectarWifi();
}

void loop() {
  esp_task_wdt_reset();
  conectarWifi();
  conectarMqtt();
  mqtt.loop();
  if (mqtt.connected() && millis() - ultimoEnvio >= PUBLICAR_MS) {
    ultimoEnvio = millis();
    publicarLectura();
  }
}
