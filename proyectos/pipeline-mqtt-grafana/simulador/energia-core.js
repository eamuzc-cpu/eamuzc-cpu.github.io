// Monitor de energía eléctrica (didáctico): generador de un medidor con cargas realistas (iluminación, motor,
// resistencia con termostato, variador), mensaje MQTT con su validación (el mismo esquema que publica el firmware del
// ESP32), energía y demanda de 15 min, costo de la cuenta, alertas, detección de anomalías contra el perfil horario
// y armónicos (THD). El MISMO archivo corre en las pruebas (node --test) y dentro de index.html.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory()
  else root.EnergiaCore = factory()
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict'

  const LIMITES = { v: [80, 300], i: [0, 100], p: [0, 25000], pf: [0, 1], f: [45, 65], e: [0, 1e7] }
  const CAMPOS = ['id', 'ts', 'v', 'i', 'p', 'pf', 'f', 'e']
  const redondear = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d
  function prng(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }

  // ---- Mensaje MQTT (mismo esquema que el firmware) ---------------------------------------------------------------------
  const topico = (id) => `planta/energia/${id}`
  function formatoMensaje(l) {
    return JSON.stringify({ id: l.id, ts: Math.round(l.ts), v: redondear(l.v), i: redondear(l.i), p: redondear(l.p, 1), pf: redondear(l.pf), f: redondear(l.f), e: redondear(l.e, 3) })
  }
  function parseMensaje(texto) {
    let o; const errores = []
    try { o = JSON.parse(texto) } catch { return { ok: false, errores: ['no es JSON válido'] } }
    if (!o || typeof o !== 'object' || Array.isArray(o)) return { ok: false, errores: ['el mensaje debe ser un objeto JSON'] }
    for (const k of CAMPOS) if (!(k in o)) errores.push(`falta el campo «${k}»`)
    if ('id' in o && !/^[A-Za-z0-9_-]{1,32}$/.test(String(o.id))) errores.push('id inválido (letras, números, - y _)')
    if ('ts' in o && !(Number.isInteger(o.ts) && o.ts > 1.5e9)) errores.push('ts debe ser un entero Unix en segundos')
    for (const [k, [a, b]] of Object.entries(LIMITES)) if (k in o) { if (typeof o[k] !== 'number' || !Number.isFinite(o[k])) errores.push(`«${k}» debe ser un número`); else if (o[k] < a || o[k] > b) errores.push(`«${k}» fuera de rango (${a} a ${b})`) }
    if (errores.length) return { ok: false, errores }
    return { ok: true, lectura: o, errores: [], plausible: plausible(o) }
  }
  // P ≈ V·I·FP (en monofásico); por debajo de 5 W el ruido del medidor domina
  const plausible = (l) => l.p < 5 || Math.abs(l.p - l.v * l.i * l.pf) / Math.max(l.p, 1) < 0.08

  // ---- Armónicos --------------------------------------------------------------------------------------------------------------
  const ESPECTROS = {
    resistiva: { 1: 1, 3: 0.01, 5: 0.005 },
    motor: { 1: 1, 3: 0.03, 5: 0.04, 7: 0.02 },
    iluminacion: { 1: 1, 3: 0.25, 5: 0.15, 7: 0.08, 9: 0.04 },
    variador: { 1: 1, 5: 0.35, 7: 0.2, 11: 0.09, 13: 0.06 },
  }
  const thd = (esp) => Math.sqrt(Object.entries(esp).filter(([h]) => +h > 1).reduce((a, [, x]) => a + x * x, 0)) / (esp[1] ?? 1)

  // ---- Cargas y medidor simulado ----------------------------------------------------------------------------------------------
  const CARGAS_BASE = [
    { id: 'iluminacion', nombre: 'Iluminación LED', tipo: 'iluminacion', w: 900, pf: 0.9, horario: [6, 22] },
    { id: 'compresor', nombre: 'Compresor de aire', tipo: 'motor', w: 3200, pf: 0.82, ciclo: { periodo: 600, duty: 0.55 }, horario: [5, 23] },
    { id: 'calefactor', nombre: 'Resistencia con termostato', tipo: 'resistiva', w: 2000, pf: 1, ciclo: { periodo: 900, duty: 0.4 }, horario: [0, 24] },
    { id: 'bomba', nombre: 'Bomba con variador', tipo: 'variador', w: 1500, pf: 0.7, horario: [7, 19] },
    { id: 'standby', nombre: 'Equipos en espera (PLC, fuentes)', tipo: 'resistiva', w: 160, pf: 0.8, horario: [0, 24] },
  ]
  // Cada día los ciclos de compresor y termostato varían un poco (producción distinta): sin esto todos los días serían idénticos
  const factorDia = (semilla, dia) => { const r = prng(semilla * 7919 + dia * 104729); return { compresor: 0.88 + 0.24 * r(), calefactor: 0.9 + 0.2 * r() } }
  const activa = (c, t, fase, fd = {}) => {
    const hora = ((t % 86400) / 3600), [h1, h2] = c.horario ?? [0, 24]
    if (!(hora >= h1 && hora < h2)) return false
    return c.ciclo ? ((t + fase) % c.ciclo.periodo) < c.ciclo.periodo * Math.min(1, c.ciclo.duty * (fd[c.id] ?? 1)) : true
  }
  function crearMedidor({ id = 'medidor1', semilla = 11, cargas = CARGAS_BASE, extra = [] } = {}) {
    const r = prng(semilla), fases = Object.fromEntries([...cargas, ...extra].map((c) => [c.id, Math.floor(r() * 900)]))
    return { id, semilla, cargas: [...cargas, ...extra], fases, apagadas: new Set(), e0: 1200 }
  }
  // Lectura instantánea determinista para el segundo t (t = segundos desde las 00:00 del día 0)
  function leer(m, t, opciones = {}) {
    const rn = prng(m.semilla * 100003 + Math.floor(t)), ruido = () => rn() - 0.5
    let P = 0, Q = 0, I2 = 0, Ih2 = 0
    const fd = factorDia(m.semilla, Math.floor(t / 86400))
    for (const c of m.cargas) {
      if (m.apagadas.has(c.id) || !activa(c, t, m.fases[c.id] ?? 0, fd)) continue
      const p = c.w * (1 + 0.02 * ruido()) * (c.tipo === 'variador' ? 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(t / 1800)) : 1)
      P += p; Q += p * Math.tan(Math.acos(c.pf))
    }
    const S = Math.hypot(P, Q), sag = opciones.hueco ? 0.78 : 1
    const v = (230 + 3.2 * Math.sin((2 * Math.PI * t) / 5400) + 1.2 * ruido()) * sag, i = S ? S / v : 0.0, pf = S ? P / S : 1
    for (const c of m.cargas) if (!m.apagadas.has(c.id) && activa(c, t, m.fases[c.id] ?? 0, fd)) { const ic = c.w / (230 * c.pf); I2 += ic * ic; const th = thd(ESPECTROS[c.tipo] ?? ESPECTROS.resistiva); Ih2 += (ic * th) ** 2 }
    return { id: m.id, ts: 1760000000 + Math.floor(t), v, i, p: P, pf, f: 50 + 0.04 * ruido(), e: m.e0, q: Q, s: S, thdI: I2 ? Math.sqrt(Ih2 / I2) : 0 }
  }
  // Espectro de armónicos de la corriente total en el segundo t (cada armónico como fracción de la fundamental)
  function espectroTotal(m, t) {
    const fd = factorDia(m.semilla, Math.floor(t / 86400)), h2 = {}
    let I2 = 0
    for (const c of m.cargas) {
      if (m.apagadas.has(c.id) || !activa(c, t, m.fases[c.id] ?? 0, fd)) continue
      const ic = c.w / (230 * c.pf); I2 += ic * ic
      for (const [h, x] of Object.entries(ESPECTROS[c.tipo] ?? ESPECTROS.resistiva)) if (+h > 1) h2[h] = (h2[h] ?? 0) + (ic * x) ** 2
    }
    const out = {}; for (const h of Object.keys(h2)) out[h] = I2 ? Math.sqrt(h2[h] / I2) : 0
    return out
  }
  // Serie de potencia cada `paso` s durante `dias` días, para los históricos
  function serie(m, dias, paso = 60) {
    const out = []
    for (let t = 0; t < dias * 86400; t += paso) out.push({ t, p: leer(m, t).p })
    return out
  }

  // ---- Energía y demanda --------------------------------------------------------------------------------------------------------
  function crearAcumulador() { return { kwh: 0, t: 0, ventana: 0, wV: 0, demandas: [], pico: 0 } }
  function acumular(a, p, dt) {
    a.kwh += (p * dt) / 3.6e6; a.t += dt; a.ventana += dt; a.wV += p * dt
    if (a.ventana >= 900 - 1e-9) { const kw = a.wV / a.ventana / 1000; a.demandas.push(kw); a.pico = Math.max(a.pico, kw); a.ventana = 0; a.wV = 0 }
    return a
  }
  const factorCarga = (a) => (a.pico > 0 ? a.kwh / (a.t / 3600) / a.pico : 0)
  function resumenDiario(m, dias, paso = 60) {
    const out = []
    for (let d = 0; d < dias; d++) {
      const a = crearAcumulador()
      for (let t = d * 86400; t < (d + 1) * 86400; t += paso) acumular(a, leer(m, t).p, paso)
      out.push({ dia: d, kwh: a.kwh, pico: a.pico, factorCarga: factorCarga(a) })
    }
    return out
  }
  const TARIFA_BASE = { energia: 135, demanda: 9500, fijo: 1200 } // CLP por kWh, por kW de demanda máxima y cargo fijo mensual (supuestos)
  function costoMes({ kwhDia, picoKW }, tarifa = TARIFA_BASE, dias = 30) {
    const energia = kwhDia * dias * tarifa.energia, demanda = picoKW * tarifa.demanda
    return { energia, demanda, fijo: tarifa.fijo, total: energia + demanda + tarifa.fijo }
  }

  // ---- Alertas -------------------------------------------------------------------------------------------------------------------
  function alertas(l, cfg = {}) {
    const c = { vMin: 207, vMax: 253, iMax: 45, pfMin: 0.85, pMinPF: 200, df: 1, ...cfg }, a = []
    if (l.v < c.vMin) a.push({ id: 'TENSION_BAJA', msg: `tensión baja: ${redondear(l.v, 1)} V (mínimo ${c.vMin} V)` })
    if (l.v > c.vMax) a.push({ id: 'TENSION_ALTA', msg: `tensión alta: ${redondear(l.v, 1)} V (máximo ${c.vMax} V)` })
    if (l.i > c.iMax) a.push({ id: 'SOBRECORRIENTE', msg: `corriente alta: ${redondear(l.i, 1)} A (límite ${c.iMax} A)` })
    if (l.p > c.pMinPF && l.pf < c.pfMin) a.push({ id: 'FP_BAJO', msg: `factor de potencia bajo: ${redondear(l.pf)} (mínimo ${c.pfMin})` })
    if (Math.abs(l.f - 50) > c.df) a.push({ id: 'FRECUENCIA', msg: `frecuencia fuera de rango: ${redondear(l.f)} Hz` })
    return a
  }
  const estadoConexion = (ultimoTs, ahoraTs, timeout = 10) => (ahoraTs - ultimoTs > timeout ? 'sin datos' : 'en línea')

  // ---- Anomalías contra el perfil horario --------------------------------------------------------------------------------------
  // Promedio móvil causal de n muestras: quita el ciclo de encendido y apagado de compresores y termostatos antes de comparar
  function suavizar(hist, n) { const q = [], out = []; let s = 0; for (const x of hist) { q.push(x.p); s += x.p; if (q.length > n) s -= q.shift(); out.push({ t: x.t, p: s / q.length }) } return out }
  const TRAMO = 900 // s: el perfil de referencia tiene un valor por cada tramo de 15 min del día
  function perfilHorario(histOriginal, { suave = 15 } = {}) {
    const hist = suavizar(histOriginal, suave), acc = Array.from({ length: 86400 / TRAMO }, () => ({ n: 0, s: 0, s2: 0 }))
    for (const { t, p } of hist) { const k = Math.floor((t % 86400) / TRAMO); acc[k].n++; acc[k].s += p; acc[k].s2 += p * p }
    return acc.map((x) => { const m = x.n ? x.s / x.n : 0; return { media: m, desv: Math.max(Math.sqrt(Math.max(0, x.s2 / Math.max(x.n, 1) - m * m)), 100) } })
  }
  // Eventos donde la potencia supera `z` desviaciones del perfil de esa hora por al menos `minMin` minutos seguidos
  function detectarAnomalias(histOriginal, perfil, { z = 3, minMin = 10, suave = 15 } = {}) {
    const hist = suavizar(histOriginal, suave), ev = []; let ini = null, suma = 0, n = 0
    const cierra = (fin) => { if (ini != null && (fin - ini) / 60 >= minMin) ev.push({ desde: ini, hasta: fin, exceso: suma / n }); ini = null; suma = 0; n = 0 } // exceso = promedio sobre el perfil
    for (const { t, p } of hist) {
      const pr = perfil[Math.floor((t % 86400) / TRAMO)], dev = (p - pr.media) / pr.desv
      if (dev > z) { if (ini == null) ini = t; suma += p - pr.media; n++ } else cierra(t)
    }
    cierra(hist.at(-1)?.t ?? 0)
    return ev
  }

  return { LIMITES, CAMPOS, CARGAS_BASE, ESPECTROS, TARIFA_BASE, topico, formatoMensaje, parseMensaje, plausible, thd, crearMedidor, leer, espectroTotal, serie, crearAcumulador, acumular, factorCarga, resumenDiario, costoMes, alertas, estadoConexion, perfilHorario, detectarAnomalias, redondear }
})

