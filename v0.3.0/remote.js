const R = `
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
`, O = "ucjc-identidad:usuarios", p = "ucjc-identidad:sesion", b = "ucjc-identidad:ultimo", _ = "ucjc-identidad:intentos";
const j = /* @__PURE__ */ new Map();
function g(t, e) {
  try {
    const a = t.getItem(e);
    return a == null ? null : JSON.parse(a);
  } catch {
    return j.has(e) ? j.get(e) : null;
  }
}
function y(t, e, a) {
  try {
    t.setItem(e, JSON.stringify(a));
  } catch {
    j.set(e, a);
  }
}
function m(t, e) {
  try {
    t.removeItem(e);
  } catch {
    j.delete(e);
  }
}
const n = () => globalThis.localStorage, v = () => globalThis.sessionStorage, D = new TextEncoder();
function I(t) {
  let e = "";
  return t.forEach((a) => e += String.fromCharCode(a)), btoa(e);
}
function B(t) {
  return Uint8Array.from(atob(t), (e) => e.charCodeAt(0));
}
async function C(t, e) {
  const a = e ? B(e) : crypto.getRandomValues(new Uint8Array(16)), o = await crypto.subtle.importKey("raw", D.encode(t), "PBKDF2", !1, ["deriveBits"]), r = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: a, iterations: 15e4, hash: "SHA-256" },
    o,
    256
  );
  return { salt: I(a), hash: I(new Uint8Array(r)) };
}
function M(t, e) {
  if (t.length !== e.length) return !1;
  let a = 0;
  for (let o = 0; o < t.length; o++) a |= t.charCodeAt(o) ^ e.charCodeAt(o);
  return a === 0;
}
function E(t) {
  return String(t || "").trim().toLowerCase();
}
function $(t) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(E(t));
}
const F = /* @__PURE__ */ new Set([
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
function z(t) {
  const e = String(t || ""), a = [];
  let o = 0;
  return e.length >= 8 ? o++ : a.push("Usa al menos 8 caracteres"), e.length >= 12 && o++, /[a-z]/.test(e) && /[A-Z]/.test(e) ? o++ : a.push("Mezcla mayúsculas y minúsculas"), /\d/.test(e) && /[^A-Za-z0-9]/.test(e) ? o++ : a.push("Añade un número y un símbolo"), F.has(e.toLowerCase()) && (o = 0, a.unshift("Es una contraseña demasiado común")), o = Math.min(4, o), { puntos: o, etiqueta: ["Muy débil", "Débil", "Aceptable", "Buena", "Excelente"][e ? o : 0], consejos: a };
}
function G() {
  return "u-" + [...crypto.getRandomValues(new Uint8Array(6))].map((e) => e.toString(16).padStart(2, "0")).join("");
}
function J(t = "") {
  const e = /Edg\//.test(t) ? "Edge" : /Firefox\//.test(t) ? "Firefox" : /Chrome\//.test(t) ? "Chrome" : /Safari\//.test(t) ? "Safari" : "Navegador", a = /Windows/.test(t) ? "Windows" : /Android/.test(t) ? "Android" : /iPhone|iPad/.test(t) ? "iOS" : /Mac OS X/.test(t) ? "macOS" : /Linux/.test(t) ? "Linux" : "desconocido";
  return `${e} en ${a}`;
}
class K extends Error {
}
const u = (t) => new K(t);
function h() {
  return g(n(), O) || {};
}
function f(t) {
  y(n(), O, t);
}
function x(t) {
  if (!t) return null;
  const { salt: e, hash: a, ...o } = t;
  return { ...o, tienePassword: !!a };
}
function w(t, e, a) {
  const o = globalThis.navigator ? globalThis.navigator.userAgent : "";
  t.actividad = [{ t: (/* @__PURE__ */ new Date()).toISOString(), evento: e, metodo: a, dispositivo: J(o) }, ...t.actividad || []].slice(0, 20);
}
function N(t) {
  const e = g(n(), _) || {}, a = Date.now(), o = (e[t] || []).filter((r) => a - r < 3e5);
  return { todos: e, lista: o, ahora: a };
}
function V(t) {
  const { lista: e, ahora: a } = N(t);
  if (e.length < 5) return 0;
  const o = e[e.length - 1] + 3e4;
  return Math.max(0, Math.ceil((o - a) / 1e3));
}
function H(t) {
  const { todos: e, lista: a, ahora: o } = N(t);
  e[t] = [...a, o], y(n(), _, e);
}
function W(t) {
  const e = g(n(), _) || {};
  delete e[t], y(n(), _, e);
}
function A(t, e, a) {
  const o = { userId: t.id, metodo: e, inicio: (/* @__PURE__ */ new Date()).toISOString(), recordar: !!a };
  m(n(), p), m(v(), p), y(a ? n() : v(), p, o), y(n(), b, {
    metodo: e,
    email: t.email,
    nombre: t.nombre,
    foto: t.foto || null
  });
}
const l = {
  async registrar({ nombre: t, email: e, password: a, recordar: o = !0 }) {
    if (t = String(t || "").trim(), e = E(e), t.length < 2) throw u("Escribe tu nombre (mínimo 2 caracteres).");
    if (!$(e)) throw u("Escribe un correo válido.");
    if (z(a).puntos < 2 || String(a).length < 8)
      throw u("La contraseña es demasiado débil: usa al menos 8 caracteres y mezcla tipos.");
    const r = h();
    if (r[e]) throw u("Ya existe una cuenta con ese correo. Inicia sesión.");
    const { salt: i, hash: s } = await C(a), d = {
      id: G(),
      email: e,
      nombre: t,
      foto: null,
      metodos: ["password"],
      salt: i,
      hash: s,
      creado: (/* @__PURE__ */ new Date()).toISOString(),
      actividad: []
    };
    return w(d, "registro", "password"), r[e] = d, f(r), A(d, "password", o), x(d);
  },
  async iniciar({ email: t, password: e, recordar: a = !0 }) {
    if (t = E(t), !$(t)) throw u("Escribe un correo válido.");
    const o = V(t);
    if (o > 0) throw u(`Demasiados intentos. Espera ${o} s e inténtalo de nuevo.`);
    const r = h(), i = r[t], s = await C(String(e || ""), i && i.salt ? i.salt : void 0);
    if (!i || !i.hash || !M(s.hash, i.hash))
      throw H(t), u("Correo o contraseña incorrectos.");
    return W(t), w(i, "inicio de sesión", "password"), f({ ...r, [t]: i }), A(i, "password", a), x(i);
  },
  /** Perfil ya verificado por Google (o simulación demo). */
  iniciarConGoogle({ email: t, nombre: e, foto: a = null, demo: o = !1 }, r = !0) {
    if (t = E(t), !$(t)) throw u("Google no devolvió un correo válido.");
    const i = h();
    let s = i[t];
    return s ? (s.metodos.includes("google") || s.metodos.push("google"), a && !s.foto && (s.foto = a), w(s, "inicio de sesión", "google")) : (s = {
      id: G(),
      email: t,
      nombre: String(e || t.split("@")[0]).trim(),
      foto: a || null,
      metodos: ["google"],
      creado: (/* @__PURE__ */ new Date()).toISOString(),
      actividad: [],
      demoGoogle: o
    }, w(s, "registro", "google")), i[t] = s, f(i), A(s, "google", r), x(s);
  },
  sesionActual() {
    const t = g(v(), p) || g(n(), p);
    if (!t) return null;
    if (t.recordar && Date.now() - Date.parse(t.inicio) > 6048e5)
      return m(n(), p), null;
    const e = Object.values(h()).find((a) => a.id === t.userId);
    return e ? { ...x(e), metodoSesion: t.metodo, inicioSesion: t.inicio } : null;
  },
  cerrar() {
    const t = g(v(), p) || g(n(), p);
    if (t) {
      const e = h(), a = Object.values(e).find((o) => o.id === t.userId);
      a && (w(a, "cierre de sesión", t.metodo), f({ ...e, [a.email]: a }));
    }
    m(n(), p), m(v(), p);
  },
  ultimo() {
    return g(n(), b);
  },
  olvidarUltimo() {
    m(n(), b);
  },
  actualizarPerfil(t, { nombre: e, foto: a }) {
    const o = h(), r = Object.values(o).find((s) => s.id === t);
    if (!r) throw u("La cuenta ya no existe.");
    if (e !== void 0) {
      const s = String(e).trim();
      if (s.length < 2) throw u("El nombre debe tener al menos 2 caracteres.");
      r.nombre = s;
    }
    a !== void 0 && (r.foto = a), f({ ...o, [r.email]: r });
    const i = g(n(), b);
    return i && i.email === r.email && y(n(), b, { ...i, nombre: r.nombre, foto: r.foto || null }), x(r);
  },
  async cambiarPassword(t, { actual: e, nueva: a }) {
    const o = h(), r = Object.values(o).find((d) => d.id === t);
    if (!r) throw u("La cuenta ya no existe.");
    if (r.hash) {
      const d = await C(String(e || ""), r.salt);
      if (!M(d.hash, r.hash)) throw u("La contraseña actual no es correcta.");
    }
    if (String(a).length < 8 || z(a).puntos < 2)
      throw u("La contraseña nueva es demasiado débil.");
    const { salt: i, hash: s } = await C(a);
    return r.salt = i, r.hash = s, r.metodos.includes("password") || r.metodos.push("password"), w(r, "cambio de contraseña", "password"), f({ ...o, [r.email]: r }), x(r);
  },
  eliminarCuenta(t) {
    const e = h(), a = Object.values(e).find((o) => o.id === t);
    if (a) {
      delete e[a.email], f(e);
      const o = g(n(), b);
      o && o.email === a.email && m(n(), b);
    }
    m(n(), p), m(v(), p);
  },
  actividad(t) {
    const e = Object.values(h()).find((a) => a.id === t);
    return e ? e.actividad || [] : [];
  },
  /** Solo para tests y para el botón de restablecer de la demo. */
  _borrarTodo() {
    [O, p, b, _].forEach((t) => {
      m(n(), t), m(v(), t);
    });
  }
};
function Y(t) {
  let e = 0;
  for (let a = 0; a < t.length; a++) e = e * 31 + t.charCodeAt(a) >>> 0;
  return e;
}
function X(t = "", e = "") {
  const a = String(t).trim().split(/\s+/).filter(Boolean);
  return a.length >= 2 ? (a[0][0] + a[a.length - 1][0]).toUpperCase() : a.length === 1 ? a[0].slice(0, 2).toUpperCase() : String(e).slice(0, 2).toUpperCase() || "?";
}
function Q(t, e) {
  const o = Y(String(e || t)) % 360, r = (o + 48) % 360, i = X(t, e), s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${o} 70% 52%)"/><stop offset="1" stop-color="hsl(${r} 75% 42%)"/></linearGradient></defs><rect width="120" height="120" fill="url(#g)"/><text x="60" y="60" dy=".35em" text-anchor="middle" font-family="system-ui,Segoe UI,Arial,sans-serif" font-size="46" font-weight="600" fill="#fff">${i.replace(/[<&>]/g, "")}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
}
function T(t) {
  return t && t.foto ? t.foto : Q(t ? t.nombre : "", t ? t.email : "");
}
const Z = ["image/jpeg", "image/png", "image/webp", "image/gif"], ee = 5 * 1024 * 1024;
function te(t, e = 192) {
  return new Promise((a, o) => {
    if (!t) return o(new Error("No se ha elegido ninguna imagen."));
    if (!Z.includes(t.type)) return o(new Error("Usa una imagen JPG, PNG, WebP o GIF."));
    if (t.size > ee) return o(new Error("La imagen pesa más de 5 MB."));
    const r = URL.createObjectURL(t), i = new Image();
    i.onload = () => {
      const s = document.createElement("canvas");
      s.width = s.height = e;
      const d = s.getContext("2d"), k = Math.min(i.width, i.height), P = (i.width - k) / 2, q = (i.height - k) / 2;
      d.drawImage(i, P, q, k, k, 0, 0, e, e), URL.revokeObjectURL(r), a(s.toDataURL("image/jpeg", 0.85));
    }, i.onerror = () => {
      URL.revokeObjectURL(r), o(new Error("No se pudo leer la imagen."));
    }, i.src = r;
  });
}
const ae = "https://accounts.google.com/gsi/client";
let S = null;
function oe(t) {
  return globalThis.google && globalThis.google.accounts && globalThis.google.accounts.id ? Promise.resolve(globalThis.google.accounts.id) : S || (S = new Promise((e, a) => {
    const o = document.createElement("script");
    o.src = ae, o.async = !0, o.onload = () => {
      globalThis.google && globalThis.google.accounts ? e(globalThis.google.accounts.id) : a(new Error("Google no respondió."));
    }, o.onerror = () => {
      S = null, a(new Error("No se pudo cargar Google. Revisa tu conexión."));
    }, t.appendChild(o);
  }), S);
}
function re(t) {
  try {
    const e = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), a = decodeURIComponent(
      atob(e).split("").map((o) => "%" + o.charCodeAt(0).toString(16).padStart(2, "0")).join("")
    );
    return JSON.parse(a);
  } catch {
    return null;
  }
}
function ie(t) {
  const e = t && t.credential ? re(t.credential) : null;
  return !e || !e.email || e.email_verified === !1 ? null : { email: e.email, nombre: e.name || e.given_name || e.email, foto: e.picture || null };
}
const se = "ucjc:identidad:sesion-cambiada@1", c = (t) => String(t ?? "").replace(/[&<>"']/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]), ne = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>', le = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
function U(t) {
  try {
    return new Date(t).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return t;
  }
}
const L = { password: "Correo y contraseña", google: "Google" };
class de extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }), this.vista = "login", this.pestana = "perfil", this.confirmarBorrado = !1, this.demoGoogle = !1, this.usuario = null, this._alStorage = this._alStorage.bind(this);
  }
  static get observedAttributes() {
    return ["google-client-id"];
  }
  connectedCallback() {
    window.addEventListener("storage", this._alStorage), this.usuario = l.sesionActual(), this.vista = this.usuario ? "perfil" : "login", this.render(), this._emitir(), this._reemision = setTimeout(() => this._emitir(), 500);
  }
  disconnectedCallback() {
    window.removeEventListener("storage", this._alStorage), clearTimeout(this._reemision);
  }
  attributeChangedCallback() {
    this.isConnected && !this.usuario && this.render();
  }
  get clientId() {
    return (this.getAttribute("google-client-id") || "").trim();
  }
  /* --------------------------------- Eventos --------------------------------- */
  _emitir() {
    const e = this.usuario, a = e ? { autenticado: !0, usuario: { id: e.id, email: e.email, nombre: e.nombre }, momento: (/* @__PURE__ */ new Date()).toISOString() } : { autenticado: !1, usuario: null, momento: (/* @__PURE__ */ new Date()).toISOString() };
    window.dispatchEvent(new CustomEvent(se, { detail: a }));
  }
  _alStorage(e) {
    if (e.key && !e.key.startsWith("ucjc-identidad:")) return;
    const a = this.usuario ? this.usuario.id : null;
    this.usuario = l.sesionActual();
    const o = this.usuario ? this.usuario.id : null;
    a !== o ? (this.vista = this.usuario ? "perfil" : "login", this.confirmarBorrado = !1, this.render(), this._emitir()) : this.usuario && this.render();
  }
  /* --------------------------------- Plantillas ------------------------------ */
  render() {
    const e = this.shadowRoot;
    let a, o, r;
    this.vista === "perfil" && this.usuario ? (o = "Mi identidad", r = "Tu cuenta de Tienda UCJC", a = this._tplPerfil()) : this.vista === "registro" ? (o = "Crea tu cuenta", r = "Tarda menos de un minuto", a = this._tplAcceso("registro")) : (o = "Te damos la bienvenida", r = "Inicia sesión para continuar", a = this._tplAcceso("login")), e.innerHTML = `<style>${R}</style>
      <div class="marco"><div class="tarjeta" role="region" aria-label="Identidad">
        <div class="cabecera"><div class="marca">Tienda UCJC · Identidad</div><h2>${o}</h2><p>${r}</p></div>
        <div class="cuerpo">${a}</div></div></div>`, this._enlazar();
  }
  _tplAcceso(e) {
    const a = l.ultimo(), o = e === "registro", r = a && a.metodo === "google" ? '<span class="chip">Último usado</span>' : "", i = a && a.metodo === "password" ? '<span class="chip">Último usado</span>' : "", s = a && !o ? `<div class="bienvenida"><img alt="" src="${c(T(a))}"><div class="txt"><b>Hola de nuevo, ${c(a.nombre.split(" ")[0])}</b><small>${c(a.email)}</small></div><button type="button" class="enlace" data-a="olvidar">No soy yo</button></div>` : "", d = this.clientId ? `<div class="google" style="display:flex;justify-content:center;min-height:44px"><div id="gbtn"></div></div>${r ? `<p class="ayuda" style="text-align:center">${r} Usaste Google la última vez</p>` : ""}` : `<button type="button" class="boton secundario google" data-a="google">${ne}<span>${o ? "Registrarse" : "Continuar"} con Google</span>${r}</button>`;
    return `
      ${s}
      <div class="pestanas" role="tablist">
        <button class="pestana" role="tab" type="button" data-vista="login" aria-selected="${!o}">Iniciar sesión</button>
        <button class="pestana" role="tab" type="button" data-vista="registro" aria-selected="${o}">Registrarse</button>
      </div>
      ${d}
      ${this.demoGoogle ? this._tplDemoGoogle() : ""}
      ${this.clientId ? "" : '<div class="demo"><b>Modo demo.</b> Sin <code>google-client-id</code> el botón de Google simula el inicio de sesión: no contacta con Google.</div>'}
      <div class="separador">o con tu correo ${i}</div>
      <form data-form="${e}" novalidate>
        ${o ? '<label for="nombre">Nombre</label><input id="nombre" name="nombre" type="text" autocomplete="name" required>' : ""}
        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" autocomplete="email" value="${c(!o && a ? a.email : "")}" required>
        <div class="fila-etiqueta"><label for="clave">Contraseña</label></div>
        <div class="campo-clave">
          <input id="clave" name="clave" type="password" autocomplete="${o ? "new-password" : "current-password"}" required>
          <button type="button" class="ojo" data-a="ver" aria-label="Mostrar u ocultar la contraseña" aria-pressed="false">Mostrar</button>
        </div>
        ${o ? '<div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>' : ""}
        <label class="recordar"><input type="checkbox" name="recordar" checked> Mantener la sesión 7 días en este dispositivo</label>
        <button class="boton primario" type="submit">${o ? "Crear cuenta" : "Entrar"}</button>
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
    const e = this.usuario, a = ["perfil", "seguridad", "actividad"], o = { perfil: "Perfil", seguridad: "Seguridad", actividad: "Actividad" };
    let r = "";
    return this.pestana === "perfil" ? r = this._tplPanelPerfil(e) : this.pestana === "seguridad" ? r = this._tplPanelSeguridad(e) : r = this._tplPanelActividad(e), `
      <div class="perfil-cab">
        <div class="avatar-grande">
          <img alt="Foto de perfil de ${c(e.nombre)}" src="${c(T(e))}">
          <button type="button" class="camara" data-a="foto" aria-label="Cambiar foto de perfil">${le}</button>
          <input type="file" accept="image/*" hidden data-archivo>
        </div>
        <div><h3>${c(e.nombre)}</h3><p>${c(e.email)}</p>
          <div class="metodos">${e.metodos.map((i) => `<span class="chip">${c(L[i] || i)}${i === e.metodoSesion ? " · esta sesión" : ""}</span>`).join("")}</div></div>
      </div>
      <div class="pestanas tres" role="tablist">
        ${a.map((i) => `<button class="pestana" role="tab" type="button" data-pest="${i}" aria-selected="${this.pestana === i}">${o[i]}</button>`).join("")}
      </div>
      ${r}
      <div class="mensaje" role="alert" data-msg></div>
      <div class="zona"><button type="button" class="boton secundario" data-a="salir">Cerrar sesión</button></div>`;
  }
  _tplPanelPerfil(e) {
    return `<form data-form="perfil" novalidate>
      <label for="pn">Nombre visible</label>
      <input id="pn" name="nombre" type="text" autocomplete="name" value="${c(e.nombre)}">
      <p class="ayuda">Este nombre se comparte con el resto de piezas de la tienda junto a tu correo. La foto no se comparte.</p>
      <div class="dos"><button type="submit" class="boton primario" style="margin-top:0">Guardar</button>
      <button type="button" class="boton secundario" data-a="quitar-foto" ${e.foto ? "" : "disabled"}>Quitar foto</button></div>
      <p class="ayuda">Cuenta creada el ${c(U(e.creado))}</p></form>`;
  }
  _tplPanelSeguridad(e) {
    const a = `<form data-form="clave" novalidate>
      ${e.tienePassword ? '<label for="ca">Contraseña actual</label><input id="ca" name="actual" type="password" autocomplete="current-password">' : '<p class="ayuda">Tu cuenta entra con Google. Puedes añadir una contraseña para entrar también con tu correo.</p>'}
      <label for="cn">${e.tienePassword ? "Contraseña nueva" : "Crear contraseña"}</label>
      <input id="cn" name="nueva" type="password" autocomplete="new-password">
      <div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>
      <button type="submit" class="boton primario">${e.tienePassword ? "Cambiar contraseña" : "Añadir contraseña"}</button></form>`, o = this.confirmarBorrado ? `<div class="mensaje error" style="display:block"><b>¿Eliminar tu cuenta?</b> Se borrarán tus datos de este navegador y no se puede deshacer.
          <div class="dos"><button type="button" class="boton secundario" data-a="no-borrar">Cancelar</button><button type="button" class="boton peligro" data-a="si-borrar">Sí, eliminar</button></div></div>` : '<button type="button" class="boton peligro" data-a="borrar">Eliminar mi cuenta</button>';
    return `${a}<div class="zona"><h4>Zona de peligro</h4>${o}</div>`;
  }
  _tplPanelActividad(e) {
    const a = l.actividad(e.id);
    return a.length ? `<ul class="lista">${a.map((o) => `<li><span class="punto ${o.evento.startsWith("cierre") ? "salida" : o.evento.startsWith("cambio") ? "cambio" : ""}"></span><div><b>${c(o.evento[0].toUpperCase() + o.evento.slice(1))}</b><small>${c(L[o.metodo] || o.metodo)} · ${c(o.dispositivo)} · ${c(U(o.t))}</small></div></li>`).join("")}</ul>` : '<p class="ayuda">Aún no hay actividad.</p>';
  }
  /* ---------------------------------- Lógica --------------------------------- */
  $(e) {
    return this.shadowRoot.querySelector(e);
  }
  _mensaje(e, a = "error", o = null) {
    const r = o && o.querySelector("[data-msg]") || this.$("[data-msg]");
    r && (r.className = `mensaje ${a}`, r.textContent = e || "");
  }
  _entrar(e) {
    this.usuario = l.sesionActual() || e, this.vista = "perfil", this.pestana = "perfil", this.demoGoogle = !1, this.render(), this._emitir();
  }
  _enlazar() {
    const e = this.shadowRoot;
    e.querySelectorAll("[data-vista]").forEach((r) => r.addEventListener("click", () => {
      this.vista = r.dataset.vista, this.demoGoogle = !1, this.render();
    })), e.querySelectorAll("[data-pest]").forEach((r) => r.addEventListener("click", () => {
      this.pestana = r.dataset.pest, this.confirmarBorrado = !1, this.render();
    }));
    const a = {
      ver: (r) => {
        const i = this.$("#clave"), s = i.type === "password";
        i.type = s ? "text" : "password", r.textContent = s ? "Ocultar" : "Mostrar", r.setAttribute("aria-pressed", String(s));
      },
      olvidar: () => {
        l.olvidarUltimo(), this.render();
      },
      google: () => {
        this.demoGoogle = !0, this.render();
        const r = this.$("#gnombre");
        r && r.focus();
      },
      "cancelar-demo": () => {
        this.demoGoogle = !1, this.render();
      },
      foto: () => this.$("[data-archivo]").click(),
      "quitar-foto": () => {
        this.usuario = l.actualizarPerfil(this.usuario.id, { foto: null }), this.usuario = l.sesionActual(), this.render(), this._mensaje("Foto eliminada.", "ok");
      },
      salir: () => {
        l.cerrar(), this.usuario = null, this.vista = "login", this.render(), this._emitir();
      },
      borrar: () => {
        this.confirmarBorrado = !0, this.render();
      },
      "no-borrar": () => {
        this.confirmarBorrado = !1, this.render();
      },
      "si-borrar": () => {
        l.eliminarCuenta(this.usuario.id), this.usuario = null, this.vista = "login", this.confirmarBorrado = !1, this.render(), this._emitir();
      }
    };
    e.querySelectorAll("[data-a]").forEach((r) => {
      const i = a[r.dataset.a];
      i && r.addEventListener("click", () => i(r));
    });
    const o = this.$("[data-archivo]");
    o && o.addEventListener("change", () => this._subirFoto(o)), e.querySelectorAll("input[name=clave], input[name=nueva]").forEach((r) => r.addEventListener("input", () => this._medidor(r))), e.querySelectorAll("form[data-form]").forEach((r) => r.addEventListener("submit", (i) => {
      i.preventDefault(), this._enviar(r);
    })), this.clientId && !this.usuario && this.$("#gbtn") && this._montarGoogle();
  }
  _medidor(e) {
    const a = z(e.value), o = e.closest("form"), r = o.querySelector(".medidor");
    r && (r.dataset.p = String(e.value ? Math.max(1, a.puntos) : 0), o.querySelector("[data-fuerza]").textContent = e.value ? a.etiqueta : "Muy débil", o.querySelector("[data-consejo]").textContent = e.value && a.consejos[0] ? a.consejos[0] : "");
  }
  async _subirFoto(e) {
    const a = e.files && e.files[0];
    if (a)
      try {
        const o = await te(a);
        l.actualizarPerfil(this.usuario.id, { foto: o }), this.usuario = l.sesionActual(), this.render(), this._mensaje("Foto actualizada.", "ok");
      } catch (o) {
        this._mensaje(o.message);
      }
  }
  async _montarGoogle() {
    try {
      const e = await oe(this.shadowRoot);
      e.initialize({
        client_id: this.clientId,
        callback: (o) => {
          const r = ie(o);
          if (!r) return this._mensaje("Google no devolvió un perfil válido.");
          try {
            this._entrar(l.iniciarConGoogle(r, !0));
          } catch (i) {
            this._mensaje(i.message);
          }
        }
      });
      const a = this.$("#gbtn");
      a && e.renderButton(a, { theme: "outline", size: "large", text: this.vista === "registro" ? "signup_with" : "continue_with", width: 300, locale: "es" });
    } catch (e) {
      this._mensaje(e.message, "aviso");
    }
  }
  async _enviar(e) {
    const a = e.dataset.form, o = Object.fromEntries(new FormData(e).entries()), r = e.querySelector("button[type=submit]"), i = e.querySelector("input[name=recordar]") ? e.querySelector("input[name=recordar]").checked : !0, s = (d) => {
      r && (r.disabled = d);
    };
    this._mensaje("", "error", e);
    try {
      if (s(!0), a === "login") {
        if (!$(o.email)) throw new Error("Escribe un correo válido.");
        this._entrar(await l.iniciar({ email: o.email, password: o.clave, recordar: i }));
      } else a === "registro" ? this._entrar(await l.registrar({ nombre: o.nombre, email: o.email, password: o.clave, recordar: i })) : a === "demo-google" ? this._entrar(l.iniciarConGoogle({ email: o.email, nombre: o.nombre, demo: !0 }, !0)) : a === "perfil" ? (l.actualizarPerfil(this.usuario.id, { nombre: o.nombre }), this.usuario = l.sesionActual(), this.render(), this._mensaje("Cambios guardados.", "ok"), this._emitir()) : a === "clave" && (await l.cambiarPassword(this.usuario.id, { actual: o.actual, nueva: o.nueva }), this.usuario = l.sesionActual(), this.render(), this._mensaje("Contraseña actualizada.", "ok"));
    } catch (d) {
      s(!1), this._mensaje(d.message, "error", e);
    }
  }
}
customElements.get("ucjc-identidad") || customElements.define("ucjc-identidad", de);
const ce = { nombre: "identidad", version: "0.3.0" };
export {
  ce as default
};
