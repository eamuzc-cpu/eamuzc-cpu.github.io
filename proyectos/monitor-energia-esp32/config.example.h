// Copia este archivo como config.h y completa tus datos. config.h NO se sube al repositorio (ver .gitignore).
#pragma once

#define WIFI_SSID "mi-red"
#define WIFI_CLAVE "mi-clave"

#define MQTT_SERVIDOR "192.168.1.50"  // IP de tu broker (por ejemplo, el del pipeline en Docker)
#define MQTT_PUERTO 1883
#define MQTT_USUARIO ""               // vacío = sin autenticación (solo para una red local de pruebas)
#define MQTT_CLAVE ""

#define ID_MEDIDOR "medidor1"         // letras, números, - y _ (máx. 32): forma el tópico planta/energia/<id>
#define PUBLICAR_MS 2000

// 1 = no hay PZEM conectado: publica datos simulados de un motor que cicla (para probar la red y el pipeline)
#define MODO_SIMULADO 1

// UART2 del ESP32 hacia el PZEM-004T v3 (9600 baudios, Modbus-RTU)
#define PIN_RX_PZEM 16  // recibe lo que sale del TX del PZEM
#define PIN_TX_PZEM 17
