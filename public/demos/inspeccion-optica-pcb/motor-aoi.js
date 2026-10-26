/*
 * Motor de inspección óptica de PCB para el navegador (OpenCV.js).
 * Es el mismo método del inspector en Python: alineación ORB + RANSAC refinada con ECC,
 * diferencia con polaridad contra la referencia, banda de tolerancia en los bordes y
 * clasificación por topología (qué conductores toca o separa cada defecto).
 *
 * Uso:  const motor = MotorAOI.crear(cv);
 *       const r = motor.inspeccionar(referenciaGris, placaGris, { cobreClaro: false });
 * referenciaGris y placaGris son cv.Mat CV_8UC1; quien llama los crea y los libera.
 */
(function (raiz) {
  'use strict';

  const CRITICOS = new Set(['cortocircuito', 'pista_abierta', 'pad_ausente']);
  // Calibrados con 1000 pares de entrenamiento del conjunto DeepPCB (mismos valores que el inspector en Python)
  const PARAMETROS = { tolerancia: 1, agrupar: 2, areaMin: 15, anchoMin: 2.1, minInliers: 20 };

  function crear(cv) {
    const EPS = cv.TermCriteria_EPS ?? 2;
    const COUNT = cv.TermCriteria_COUNT ?? 1;
    const borrar = (...mats) => mats.forEach((m) => m && !m.isDeleted() && m.delete());

    function disco(r) {
      return cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(2 * r + 1, 2 * r + 1));
    }

    function suavizar(gris) {
      const s = new cv.Mat();
      cv.GaussianBlur(gris, s, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT);
      return s;
    }

    function binarizar(gris, cobreClaro) {
      const s = suavizar(gris);
      const b = new cv.Mat();
      cv.threshold(s, b, 0, 255, (cobreClaro ? cv.THRESH_BINARY : cv.THRESH_BINARY_INV) + cv.THRESH_OTSU);
      s.delete();
      return b;
    }

    // ---------- álgebra de 3×3 ----------
    function inv3(m) {
      const [a, b, c, d, e, f, g, h, i] = m;
      const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
      const det = a * A + b * B + c * C;
      const r = [A, -(b * i - c * h), b * f - c * e, B, a * i - c * g, -(a * f - c * d), C, -(a * h - b * g), a * e - b * d];
      return r.map((v) => v / det);
    }
    const normal = (m) => m.map((v) => v / m[8]);
    function aplicar(H, x, y) {
      const w = H[6] * x + H[7] * y + H[8];
      return [(H[0] * x + H[1] * y + H[2]) / w, (H[3] * x + H[4] * y + H[5]) / w];
    }

    // ---------- alineación ----------
    function orb(g, t) {
      const det = new cv.ORB(4000);
      const k1 = new cv.KeyPointVector(), k2 = new cv.KeyPointVector();
      const d1 = new cv.Mat(), d2 = new cv.Mat(), nada = new cv.Mat();
      const bf = new cv.BFMatcher(cv.NORM_HAMMING, false);
      const pares = new cv.DMatchVectorVector();
      let src = null, dst = null, mascara = null, H = null;
      try {
        det.detectAndCompute(g, nada, k1, d1);
        det.detectAndCompute(t, nada, k2, d2);
        if (d1.rows < 4 || d2.rows < 4) throw new Error('pocos puntos ORB');
        bf.knnMatch(d1, d2, pares, 2);
        const buenos = [];
        for (let i = 0; i < pares.size(); i++) {
          const m = pares.get(i);
          if (m.size() === 2 && m.get(0).distance < 0.75 * m.get(1).distance) buenos.push(m.get(0));  // razón de Lowe
          m.delete();
        }
        buenos.sort((a, b) => a.distance - b.distance);
        const usados = buenos.slice(0, 400);
        if (usados.length < 4) throw new Error('pocos emparejamientos');
        const ps = [], pd = [];
        for (const m of usados) {
          const a = k2.get(m.trainIdx).pt, b = k1.get(m.queryIdx).pt;
          ps.push(a.x, a.y);
          pd.push(b.x, b.y);
        }
        src = cv.matFromArray(usados.length, 1, cv.CV_32FC2, ps);
        dst = cv.matFromArray(usados.length, 1, cv.CV_32FC2, pd);
        mascara = new cv.Mat();
        H = cv.findHomography(src, dst, cv.RANSAC, 3.0, mascara);
        const inliers = mascara.empty() ? 0 : cv.countNonZero(mascara);
        if (H.empty() || inliers < PARAMETROS.minInliers) throw new Error('pocos inliers');
        return { H: Array.from(H.data64F), inliers };
      } finally {
        borrar(det, k1, k2, d1, d2, nada, bf, pares, src, dst, mascara, H);
      }
    }

    // Respaldo para placas con pocas esquinas: la traslación que menos píxeles deja distintos.
    function traslacion(G, T) {
      const w = G.cols, h = G.rows;
      const f = 4;
      const gr = new cv.Mat(), tr = new cv.Mat();
      cv.resize(G, gr, new cv.Size(Math.round(w / f), Math.round(h / f)), 0, 0, cv.INTER_AREA);
      cv.resize(T, tr, new cv.Size(Math.round(w / f), Math.round(h / f)), 0, 0, cv.INTER_AREA);
      const distintosEn = (A, B, aw, ah, dx, dy, paso) => {
        let distintos = 0, total = 0;
        for (let y = Math.max(0, -dy); y < Math.min(ah, ah - dy); y += paso) {
          for (let x = Math.max(0, -dx); x < Math.min(aw, aw - dx); x += paso) {
            total++;
            if ((A[y * aw + x] > 127) !== (B[(y + dy) * aw + x + dx] > 127)) distintos++;
          }
        }
        return total ? distintos / total : 1;
      };
      let mejor = [0, 0], valor = Infinity;
      for (let dy = -8; dy <= 8; dy++) {
        for (let dx = -8; dx <= 8; dx++) {
          const v = distintosEn(gr.data, tr.data, gr.cols, gr.rows, dx, dy, 1);
          if (v < valor) { valor = v; mejor = [dx, dy]; }
        }
      }
      borrar(gr, tr);
      let fino = [mejor[0] * f, mejor[1] * f];
      valor = Infinity;
      const base = fino.slice();
      for (let dy = -f; dy <= f; dy++) {
        for (let dx = -f; dx <= f; dx++) {
          const v = distintosEn(G.data, T.data, w, h, base[0] + dx, base[1] + dy, 2);
          if (v < valor) { valor = v; fino = [base[0] + dx, base[1] + dy]; }
        }
      }
      return [1, 0, -fino[0], 0, 1, -fino[1], 0, 0, 1];  // prueba → referencia
    }

    function ecc(g, t, H, homografia) {
      const W = normal(inv3(H));  // ECC trabaja en la dirección referencia → prueba
      const warp = homografia ? cv.matFromArray(3, 3, cv.CV_32F, W) : cv.matFromArray(2, 3, cv.CV_32F, W.slice(0, 6));
      const gf = new cv.Mat(), tf = new cv.Mat(), nada = new cv.Mat();
      g.convertTo(gf, cv.CV_32F);
      t.convertTo(tf, cv.CV_32F);
      try {
        cv.findTransformECC(gf, tf, warp, homografia ? cv.MOTION_HOMOGRAPHY : cv.MOTION_AFFINE,
          new cv.TermCriteria(EPS | COUNT, 60, 1e-6), nada, 5);
        const w = Array.from(warp.data32F);
        if (!homografia) w.push(0, 0, 1);
        return normal(inv3(w));
      } catch (e) {
        return null;
      } finally {
        borrar(warp, gf, tf, nada);
      }
    }

    function deformar(img, H, w, h, interp) {
      const M = cv.matFromArray(3, 3, cv.CV_64F, H);
      const out = new cv.Mat();
      cv.warpPerspective(img, out, M, new cv.Size(w, h), interp, cv.BORDER_CONSTANT, new cv.Scalar(0));
      M.delete();
      return out;
    }

    function zonaValida(test, H, w, h) {
      const unos = new cv.Mat(test.rows, test.cols, cv.CV_8UC1, new cv.Scalar(255));
      const cubierto = deformar(unos, H, w, h, cv.INTER_LINEAR);
      const lleno = new cv.Mat();
      cv.threshold(cubierto, lleno, 254, 255, cv.THRESH_BINARY);
      const k = disco(2), v = new cv.Mat();
      cv.erode(lleno, v, k);
      borrar(unos, cubierto, lleno, k);
      return v;
    }

    function desajuste(G, test, H, cobreClaro) {
      const al = deformar(test, H, G.cols, G.rows, cv.INTER_LINEAR);
      const T = binarizar(al, cobreClaro);
      const v = zonaValida(test, H, G.cols, G.rows);
      let distintos = 0, total = 0;
      const g = G.data, t = T.data, z = v.data;
      for (let i = 0; i < g.length; i++) {
        if (z[i]) { total++; if (g[i] !== t[i]) distintos++; }
      }
      borrar(al, T, v);
      return total ? distintos / total : 1;
    }

    function alinear(gold, test, cobreClaro) {
      const sg = suavizar(gold), st = suavizar(test);
      const G = binarizar(gold, cobreClaro);
      try {
        let H, inliers = 0, base = 'orb';
        try {
          ({ H, inliers } = orb(sg, st));
        } catch (e) {
          if (gold.rows !== test.rows || gold.cols !== test.cols) throw new Error('No se pudo alinear la placa con la referencia.');
          const T0 = binarizar(test, cobreClaro);
          H = traslacion(G, T0);
          T0.delete();
          base = 'traslacion';
        }
        const candidatos = [[base, H]];
        for (const homografia of [true, false]) {
          const H2 = ecc(sg, st, H, homografia);
          if (H2) { candidatos.push([base + (homografia ? '+ecc' : '+ecc_afin'), H2]); break; }
        }
        let elegido = candidatos[0];
        if (candidatos.length > 1) {
          let mejor = Infinity;
          for (const c of candidatos) {
            const v = desajuste(G, test, c[1], cobreClaro);
            if (v < mejor) { mejor = v; elegido = c; }
          }
        }
        return { H: elegido[1], metodo: elegido[0], inliers };
      } finally {
        borrar(sg, st, G);
      }
    }

    // ---------- morfología en ventanas pequeñas (cruz 3×3, como MORPH_ELLIPSE de 3×3) ----------
    function dilatarCruz(a, w, h, veces) {
      let cur = a;
      for (let k = 0; k < veces; k++) {
        const nx = new Uint8Array(cur.length);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = y * w + x;
            nx[i] = cur[i] || (x > 0 && cur[i - 1]) || (x < w - 1 && cur[i + 1]) || (y > 0 && cur[i - w]) || (y < h - 1 && cur[i + w]) ? 1 : 0;
          }
        }
        cur = nx;
      }
      return cur;
    }

    function componentes8(a, w, h) {
      const lab = new Int32Array(a.length);
      let n = 0;
      const pila = [];
      for (let i = 0; i < a.length; i++) {
        if (!a[i] || lab[i]) continue;
        n++;
        lab[i] = n;
        pila.push(i);
        while (pila.length) {
          const j = pila.pop(), x = j % w, y = (j - x) / w;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const xx = x + dx, yy = y + dy;
              if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
              const k = yy * w + xx;
              if (a[k] && !lab[k]) { lab[k] = n; pila.push(k); }
            }
          }
        }
      }
      return lab;
    }

    // ---------- clasificación por topología ----------
    function clasificar(polaridad, D, ventana, ctx) {
      const [vx1, vy1, vx2, vy2] = ventana;
      const vw = vx2 - vx1, vh = vy2 - vy1, W = ctx.w, tol = PARAMETROS.tolerancia;
      const Gv = new Uint8Array(vw * vh), Tv = new Uint8Array(vw * vh), Lv = new Int32Array(vw * vh);
      for (let y = 0; y < vh; y++) {
        for (let x = 0; x < vw; x++) {
          const i = (vy1 + y) * W + vx1 + x, j = y * vw + x;
          Gv[j] = ctx.G[i] ? 1 : 0;
          Tv[j] = ctx.T[i] ? 1 : 0;
          Lv[j] = ctx.L[i];
        }
      }
      const cerca = dilatarCruz(D, vw, vh, tol + 2);
      if (polaridad === 'exceso') {
        const conductores = new Set();
        for (let j = 0; j < D.length; j++) if (cerca[j] && !D[j] && Gv[j] && Lv[j]) conductores.add(Lv[j]);
        if (!conductores.size) return 'cobre_espurio';
        return conductores.size === 1 ? 'espolon' : 'cortocircuito';
      }
      // ¿borró un conductor entero?
      const tocados = new Set();
      for (let j = 0; j < D.length; j++) if (D[j] && Lv[j]) tocados.add(Lv[j]);
      for (const L of tocados) {
        const [lx, ly, lw, lh, larea] = ctx.stats(L);
        if (lx >= vx1 && ly >= vy1 && lx + lw <= vx2 && ly + lh <= vy2) {
          let falta = 0;
          for (let j = 0; j < D.length; j++) if (Lv[j] === L && !Tv[j]) falta++;
          if (falta >= 0.8 * larea) return 'pad_ausente';
        }
      }
      // ¿rodeado de cobre en la placa?
      const pegado = dilatarCruz(D, vw, vh, tol + 1);
      let anillo = 0, fondo = 0;
      for (let j = 0; j < D.length; j++) if (pegado[j] && !D[j]) { anillo++; if (!Tv[j]) fondo++; }
      if (anillo && fondo / anillo < 0.05) return 'pinhole';
      // ¿el cobre que queda del conductor se partió en dos?
      const resto = new Uint8Array(D.length);
      for (let j = 0; j < D.length; j++) resto[j] = Gv[j] && Tv[j] ? 1 : 0;
      const partes = componentes8(resto, vw, vh);
      const porConductor = new Map();
      for (let j = 0; j < D.length; j++) {
        if (cerca[j] && resto[j]) {
          const L = Lv[j];
          if (!porConductor.has(L)) porConductor.set(L, new Set());
          porConductor.get(L).add(partes[j]);
        }
      }
      for (const s of porConductor.values()) if (s.size >= 2) return 'pista_abierta';
      return 'mordida';
    }

    function defectos(mascara, polaridad, ctx) {
      let grupos = mascara;
      if (PARAMETROS.agrupar > 0) {
        const k = disco(PARAMETROS.agrupar);
        grupos = new cv.Mat();
        cv.dilate(mascara, grupos, k);
        k.delete();
      }
      const lab = new cv.Mat(), st = new cv.Mat(), cen = new cv.Mat();
      const n = cv.connectedComponentsWithStats(grupos, lab, st, cen, 8, cv.CV_32S);
      const L = lab.data32S, S = st.data32S, M = mascara.data, W = mascara.cols, Hh = mascara.rows;
      const salida = [];
      for (let i = 1; i < n; i++) {
        const gx = S[i * 5], gy = S[i * 5 + 1], gw = S[i * 5 + 2], gh = S[i * 5 + 3];
        const win = new Uint8Array(gw * gh);
        let area = 0, sx = 0, sy = 0, x1 = Infinity, y1 = Infinity, x2 = -1, y2 = -1;
        for (let y = 0; y < gh; y++) {
          for (let x = 0; x < gw; x++) {
            const p = (gy + y) * W + gx + x;
            if (L[p] === i && M[p]) {
              win[y * gw + x] = 255;
              area++; sx += gx + x; sy += gy + y;
              if (gx + x < x1) x1 = gx + x;
              if (gy + y < y1) y1 = gy + y;
              if (gx + x > x2) x2 = gx + x;
              if (gy + y > y2) y2 = gy + y;
            }
          }
        }
        if (area < PARAMETROS.areaMin) continue;
        const wm = cv.matFromArray(gh, gw, cv.CV_8UC1, win);
        const cnts = new cv.MatVector(), jer = new cv.Mat();
        cv.findContours(wm, cnts, jer, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE);
        let per = 0;
        for (let c = 0; c < cnts.size(); c++) { const cc = cnts.get(c); per += cv.arcLength(cc, true); cc.delete(); }
        borrar(wm, cnts, jer);
        const ancho = per > 0 ? 2 * area / per : area;
        if (ancho < PARAMETROS.anchoMin) continue;
        const kappa = per > 0 ? 4 * Math.PI * area / (per * per) : 0;
        const bw = x2 - x1 + 1, bh = y2 - y1 + 1;
        const m = PARAMETROS.tolerancia + PARAMETROS.agrupar + 6;
        const vx1 = Math.max(x1 - m, 0), vy1 = Math.max(y1 - m, 0);
        const vx2 = Math.min(x2 + m + 1, W), vy2 = Math.min(y2 + m + 1, Hh);
        const vw = vx2 - vx1;
        const Dv = new Uint8Array(vw * (vy2 - vy1));
        for (let y = 0; y < gh; y++) {
          for (let x = 0; x < gw; x++) {
            if (win[y * gw + x]) Dv[(gy + y - vy1) * vw + gx + x - vx1] = 1;
          }
        }
        salida.push({
          tipo: clasificar(polaridad, Dv, [vx1, vy1, vx2, vy2], ctx),
          polaridad, area,
          kappa: Math.round(kappa * 100) / 100,
          ancho: Math.round(ancho * 100) / 100,
          elongacion: Math.round(Math.max(bw, bh) / Math.max(Math.min(bw, bh), 1) * 10) / 10,
          x: Math.round(sx / area * 10) / 10,
          y: Math.round(sy / area * 10) / 10,
          caja: [x1, y1, x2, y2],
        });
      }
      borrar(lab, st, cen);
      if (grupos !== mascara) grupos.delete();
      return salida;
    }

    function inspeccionar(gold, test, opciones = {}) {
      const cobreClaro = !!opciones.cobreClaro;
      const t0 = Date.now();
      const { H, metodo, inliers } = alinear(gold, test, cobreClaro);
      const w = gold.cols, h = gold.rows;
      const alineada = deformar(test, H, w, h, cv.INTER_LINEAR);
      const valido = zonaValida(test, H, w, h);
      const G = binarizar(gold, cobreClaro), T = binarizar(alineada, cobreClaro);
      const noG = new cv.Mat(), noT = new cv.Mat(), exceso = new cv.Mat(), deficit = new cv.Mat();
      cv.bitwise_not(G, noG);
      cv.bitwise_not(T, noT);
      cv.bitwise_and(T, noG, exceso);
      cv.bitwise_and(exceso, valido, exceso);
      cv.bitwise_and(G, noT, deficit);
      cv.bitwise_and(deficit, valido, deficit);
      const k = disco(PARAMETROS.tolerancia), dG = new cv.Mat(), eG = new cv.Mat(), noDG = new cv.Mat();
      cv.dilate(G, dG, k);
      cv.erode(G, eG, k);
      cv.bitwise_not(dG, noDG);
      cv.bitwise_and(exceso, noDG, exceso);  // banda: lo pegado al borde de la referencia es registro, no defecto
      cv.bitwise_and(deficit, eG, deficit);
      const labG = new cv.Mat(), stG = new cv.Mat(), cenG = new cv.Mat();
      cv.connectedComponentsWithStats(G, labG, stG, cenG, 8, cv.CV_32S);
      const SG = stG.data32S;
      const ctx = { G: G.data, T: T.data, L: labG.data32S, w, stats: (l) => [SG[l * 5], SG[l * 5 + 1], SG[l * 5 + 2], SG[l * 5 + 3], SG[l * 5 + 4]] };
      const lista = defectos(exceso, 'exceso', ctx).concat(defectos(deficit, 'deficit', ctx));
      lista.sort((a, b) => a.caja[1] - b.caja[1] || a.caja[0] - b.caja[0]);
      const Hinv = normal(inv3(H));
      lista.forEach((d, i) => {
        d.n = i + 1;
        d.severidad = CRITICOS.has(d.tipo) ? 'critico' : 'revisar';
        [d.x_placa, d.y_placa] = aplicar(Hinv, d.x, d.y).map((v) => Math.round(v * 10) / 10);
      });
      const resultado = {
        defectos: lista,
        veredicto: lista.some((d) => d.severidad === 'critico') ? 'rechazada' : lista.length ? 'revisar' : 'aprobada',
        alineacion: metodo, inliers, ms: Date.now() - t0, ancho: w, alto: h,
      };
      if (opciones.imagenes) {
        resultado.alineada = new Uint8Array(alineada.data);
        resultado.cobre = new Uint8Array(G.data);
        resultado.exceso = new Uint8Array(exceso.data);
        resultado.deficit = new Uint8Array(deficit.data);
      }
      borrar(alineada, valido, G, T, noG, noT, exceso, deficit, k, dG, eG, noDG, labG, stG, cenG);
      return resultado;
    }

    return { inspeccionar, parametros: PARAMETROS };
  }

  const api = { crear };
  raiz.MotorAOI = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
