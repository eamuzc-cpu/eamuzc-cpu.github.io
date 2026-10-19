// Simulador de planta: publica por MQTT lo que publicaría el firmware del ESP32 (energía) y un pasteurizador (proceso).
//   planta/energia/medidor1   {"id","ts","v","i","p","pf","f","e"}
//   planta/proceso/htst1      {"id","ts","temp","sp","flujo","desvio","vapor"}
// El tiempo de la planta corre ACELERACION veces más rápido que el real para que los ciclos se vean en minutos.
'use strict'
const mqtt = require('mqtt')
const E = require('./energia-core.js')

const URL = process.env.MQTT_URL ?? 'mqtt://localhost:1883'
const ACEL = Number(process.env.ACELERACION ?? 30)
const PERIODO_MS = Number(process.env.PERIODO_MS ?? 2000)
const medidor = E.crearMedidor({ id: 'medidor1', semilla: 11 })
const t0 = Date.now()
let acumKwh = 0

// Segundos de planta desde las 06:00 del día 15 (los 14 días anteriores son «historia» del generador)
const tPlanta = () => 14 * 86400 + 6 * 3600 + ((Date.now() - t0) / 1000) * ACEL
const ruido = (a) => (Math.random() - 0.5) * 2 * a

const cliente = mqtt.connect(URL, {
  clientId: `simulador-planta-${process.pid}`,
  reconnectPeriod: 2000,
  will: { topic: 'planta/simulador/estado', payload: 'offline', qos: 1, retain: true },
})
cliente.on('connect', () => { console.log(`conectado a ${URL}, aceleración ×${ACEL}`); cliente.publish('planta/simulador/estado', 'online', { qos: 1, retain: true }) })
cliente.on('error', (e) => console.error('MQTT:', e.message))
cliente.on('reconnect', () => console.log('reconectando…'))

function pasteurizador(tp) {
  // Cada 30 min de planta hay una falla de vapor de 60 s: la temperatura cae bajo 72 °C y la válvula desvía el producto
  const enFalla = tp % 1800 >= 1500 && tp % 1800 < 1560
  const caida = enFalla ? Math.min(2.2, ((tp % 1800) - 1500) / 12) : 0
  const temp = 72.4 + 0.3 * Math.sin(tp / 90) + ruido(0.05) - caida
  return {
    id: 'htst1', ts: Math.floor(Date.now() / 1000), temp: Math.round(temp * 100) / 100, sp: 72,
    flujo: Math.round(5000 + ruido(40)), desvio: temp < 72 ? 1 : 0, vapor: Math.round((55 + 4 * Math.sin(tp / 70) + (enFalla ? 25 : 0) + ruido(1)) * 10) / 10,
  }
}

function publicar() {
  if (!cliente.connected) return
  const tp = tPlanta(), l = E.leer(medidor, tp)
  acumKwh += (l.p * (PERIODO_MS / 1000) * ACEL) / 3.6e6
  const energia = E.formatoMensaje({ ...l, ts: Math.floor(Date.now() / 1000), e: 1200 + acumKwh })
  cliente.publish(E.topico('medidor1'), energia, { qos: 0 })
  cliente.publish('planta/proceso/htst1', JSON.stringify(pasteurizador(tp)), { qos: 0 })
}
setInterval(publicar, PERIODO_MS)
process.on('SIGTERM', () => { cliente.publish('planta/simulador/estado', 'offline', { qos: 1, retain: true }, () => process.exit(0)) })
