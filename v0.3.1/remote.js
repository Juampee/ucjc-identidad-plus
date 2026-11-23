const B = `
:host {
  --bg: #f3f5fb; --card: #ffffff; --texto: #162036; --suave: #5a6579; --linea: #dde3ef;
  --primario: #1f3fbf; --primario-2: #3a63f0; --primario-txt: #ffffff;
  --ok: #17803d; --ok-bg: #e3f6ea; --error: #b42318; --error-bg: #fdecea; --aviso-bg: #fff4d6; --aviso: #7a5200;
  --sombra: 0 1px 2px rgba(22,32,54,.06), 0 12px 32px rgba(22,32,54,.10);
  display: block; color: var(--texto);
  font: 15px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :host {
    --bg: #0f1420; --card: #171e2e; --texto: #e8ecf6; --suave: #9aa6bd; --linea: #2a3550;
    --primario: #6f8cff; --primario-2: #93a8ff; --primario-txt: #0b1020;
    --ok: #5fd68b; --ok-bg: #12301f; --error: #ff8f84; --error-bg: #3a1815; --aviso-bg: #3a2e10; --aviso: #ffd37a;
    --sombra: 0 1px 2px rgba(0,0,0,.4), 0 12px 32px rgba(0,0,0,.4);
  }
}
* { box-sizing: border-box; }
.marco { max-width: 460px; margin: 0 auto; padding: 8px; }
.tarjeta { background: var(--card); border: 1px solid var(--linea); border-radius: 22px; box-shadow: var(--sombra); overflow: hidden; }
.cabecera { padding: 28px 28px 20px; background: linear-gradient(135deg, var(--primario), var(--primario-2)); color: #fff; }
.cabecera h2 { margin: 0 0 4px; font-size: 1.45rem; letter-spacing: -.01em; }
.cabecera p { margin: 0; opacity: .9; font-size: .92rem; }
.marca { display: inline-flex; align-items: center; gap: 8px; font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; opacity: .9; margin-bottom: 10px; }
.cuerpo { padding: 22px 28px 28px; }
.pestanas { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px; background: var(--bg); border-radius: 12px; margin-bottom: 20px; }
.pestanas.tres { grid-template-columns: repeat(3, 1fr); }
.pestana { font: inherit; font-weight: 600; font-size: .9rem; padding: 9px 8px; border: 0; background: transparent; color: var(--suave); border-radius: 9px; cursor: pointer; }
.pestana[aria-selected="true"] { background: var(--card); color: var(--texto); box-shadow: 0 1px 3px rgba(22,32,54,.12); }
.pestana:hover { color: var(--texto); }
label { display: block; font-weight: 600; font-size: .86rem; margin: 14px 0 6px; }
.fila-etiqueta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.fila-etiqueta label { margin: 14px 0 6px; }
input[type=text], input[type=email], input[type=password] {
  width: 100%; font: inherit; color: var(--texto); background: var(--card);
  border: 1.5px solid var(--linea); border-radius: 11px; padding: 11px 13px; outline: none;
  transition: border-color .15s, box-shadow .15s;
}
input:focus-visible { border-color: var(--primario); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primario) 25%, transparent); }
input[aria-invalid="true"] { border-color: var(--error); }
.campo-clave { position: relative; }
.campo-clave input { padding-right: 78px; }
.ojo { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); font: inherit; font-size: .8rem; font-weight: 600; color: var(--primario); background: transparent; border: 0; padding: 6px 8px; border-radius: 8px; cursor: pointer; }
.ojo:hover { background: var(--bg); }
button { font: inherit; }
.boton { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; font-size: .98rem; padding: 12px 16px; border-radius: 12px; border: 1.5px solid transparent; cursor: pointer; transition: transform .08s, filter .15s, background .15s; }
.boton:active { transform: translateY(1px); }
.boton:focus-visible, .pestana:focus-visible, .ojo:focus-visible, .enlace:focus-visible { outline: 3px solid color-mix(in srgb, var(--primario) 45%, transparent); outline-offset: 2px; }
.boton[disabled] { opacity: .6; cursor: progress; }
.primario { background: var(--primario); color: var(--primario-txt); margin-top: 20px; }
.primario:hover:not([disabled]) { filter: brightness(1.08); }
.secundario { background: var(--card); color: var(--texto); border-color: var(--linea); }
.secundario:hover:not([disabled]) { background: var(--bg); }
.peligro { background: var(--error-bg); color: var(--error); border-color: transparent; }
.google { position: relative; }
.chip { display: inline-block; font-size: .7rem; font-weight: 700; letter-spacing: .02em; padding: 2px 8px; border-radius: 999px; background: var(--ok-bg); color: var(--ok); white-space: nowrap; }
.google .chip { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); }
.separador { display: flex; align-items: center; gap: 12px; color: var(--suave); font-size: .8rem; margin: 18px 0 4px; }
.separador::before, .separador::after { content: ""; flex: 1; height: 1px; background: var(--linea); }
.bienvenida { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1.5px solid var(--linea); border-radius: 14px; background: var(--bg); margin-bottom: 18px; }
.bienvenida img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.bienvenida .txt { flex: 1; min-width: 0; }
.bienvenida b, .bienvenida small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bienvenida small { color: var(--suave); }
.enlace { font: inherit; font-size: .85rem; color: var(--primario); background: none; border: 0; padding: 2px 0; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.mensaje { margin-top: 14px; padding: 10px 13px; border-radius: 11px; font-size: .88rem; }
.mensaje.error { background: var(--error-bg); color: var(--error); }
.mensaje.ok { background: var(--ok-bg); color: var(--ok); }
.mensaje.aviso { background: var(--aviso-bg); color: var(--aviso); }
.mensaje:empty { display: none; }
.ayuda { color: var(--suave); font-size: .8rem; margin: 6px 0 0; }
.medidor { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-top: 9px; }
.medidor i { height: 5px; border-radius: 3px; background: var(--linea); transition: background .2s; }
.medidor[data-p="1"] i:nth-child(-n+1) { background: #e5484d; }
.medidor[data-p="2"] i:nth-child(-n+2) { background: #f0a020; }
.medidor[data-p="3"] i:nth-child(-n+3) { background: #7bbf3a; }
.medidor[data-p="4"] i:nth-child(-n+4) { background: #17a34a; }
.etiqueta-fuerza { display: flex; justify-content: space-between; font-size: .78rem; color: var(--suave); margin-top: 5px; }
.recordar { display: flex; align-items: center; gap: 9px; margin-top: 16px; font-size: .88rem; font-weight: 500; }
.recordar input { width: 17px; height: 17px; accent-color: var(--primario); margin: 0; }
.perfil-cab { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
.avatar-grande { position: relative; width: 84px; height: 84px; flex: none; }
.avatar-grande img { width: 84px; height: 84px; border-radius: 50%; object-fit: cover; border: 3px solid var(--card); box-shadow: 0 0 0 2px var(--primario); }
.camara { position: absolute; right: -4px; bottom: -4px; width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--card); background: var(--primario); color: var(--primario-txt); cursor: pointer; display: grid; place-items: center; padding: 0; }
.camara:hover { filter: brightness(1.1); }
.perfil-cab h3 { margin: 0; font-size: 1.15rem; word-break: break-word; }
.perfil-cab p { margin: 2px 0 6px; color: var(--suave); font-size: .88rem; word-break: break-all; }
.metodos { display: flex; gap: 6px; flex-wrap: wrap; }
.metodos .chip { background: var(--bg); color: var(--suave); border: 1px solid var(--linea); }
.lista { list-style: none; margin: 0; padding: 0; }
.lista li { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--linea); }
.lista li:last-child { border-bottom: 0; }
.punto { width: 10px; height: 10px; border-radius: 50%; background: var(--primario); margin-top: 6px; flex: none; }
.punto.salida { background: var(--suave); }
.punto.cambio { background: #f0a020; }
.lista b { display: block; font-size: .9rem; }
.lista small { color: var(--suave); }
.dos { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; margin-top: 16px; }
.dos .boton { margin: 0; }
.zona { margin-top: 24px; padding-top: 18px; border-top: 1px dashed var(--linea); }
.zona h4 { margin: 0 0 8px; font-size: .9rem; color: var(--suave); }
.demo { background: var(--aviso-bg); color: var(--aviso); border-radius: 11px; padding: 10px 13px; font-size: .82rem; margin-top: 14px; }
.cargando { display: inline-block; width: 16px; height: 16px; border: 2.5px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: gira .7s linear infinite; }
@keyframes gira { to { transform: rotate(360deg); } }
.solo-lectores { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation-duration: .01ms !important; } }
@media (max-width: 420px) { .cuerpo { padding: 18px 18px 22px; } .cabecera { padding: 22px 18px 16px; } .dos { grid-template-columns: 1fr; } }
`, M = "ucjc-identidad:usuarios", p = "ucjc-identidad:sesion", v = "ucjc-identidad:ultimo", k = "ucjc-identidad:intentos";
const z = /* @__PURE__ */ new Map();
function b(a, e) {
  try {
    const o = a.getItem(e);
    return o == null ? null : JSON.parse(o);
  } catch {
    return z.has(e) ? z.get(e) : null;
  }
}
function S(a, e, o) {
  try {
    a.setItem(e, JSON.stringify(o));
  } catch {
    z.set(e, o);
  }
}
function m(a, e) {
  try {
    a.removeItem(e);
  } catch {
    z.delete(e);
  }
}
const l = () => globalThis.localStorage, w = () => globalThis.sessionStorage, F = new TextEncoder();
function T(a) {
  let e = "";
  return a.forEach((o) => e += String.fromCharCode(o)), btoa(e);
}
function J(a) {
  return Uint8Array.from(atob(a), (e) => e.charCodeAt(0));
}
async function _(a, e) {
  const o = e ? J(e) : crypto.getRandomValues(new Uint8Array(16)), t = await crypto.subtle.importKey("raw", F.encode(a), "PBKDF2", !1, ["deriveBits"]), i = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: o, iterations: 15e4, hash: "SHA-256" },
    t,
    256
  );
  return { salt: T(o), hash: T(new Uint8Array(i)) };
}
function G(a, e) {
  if (a.length !== e.length) return !1;
  let o = 0;
  for (let t = 0; t < a.length; t++) o |= a.charCodeAt(t) ^ e.charCodeAt(t);
  return o === 0;
}
function j(a) {
  return String(a || "").trim().toLowerCase();
}
function A(a) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(j(a));
}
const K = /* @__PURE__ */ new Set([
  "12345678",
  "password",
  "contraseña",
  "qwertyui",
  "11111111",
  "iloveyou",
  "123456789",
  "abcd1234",
  "password1",
  "admin123",
  "letmein1",
  "ucjc1234"
]);
function O(a) {
  const e = String(a || ""), o = [];
  let t = 0;
  return e.length >= 8 ? t++ : o.push("Usa al menos 8 caracteres"), e.length >= 12 && t++, /[a-z]/.test(e) && /[A-Z]/.test(e) ? t++ : o.push("Mezcla mayúsculas y minúsculas"), /\d/.test(e) && /[^A-Za-z0-9]/.test(e) ? t++ : o.push("Añade un número y un símbolo"), K.has(e.toLowerCase()) && (t = 0, o.unshift("Es una contraseña demasiado común")), t = Math.min(4, t), { puntos: t, etiqueta: ["Muy débil", "Débil", "Aceptable", "Buena", "Excelente"][e ? t : 0], consejos: o };
}
function I() {
  return "u-" + [...crypto.getRandomValues(new Uint8Array(6))].map((e) => e.toString(16).padStart(2, "0")).join("");
}
function V(a = "") {
  const e = /Edg\//.test(a) ? "Edge" : /Firefox\//.test(a) ? "Firefox" : /Chrome\//.test(a) ? "Chrome" : /Safari\//.test(a) ? "Safari" : "Navegador", o = /Windows/.test(a) ? "Windows" : /Android/.test(a) ? "Android" : /iPhone|iPad/.test(a) ? "iOS" : /Mac OS X/.test(a) ? "macOS" : /Linux/.test(a) ? "Linux" : "desconocido";
  return `${e} en ${o}`;
}
class H extends Error {
}
const u = (a) => new H(a);
function g() {
  return b(l(), M) || {};
}
function h(a) {
  S(l(), M, a);
}
function x(a) {
  if (!a) return null;
  const { salt: e, hash: o, ...t } = a;
  return { ...t, tienePassword: !!o };
}
function f(a, e, o) {
  const t = globalThis.navigator ? globalThis.navigator.userAgent : "";
  a.actividad = [{ t: (/* @__PURE__ */ new Date()).toISOString(), evento: e, metodo: o, dispositivo: V(t) }, ...a.actividad || []].slice(0, 20);
}
function D(a) {
  const e = b(l(), k) || {}, o = Date.now(), t = (e[a] || []).filter((i) => o - i < 3e5);
  return { todos: e, lista: t, ahora: o };
}
function W(a) {
  const { lista: e, ahora: o } = D(a);
  if (e.length < 5) return 0;
  const t = e[e.length - 1] + 3e4;
  return Math.max(0, Math.ceil((t - o) / 1e3));
}
function Y(a) {
  const { todos: e, lista: o, ahora: t } = D(a);
  e[a] = [...o, t], S(l(), k, e);
}
function U(a) {
  const e = b(l(), k) || {};
  delete e[a], S(l(), k, e);
}
function $(a, e, o) {
  const t = { userId: a.id, metodo: e, inicio: (/* @__PURE__ */ new Date()).toISOString(), recordar: !!o };
  m(l(), p), m(w(), p), S(o ? l() : w(), p, t), S(l(), v, {
    metodo: e,
    email: a.email,
    nombre: a.nombre,
    foto: a.foto || null
  });
}
const C = Object.freeze({
  nombre: "IDENTIDADBMEJORQUEIDENTIDADA",
  email: "identidadb@pruebas.ucjc.edu",
  password: "IdentidadB-Pruebas1!"
}), n = {
  /** Inicio rápido: crea la cuenta de pruebas si no existe y abre sesión sin pedir datos. */
  async iniciarRapido(a = !0) {
    const e = C.email, o = g();
    let t = o[e];
    if (!t || !t.hash) {
      const { salt: i, hash: r } = await _(C.password);
      t = {
        id: t ? t.id : I(),
        email: e,
        nombre: C.nombre,
        foto: t && t.foto || null,
        metodos: ["password"],
        salt: i,
        hash: r,
        creado: t ? t.creado : (/* @__PURE__ */ new Date()).toISOString(),
        actividad: t ? t.actividad || [] : [],
        cuentaPruebas: !0
      }, t.actividad.length || f(t, "registro", "password");
    }
    return U(e), f(t, "inicio de sesión", "password"), h({ ...o, [e]: t }), $(t, "password", a), x(t);
  },
  async registrar({ nombre: a, email: e, password: o, recordar: t = !0 }) {
    if (a = String(a || "").trim(), e = j(e), a.length < 2) throw u("Escribe tu nombre (mínimo 2 caracteres).");
    if (!A(e)) throw u("Escribe un correo válido.");
    if (O(o).puntos < 2 || String(o).length < 8)
      throw u("La contraseña es demasiado débil: usa al menos 8 caracteres y mezcla tipos.");
    const i = g();
    if (i[e]) throw u("Ya existe una cuenta con ese correo. Inicia sesión.");
    const { salt: r, hash: s } = await _(o), c = {
      id: I(),
      email: e,
      nombre: a,
      foto: null,
      metodos: ["password"],
      salt: r,
      hash: s,
      creado: (/* @__PURE__ */ new Date()).toISOString(),
      actividad: []
    };
    return f(c, "registro", "password"), i[e] = c, h(i), $(c, "password", t), x(c);
  },
  async iniciar({ email: a, password: e, recordar: o = !0 }) {
    if (a = j(a), !A(a)) throw u("Escribe un correo válido.");
    const t = W(a);
    if (t > 0) throw u(`Demasiados intentos. Espera ${t} s e inténtalo de nuevo.`);
    const i = g(), r = i[a], s = await _(String(e || ""), r && r.salt ? r.salt : void 0);
    if (!r || !r.hash || !G(s.hash, r.hash))
      throw Y(a), u("Correo o contraseña incorrectos.");
    return U(a), f(r, "inicio de sesión", "password"), h({ ...i, [a]: r }), $(r, "password", o), x(r);
  },
  /** Perfil ya verificado por Google (o simulación demo). */
  iniciarConGoogle({ email: a, nombre: e, foto: o = null, demo: t = !1 }, i = !0) {
    if (a = j(a), !A(a)) throw u("Google no devolvió un correo válido.");
    const r = g();
    let s = r[a];
    return s ? (s.metodos.includes("google") || s.metodos.push("google"), o && !s.foto && (s.foto = o), f(s, "inicio de sesión", "google")) : (s = {
      id: I(),
      email: a,
      nombre: String(e || a.split("@")[0]).trim(),
      foto: o || null,
      metodos: ["google"],
      creado: (/* @__PURE__ */ new Date()).toISOString(),
      actividad: [],
      demoGoogle: t
    }, f(s, "registro", "google")), r[a] = s, h(r), $(s, "google", i), x(s);
  },
  sesionActual() {
    const a = b(w(), p) || b(l(), p);
    if (!a) return null;
    if (a.recordar && Date.now() - Date.parse(a.inicio) > 6048e5)
      return m(l(), p), null;
    const e = Object.values(g()).find((o) => o.id === a.userId);
    return e ? { ...x(e), metodoSesion: a.metodo, inicioSesion: a.inicio } : null;
  },
  cerrar() {
    const a = b(w(), p) || b(l(), p);
    if (a) {
      const e = g(), o = Object.values(e).find((t) => t.id === a.userId);
      o && (f(o, "cierre de sesión", a.metodo), h({ ...e, [o.email]: o }));
    }
    m(l(), p), m(w(), p);
  },
  ultimo() {
    return b(l(), v);
  },
  olvidarUltimo() {
    m(l(), v);
  },
  actualizarPerfil(a, { nombre: e, foto: o }) {
    const t = g(), i = Object.values(t).find((s) => s.id === a);
    if (!i) throw u("La cuenta ya no existe.");
    if (e !== void 0) {
      const s = String(e).trim();
      if (s.length < 2) throw u("El nombre debe tener al menos 2 caracteres.");
      i.nombre = s;
    }
    o !== void 0 && (i.foto = o), h({ ...t, [i.email]: i });
    const r = b(l(), v);
    return r && r.email === i.email && S(l(), v, { ...r, nombre: i.nombre, foto: i.foto || null }), x(i);
  },
  async cambiarPassword(a, { actual: e, nueva: o }) {
    const t = g(), i = Object.values(t).find((c) => c.id === a);
    if (!i) throw u("La cuenta ya no existe.");
    if (i.hash) {
      const c = await _(String(e || ""), i.salt);
      if (!G(c.hash, i.hash)) throw u("La contraseña actual no es correcta.");
    }
    if (String(o).length < 8 || O(o).puntos < 2)
      throw u("La contraseña nueva es demasiado débil.");
    const { salt: r, hash: s } = await _(o);
    return i.salt = r, i.hash = s, i.metodos.includes("password") || i.metodos.push("password"), f(i, "cambio de contraseña", "password"), h({ ...t, [i.email]: i }), x(i);
  },
  eliminarCuenta(a) {
    const e = g(), o = Object.values(e).find((t) => t.id === a);
    if (o) {
      delete e[o.email], h(e);
      const t = b(l(), v);
      t && t.email === o.email && m(l(), v);
    }
    m(l(), p), m(w(), p);
  },
  actividad(a) {
    const e = Object.values(g()).find((o) => o.id === a);
    return e ? e.actividad || [] : [];
  },
  /** Solo para tests y para el botón de restablecer de la demo. */
  _borrarTodo() {
    [M, p, v, k].forEach((a) => {
      m(l(), a), m(w(), a);
    });
  }
};
function Q(a) {
  let e = 0;
  for (let o = 0; o < a.length; o++) e = e * 31 + a.charCodeAt(o) >>> 0;
  return e;
}
function X(a = "", e = "") {
  const o = String(a).trim().split(/\s+/).filter(Boolean);
  return o.length >= 2 ? (o[0][0] + o[o.length - 1][0]).toUpperCase() : o.length === 1 ? o[0].slice(0, 2).toUpperCase() : String(e).slice(0, 2).toUpperCase() || "?";
}
function Z(a, e) {
  const t = Q(String(e || a)) % 360, i = (t + 48) % 360, r = X(a, e), s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${t} 70% 52%)"/><stop offset="1" stop-color="hsl(${i} 75% 42%)"/></linearGradient></defs><rect width="120" height="120" fill="url(#g)"/><text x="60" y="60" dy=".35em" text-anchor="middle" font-family="system-ui,Segoe UI,Arial,sans-serif" font-size="46" font-weight="600" fill="#fff">${r.replace(/[<&>]/g, "")}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
}
function N(a) {
  return a && a.foto ? a.foto : Z(a ? a.nombre : "", a ? a.email : "");
}
const ee = ["image/jpeg", "image/png", "image/webp", "image/gif"], te = 5 * 1024 * 1024;
function ae(a, e = 192) {
  return new Promise((o, t) => {
    if (!a) return t(new Error("No se ha elegido ninguna imagen."));
    if (!ee.includes(a.type)) return t(new Error("Usa una imagen JPG, PNG, WebP o GIF."));
    if (a.size > te) return t(new Error("La imagen pesa más de 5 MB."));
    const i = URL.createObjectURL(a), r = new Image();
    r.onload = () => {
      const s = document.createElement("canvas");
      s.width = s.height = e;
      const c = s.getContext("2d"), y = Math.min(r.width, r.height), L = (r.width - y) / 2, q = (r.height - y) / 2;
      c.drawImage(r, L, q, y, y, 0, 0, e, e), URL.revokeObjectURL(i), o(s.toDataURL("image/jpeg", 0.85));
    }, r.onerror = () => {
      URL.revokeObjectURL(i), t(new Error("No se pudo leer la imagen."));
    }, r.src = i;
  });
}
const oe = "https://accounts.google.com/gsi/client";
let E = null;
function ie(a) {
  return globalThis.google && globalThis.google.accounts && globalThis.google.accounts.id ? Promise.resolve(globalThis.google.accounts.id) : E || (E = new Promise((e, o) => {
    const t = document.createElement("script");
    t.src = oe, t.async = !0, t.onload = () => {
      globalThis.google && globalThis.google.accounts ? e(globalThis.google.accounts.id) : o(new Error("Google no respondió."));
    }, t.onerror = () => {
      E = null, o(new Error("No se pudo cargar Google. Revisa tu conexión."));
    }, a.appendChild(t);
  }), E);
}
function re(a) {
  try {
    const e = a.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), o = decodeURIComponent(
      atob(e).split("").map((t) => "%" + t.charCodeAt(0).toString(16).padStart(2, "0")).join("")
    );
    return JSON.parse(o);
  } catch {
    return null;
  }
}
function se(a) {
  const e = a && a.credential ? re(a.credential) : null;
  return !e || !e.email || e.email_verified === !1 ? null : { email: e.email, nombre: e.name || e.given_name || e.email, foto: e.picture || null };
}
const ne = "ucjc:identidad:sesion-cambiada@1", d = (a) => String(a ?? "").replace(/[&<>"']/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]), le = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>', de = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
function P(a) {
  try {
    return new Date(a).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return a;
  }
}
const R = { password: "Correo y contraseña", google: "Google" };
class ce extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.vista = "login", this.pestana = "perfil", this.confirmarBorrado = !1, this.demoGoogle = !1, this.usuario = null, this._alStorage = this._alStorage.bind(this);
  }
  static get observedAttributes() {
    return ["google-client-id", "sin-inicio-rapido"];
  }
  connectedCallback() {
    window.addEventListener("storage", this._alStorage), this.usuario = n.sesionActual(), this.vista = this.usuario ? "perfil" : "login", this.render(), this._emitir(), this._reemision = setTimeout(() => this._emitir(), 500);
  }
  disconnectedCallback() {
    window.removeEventListener("storage", this._alStorage), clearTimeout(this._reemision);
  }
  attributeChangedCallback() {
    this.isConnected && !this.usuario && this.render();
  }
  /** El botón de inicio rápido (cuenta de pruebas) sale por defecto; `sin-inicio-rapido` lo oculta. */
  get inicioRapido() {
    return !this.hasAttribute("sin-inicio-rapido");
  }
  get clientId() {
    return (this.getAttribute("google-client-id") || "").trim();
  }
  /* --------------------------------- Eventos --------------------------------- */
  _emitir() {
    const e = this.usuario, o = e ? { autenticado: !0, usuario: { id: e.id, email: e.email, nombre: e.nombre }, momento: (/* @__PURE__ */ new Date()).toISOString() } : { autenticado: !1, usuario: null, momento: (/* @__PURE__ */ new Date()).toISOString() };
    window.dispatchEvent(new CustomEvent(ne, { detail: o }));
  }
  _alStorage(e) {
    if (e.key && !e.key.startsWith("ucjc-identidad:")) return;
    const o = this.usuario ? this.usuario.id : null;
    this.usuario = n.sesionActual();
    const t = this.usuario ? this.usuario.id : null;
    o !== t ? (this.vista = this.usuario ? "perfil" : "login", this.confirmarBorrado = !1, this.render(), this._emitir()) : this.usuario && this.render();
  }
  /* --------------------------------- Plantillas ------------------------------ */
  render() {
    const e = this.shadowRoot;
    let o, t, i;
    this.vista === "perfil" && this.usuario ? (t = "Mi identidad", i = "Tu cuenta de Tienda UCJC", o = this._tplPerfil()) : this.vista === "registro" ? (t = "Crea tu cuenta", i = "Tarda menos de un minuto", o = this._tplAcceso("registro")) : (t = "Te damos la bienvenida", i = "Inicia sesión para continuar", o = this._tplAcceso("login")), e.innerHTML = `<style>${B}</style>
      <div class="marco"><div class="tarjeta" role="region" aria-label="Identidad">
        <div class="cabecera"><div class="marca">Tienda UCJC · Identidad</div><h2>${t}</h2><p>${i}</p></div>
        <div class="cuerpo">${o}</div></div></div>`, this._enlazar();
  }
  _tplAcceso(e) {
    const o = n.ultimo(), t = e === "registro", i = o && o.metodo === "google" ? '<span class="chip">Último usado</span>' : "", r = o && o.metodo === "password" ? '<span class="chip">Último usado</span>' : "", s = o && !t ? `<div class="bienvenida"><img alt="" src="${d(N(o))}"><div class="txt"><b>Hola de nuevo, ${d(o.nombre.split(" ")[0])}</b><small>${d(o.email)}</small></div><button type="button" class="enlace" data-a="olvidar">No soy yo</button></div>` : "", c = this.clientId ? `<div class="google" style="display:flex;justify-content:center;min-height:44px"><div id="gbtn"></div></div>${i ? `<p class="ayuda" style="text-align:center">${i} Usaste Google la última vez</p>` : ""}` : `<button type="button" class="boton secundario google" data-a="google">${le}<span>${t ? "Registrarse" : "Continuar"} con Google</span>${i}</button>`, y = this.inicioRapido && !t ? `<div class="demo"><b>Inicio rápido (solo pruebas)</b>
          <button type="button" class="boton primario" data-a="rapido" style="margin-top:.5rem">Inicio rápido · ${d(C.nombre)}</button>
          <p class="ayuda">Entra directamente con una cuenta de prueba (<code>${d(C.email)}</code>). Se crea sola en este navegador.</p></div>` : "";
    return `
      ${s}
      ${y}
      <div class="pestanas" role="tablist">
        <button class="pestana" role="tab" type="button" data-vista="login" aria-selected="${!t}">Iniciar sesión</button>
        <button class="pestana" role="tab" type="button" data-vista="registro" aria-selected="${t}">Registrarse</button>
      </div>
      ${c}
      ${this.demoGoogle ? this._tplDemoGoogle() : ""}
      ${this.clientId ? "" : '<div class="demo"><b>Modo demo.</b> Sin <code>google-client-id</code> el botón de Google simula el inicio de sesión: no contacta con Google.</div>'}
      <div class="separador">o con tu correo ${r}</div>
      <form data-form="${e}" novalidate>
        ${t ? '<label for="nombre">Nombre</label><input id="nombre" name="nombre" type="text" autocomplete="name" required>' : ""}
        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" autocomplete="email" value="${d(!t && o ? o.email : "")}" required>
        <div class="fila-etiqueta"><label for="clave">Contraseña</label></div>
        <div class="campo-clave">
          <input id="clave" name="clave" type="password" autocomplete="${t ? "new-password" : "current-password"}" required>
          <button type="button" class="ojo" data-a="ver" aria-label="Mostrar u ocultar la contraseña" aria-pressed="false">Mostrar</button>
        </div>
        ${t ? '<div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>' : ""}
        <label class="recordar"><input type="checkbox" name="recordar" checked> Mantener la sesión 7 días en este dispositivo</label>
        <button class="boton primario" type="submit">${t ? "Crear cuenta" : "Entrar"}</button>
        <div class="mensaje" role="alert" data-msg></div>
      </form>`;
  }
  _tplDemoGoogle() {
    return `<form class="demo" data-form="demo-google" novalidate>
      <b>Simulación de Google (demo)</b>
      <label for="gnombre">Nombre</label><input id="gnombre" name="nombre" type="text" value="Alumno Demo">
      <label for="gemail">Correo de Google</label><input id="gemail" name="email" type="email" value="alumno.demo@gmail.com">
      <div class="dos"><button type="button" class="boton secundario" data-a="cancelar-demo">Cancelar</button><button type="submit" class="boton primario" style="margin-top:0">Continuar</button></div>
      <div class="mensaje error" data-msg></div></form>`;
  }
  _tplPerfil() {
    const e = this.usuario, o = ["perfil", "seguridad", "actividad"], t = { perfil: "Perfil", seguridad: "Seguridad", actividad: "Actividad" };
    let i = "";
    return this.pestana === "perfil" ? i = this._tplPanelPerfil(e) : this.pestana === "seguridad" ? i = this._tplPanelSeguridad(e) : i = this._tplPanelActividad(e), `
      <div class="perfil-cab">
        <div class="avatar-grande">
          <img alt="Foto de perfil de ${d(e.nombre)}" src="${d(N(e))}">
          <button type="button" class="camara" data-a="foto" aria-label="Cambiar foto de perfil">${de}</button>
          <input type="file" accept="image/*" hidden data-archivo>
        </div>
        <div><h3>${d(e.nombre)}</h3><p>${d(e.email)}</p>
          <div class="metodos">${e.metodos.map((r) => `<span class="chip">${d(R[r] || r)}${r === e.metodoSesion ? " · esta sesión" : ""}</span>`).join("")}</div></div>
      </div>
      <div class="pestanas tres" role="tablist">
        ${o.map((r) => `<button class="pestana" role="tab" type="button" data-pest="${r}" aria-selected="${this.pestana === r}">${t[r]}</button>`).join("")}
      </div>
      ${i}
      <div class="mensaje" role="alert" data-msg></div>
      <div class="zona"><button type="button" class="boton secundario" data-a="salir">Cerrar sesión</button></div>`;
  }
  _tplPanelPerfil(e) {
    return `<form data-form="perfil" novalidate>
      <label for="pn">Nombre visible</label>
      <input id="pn" name="nombre" type="text" autocomplete="name" value="${d(e.nombre)}">
      <p class="ayuda">Este nombre se comparte con el resto de piezas de la tienda junto a tu correo. La foto no se comparte.</p>
      <div class="dos"><button type="submit" class="boton primario" style="margin-top:0">Guardar</button>
      <button type="button" class="boton secundario" data-a="quitar-foto" ${e.foto ? "" : "disabled"}>Quitar foto</button></div>
      <p class="ayuda">Cuenta creada el ${d(P(e.creado))}</p></form>`;
  }
  _tplPanelSeguridad(e) {
    const o = `<form data-form="clave" novalidate>
      ${e.tienePassword ? '<label for="ca">Contraseña actual</label><input id="ca" name="actual" type="password" autocomplete="current-password">' : '<p class="ayuda">Tu cuenta entra con Google. Puedes añadir una contraseña para entrar también con tu correo.</p>'}
      <label for="cn">${e.tienePassword ? "Contraseña nueva" : "Crear contraseña"}</label>
      <input id="cn" name="nueva" type="password" autocomplete="new-password">
      <div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>
      <button type="submit" class="boton primario">${e.tienePassword ? "Cambiar contraseña" : "Añadir contraseña"}</button></form>`, t = this.confirmarBorrado ? `<div class="mensaje error" style="display:block"><b>¿Eliminar tu cuenta?</b> Se borrarán tus datos de este navegador y no se puede deshacer.
          <div class="dos"><button type="button" class="boton secundario" data-a="no-borrar">Cancelar</button><button type="button" class="boton peligro" data-a="si-borrar">Sí, eliminar</button></div></div>` : '<button type="button" class="boton peligro" data-a="borrar">Eliminar mi cuenta</button>';
    return `${o}<div class="zona"><h4>Zona de peligro</h4>${t}</div>`;
  }
  _tplPanelActividad(e) {
    const o = n.actividad(e.id);
    return o.length ? `<ul class="lista">${o.map((t) => `<li><span class="punto ${t.evento.startsWith("cierre") ? "salida" : t.evento.startsWith("cambio") ? "cambio" : ""}"></span><div><b>${d(t.evento[0].toUpperCase() + t.evento.slice(1))}</b><small>${d(R[t.metodo] || t.metodo)} · ${d(t.dispositivo)} · ${d(P(t.t))}</small></div></li>`).join("")}</ul>` : '<p class="ayuda">Aún no hay actividad.</p>';
  }
  /* ---------------------------------- Lógica --------------------------------- */
  $(e) {
    return this.shadowRoot.querySelector(e);
  }
  _mensaje(e, o = "error", t = null) {
    const i = t && t.querySelector("[data-msg]") || this.$("[data-msg]");
    i && (i.className = `mensaje ${o}`, i.textContent = e || "");
  }
  _entrar(e) {
    this.usuario = n.sesionActual() || e, this.vista = "perfil", this.pestana = "perfil", this.demoGoogle = !1, this.render(), this._emitir();
  }
  _enlazar() {
    const e = this.shadowRoot;
    e.querySelectorAll("[data-vista]").forEach((i) => i.addEventListener("click", () => {
      this.vista = i.dataset.vista, this.demoGoogle = !1, this.render();
    })), e.querySelectorAll("[data-pest]").forEach((i) => i.addEventListener("click", () => {
      this.pestana = i.dataset.pest, this.confirmarBorrado = !1, this.render();
    }));
    const o = {
      ver: (i) => {
        const r = this.$("#clave"), s = r.type === "password";
        r.type = s ? "text" : "password", i.textContent = s ? "Ocultar" : "Mostrar", i.setAttribute("aria-pressed", String(s));
      },
      rapido: async (i) => {
        i.disabled = !0;
        try {
          this._entrar(await n.iniciarRapido(!0));
        } catch (r) {
          i.disabled = !1, this._mensaje(r.message);
        }
      },
      olvidar: () => {
        n.olvidarUltimo(), this.render();
      },
      google: () => {
        this.demoGoogle = !0, this.render();
        const i = this.$("#gnombre");
        i && i.focus();
      },
      "cancelar-demo": () => {
        this.demoGoogle = !1, this.render();
      },
      foto: () => this.$("[data-archivo]").click(),
      "quitar-foto": () => {
        this.usuario = n.actualizarPerfil(this.usuario.id, { foto: null }), this.usuario = n.sesionActual(), this.render(), this._mensaje("Foto eliminada.", "ok");
      },
      salir: () => {
        n.cerrar(), this.usuario = null, this.vista = "login", this.render(), this._emitir();
      },
      borrar: () => {
        this.confirmarBorrado = !0, this.render();
      },
      "no-borrar": () => {
        this.confirmarBorrado = !1, this.render();
      },
      "si-borrar": () => {
        n.eliminarCuenta(this.usuario.id), this.usuario = null, this.vista = "login", this.confirmarBorrado = !1, this.render(), this._emitir();
      }
    };
    e.querySelectorAll("[data-a]").forEach((i) => {
      const r = o[i.dataset.a];
      r && i.addEventListener("click", () => r(i));
    });
    const t = this.$("[data-archivo]");
    t && t.addEventListener("change", () => this._subirFoto(t)), e.querySelectorAll("input[name=clave], input[name=nueva]").forEach((i) => i.addEventListener("input", () => this._medidor(i))), e.querySelectorAll("form[data-form]").forEach((i) => i.addEventListener("submit", (r) => {
      r.preventDefault(), this._enviar(i);
    })), this.clientId && !this.usuario && this.$("#gbtn") && this._montarGoogle();
  }
  _medidor(e) {
    const o = O(e.value), t = e.closest("form"), i = t.querySelector(".medidor");
    i && (i.dataset.p = String(e.value ? Math.max(1, o.puntos) : 0), t.querySelector("[data-fuerza]").textContent = e.value ? o.etiqueta : "Muy débil", t.querySelector("[data-consejo]").textContent = e.value && o.consejos[0] ? o.consejos[0] : "");
  }
  async _subirFoto(e) {
    const o = e.files && e.files[0];
    if (o)
      try {
        const t = await ae(o);
        n.actualizarPerfil(this.usuario.id, { foto: t }), this.usuario = n.sesionActual(), this.render(), this._mensaje("Foto actualizada.", "ok");
      } catch (t) {
        this._mensaje(t.message);
      }
  }
  async _montarGoogle() {
    try {
      const e = await ie(this.shadowRoot);
      e.initialize({
        client_id: this.clientId,
        callback: (t) => {
          const i = se(t);
          if (!i) return this._mensaje("Google no devolvió un perfil válido.");
          try {
            this._entrar(n.iniciarConGoogle(i, !0));
          } catch (r) {
            this._mensaje(r.message);
          }
        }
      });
      const o = this.$("#gbtn");
      o && e.renderButton(o, { theme: "outline", size: "large", text: this.vista === "registro" ? "signup_with" : "continue_with", width: 300, locale: "es" });
    } catch (e) {
      this._mensaje(e.message, "aviso");
    }
  }
  async _enviar(e) {
    const o = e.dataset.form, t = Object.fromEntries(new FormData(e).entries()), i = e.querySelector("button[type=submit]"), r = e.querySelector("input[name=recordar]") ? e.querySelector("input[name=recordar]").checked : !0, s = (c) => {
      i && (i.disabled = c);
    };
    this._mensaje("", "error", e);
    try {
      if (s(!0), o === "login") {
        if (!A(t.email)) throw new Error("Escribe un correo válido.");
        this._entrar(await n.iniciar({ email: t.email, password: t.clave, recordar: r }));
      } else o === "registro" ? this._entrar(await n.registrar({ nombre: t.nombre, email: t.email, password: t.clave, recordar: r })) : o === "demo-google" ? this._entrar(n.iniciarConGoogle({ email: t.email, nombre: t.nombre, demo: !0 }, !0)) : o === "perfil" ? (n.actualizarPerfil(this.usuario.id, { nombre: t.nombre }), this.usuario = n.sesionActual(), this.render(), this._mensaje("Cambios guardados.", "ok"), this._emitir()) : o === "clave" && (await n.cambiarPassword(this.usuario.id, { actual: t.actual, nueva: t.nueva }), this.usuario = n.sesionActual(), this.render(), this._mensaje("Contraseña actualizada.", "ok"));
    } catch (c) {
      s(!1), this._mensaje(c.message, "error", e);
    }
  }
}
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", ce);
const ue = { nombre: "identidad", version: "0.3.1" };
export {
  ue as default
};
