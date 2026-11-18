/**
 * Almacén de Identidad (cliente).
 * Todo vive en el navegador (localStorage / sessionStorage). Es una SIMULACIÓN
 * educativa: no sustituye a un servidor de autenticación real.
 */

const K_USUARIOS = 'ucjc-identidad:usuarios';
const K_SESION = 'ucjc-identidad:sesion';
const K_ULTIMO = 'ucjc-identidad:ultimo';
const K_INTENTOS = 'ucjc-identidad:intentos';

const ITERACIONES = 150000;
const MAX_INTENTOS = 5;
const VENTANA_MS = 5 * 60 * 1000;
const BLOQUEO_MS = 30 * 1000;
const SESION_RECORDADA_MS = 7 * 24 * 60 * 60 * 1000;

/* ------------------------------ Almacenamiento ----------------------------- */

const memoria = new Map();

function lectura(storage, clave) {
  try {
    const v = storage.getItem(clave);
    return v == null ? null : JSON.parse(v);
  } catch {
    return memoria.has(clave) ? memoria.get(clave) : null;
  }
}

function escritura(storage, clave, valor) {
  try {
    storage.setItem(clave, JSON.stringify(valor));
  } catch {
    memoria.set(clave, valor);
  }
}

function borrado(storage, clave) {
  try {
    storage.removeItem(clave);
  } catch {
    memoria.delete(clave);
  }
}

const local = () => globalThis.localStorage;
const sesionStorage = () => globalThis.sessionStorage;

/* ---------------------------------- Utilidades ----------------------------- */

const enc = new TextEncoder();

function b64e(bytes) {
  let s = '';
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
}

function b64d(txt) {
  return Uint8Array.from(atob(txt), (c) => c.charCodeAt(0));
}

export async function hashPassword(password, saltB64) {
  const salt = saltB64 ? b64d(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const clave = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERACIONES, hash: 'SHA-256' },
    clave,
    256
  );
  return { salt: b64e(salt), hash: b64e(new Uint8Array(bits)) };
}

function igualesSeguro(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function normalizarEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizarEmail(email));
}

const COMUNES = new Set([
  '12345678', 'password', 'contraseña', 'qwertyui', '11111111', 'iloveyou', '123456789',
  'abcd1234', 'password1', 'admin123', 'letmein1', 'ucjc1234',
]);

/** Devuelve { puntos: 0..4, etiqueta, consejos[] } */
export function fortaleza(password) {
  const p = String(password || '');
  const consejos = [];
  let puntos = 0;
  if (p.length >= 8) puntos++; else consejos.push('Usa al menos 8 caracteres');
  if (p.length >= 12) puntos++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) puntos++; else consejos.push('Mezcla mayúsculas y minúsculas');
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) puntos++; else consejos.push('Añade un número y un símbolo');
  if (COMUNES.has(p.toLowerCase())) {
    puntos = 0;
    consejos.unshift('Es una contraseña demasiado común');
  }
  puntos = Math.min(4, puntos);
  const etiquetas = ['Muy débil', 'Débil', 'Aceptable', 'Buena', 'Excelente'];
  return { puntos, etiqueta: etiquetas[p ? puntos : 0], consejos };
}

function idNuevo() {
  const r = crypto.getRandomValues(new Uint8Array(6));
  return 'u-' + [...r].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function describirDispositivo(ua = '') {
  const nav = /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox'
    : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Navegador';
  const so = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android'
    : /iPhone|iPad/.test(ua) ? 'iOS' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'desconocido';
  return `${nav} en ${so}`;
}

class ErrorIdentidad extends Error {}
const fallo = (m) => new ErrorIdentidad(m);

/* ---------------------------------- Usuarios ------------------------------- */

function usuarios() {
  return lectura(local(), K_USUARIOS) || {};
}

function guardarUsuarios(u) {
  escritura(local(), K_USUARIOS, u);
}

function publico(u) {
  if (!u) return null;
  const { salt, hash, ...resto } = u;
  return { ...resto, tienePassword: Boolean(hash) };
}

function registrarActividad(u, evento, metodo) {
  const ua = globalThis.navigator ? globalThis.navigator.userAgent : '';
  u.actividad = [{ t: new Date().toISOString(), evento, metodo, dispositivo: describirDispositivo(ua) }, ...(u.actividad || [])].slice(0, 20);
}

/* --------------------------- Intentos / bloqueo ---------------------------- */

function estadoIntentos(email) {
  const todos = lectura(local(), K_INTENTOS) || {};
  const ahora = Date.now();
  const lista = (todos[email] || []).filter((t) => ahora - t < VENTANA_MS);
  return { todos, lista, ahora };
}

function segundosBloqueo(email) {
  const { lista, ahora } = estadoIntentos(email);
  if (lista.length < MAX_INTENTOS) return 0;
  const hasta = lista[lista.length - 1] + BLOQUEO_MS;
  return Math.max(0, Math.ceil((hasta - ahora) / 1000));
}

function anotarFallo(email) {
  const { todos, lista, ahora } = estadoIntentos(email);
  todos[email] = [...lista, ahora];
  escritura(local(), K_INTENTOS, todos);
}

function limpiarIntentos(email) {
  const todos = lectura(local(), K_INTENTOS) || {};
  delete todos[email];
  escritura(local(), K_INTENTOS, todos);
}

/* ----------------------------------- API ----------------------------------- */

function abrirSesion(u, metodo, recordar) {
  const datos = { userId: u.id, metodo, inicio: new Date().toISOString(), recordar: Boolean(recordar) };
  borrado(local(), K_SESION);
  borrado(sesionStorage(), K_SESION);
  escritura(recordar ? local() : sesionStorage(), K_SESION, datos);
  escritura(local(), K_ULTIMO, {
    metodo,
    email: u.email,
    nombre: u.nombre,
    foto: u.foto || null,
  });
}

export const store = {
  async registrar({ nombre, email, password, recordar = true }) {
    nombre = String(nombre || '').trim();
    email = normalizarEmail(email);
    if (nombre.length < 2) throw fallo('Escribe tu nombre (mínimo 2 caracteres).');
    if (!emailValido(email)) throw fallo('Escribe un correo válido.');
    if (fortaleza(password).puntos < 2 || String(password).length < 8) {
      throw fallo('La contraseña es demasiado débil: usa al menos 8 caracteres y mezcla tipos.');
    }
    const todos = usuarios();
    if (todos[email]) throw fallo('Ya existe una cuenta con ese correo. Inicia sesión.');
    const { salt, hash } = await hashPassword(password);
    const u = {
      id: idNuevo(), email, nombre, foto: null, metodos: ['password'],
      salt, hash, creado: new Date().toISOString(), actividad: [],
    };
    registrarActividad(u, 'registro', 'password');
    todos[email] = u;
    guardarUsuarios(todos);
    abrirSesion(u, 'password', recordar);
    return publico(u);
  },

  async iniciar({ email, password, recordar = true }) {
    email = normalizarEmail(email);
    if (!emailValido(email)) throw fallo('Escribe un correo válido.');
    const espera = segundosBloqueo(email);
    if (espera > 0) throw fallo(`Demasiados intentos. Espera ${espera} s e inténtalo de nuevo.`);
    const todos = usuarios();
    const u = todos[email];
    // Se calcula el hash aunque no exista la cuenta para no revelar su existencia por tiempo.
    const prueba = await hashPassword(String(password || ''), u && u.salt ? u.salt : undefined);
    if (!u || !u.hash || !igualesSeguro(prueba.hash, u.hash)) {
      anotarFallo(email);
      throw fallo('Correo o contraseña incorrectos.');
    }
    limpiarIntentos(email);
    registrarActividad(u, 'inicio de sesión', 'password');
    guardarUsuarios({ ...todos, [email]: u });
    abrirSesion(u, 'password', recordar);
    return publico(u);
  },

  /** Perfil ya verificado por Google (o simulación demo). */
  iniciarConGoogle({ email, nombre, foto = null, demo = false }, recordar = true) {
    email = normalizarEmail(email);
    if (!emailValido(email)) throw fallo('Google no devolvió un correo válido.');
    const todos = usuarios();
    let u = todos[email];
    if (!u) {
      u = {
        id: idNuevo(), email, nombre: String(nombre || email.split('@')[0]).trim(), foto: foto || null,
        metodos: ['google'], creado: new Date().toISOString(), actividad: [], demoGoogle: demo,
      };
      registrarActividad(u, 'registro', 'google');
    } else {
      if (!u.metodos.includes('google')) u.metodos.push('google');
      if (foto && !u.foto) u.foto = foto;
      registrarActividad(u, 'inicio de sesión', 'google');
    }
    todos[email] = u;
    guardarUsuarios(todos);
    abrirSesion(u, 'google', recordar);
    return publico(u);
  },

  sesionActual() {
    const s = lectura(sesionStorage(), K_SESION) || lectura(local(), K_SESION);
    if (!s) return null;
    if (s.recordar && Date.now() - Date.parse(s.inicio) > SESION_RECORDADA_MS) {
      borrado(local(), K_SESION);
      return null;
    }
    const u = Object.values(usuarios()).find((x) => x.id === s.userId);
    if (!u) return null;
    return { ...publico(u), metodoSesion: s.metodo, inicioSesion: s.inicio };
  },

  cerrar() {
    const s = lectura(sesionStorage(), K_SESION) || lectura(local(), K_SESION);
    if (s) {
      const todos = usuarios();
      const u = Object.values(todos).find((x) => x.id === s.userId);
      if (u) {
        registrarActividad(u, 'cierre de sesión', s.metodo);
        guardarUsuarios({ ...todos, [u.email]: u });
      }
    }
    borrado(local(), K_SESION);
    borrado(sesionStorage(), K_SESION);
  },

  ultimo() {
    return lectura(local(), K_ULTIMO);
  },

  olvidarUltimo() {
    borrado(local(), K_ULTIMO);
  },

  actualizarPerfil(id, { nombre, foto }) {
    const todos = usuarios();
    const u = Object.values(todos).find((x) => x.id === id);
    if (!u) throw fallo('La cuenta ya no existe.');
    if (nombre !== undefined) {
      const n = String(nombre).trim();
      if (n.length < 2) throw fallo('El nombre debe tener al menos 2 caracteres.');
      u.nombre = n;
    }
    if (foto !== undefined) u.foto = foto;
    guardarUsuarios({ ...todos, [u.email]: u });
    const ult = lectura(local(), K_ULTIMO);
    if (ult && ult.email === u.email) escritura(local(), K_ULTIMO, { ...ult, nombre: u.nombre, foto: u.foto || null });
    return publico(u);
  },

  async cambiarPassword(id, { actual, nueva }) {
    const todos = usuarios();
    const u = Object.values(todos).find((x) => x.id === id);
    if (!u) throw fallo('La cuenta ya no existe.');
    if (u.hash) {
      const prueba = await hashPassword(String(actual || ''), u.salt);
      if (!igualesSeguro(prueba.hash, u.hash)) throw fallo('La contraseña actual no es correcta.');
    }
    if (String(nueva).length < 8 || fortaleza(nueva).puntos < 2) {
      throw fallo('La contraseña nueva es demasiado débil.');
    }
    const { salt, hash } = await hashPassword(nueva);
    u.salt = salt;
    u.hash = hash;
    if (!u.metodos.includes('password')) u.metodos.push('password');
    registrarActividad(u, 'cambio de contraseña', 'password');
    guardarUsuarios({ ...todos, [u.email]: u });
    return publico(u);
  },

  eliminarCuenta(id) {
    const todos = usuarios();
    const u = Object.values(todos).find((x) => x.id === id);
    if (u) {
      delete todos[u.email];
      guardarUsuarios(todos);
      const ult = lectura(local(), K_ULTIMO);
      if (ult && ult.email === u.email) borrado(local(), K_ULTIMO);
    }
    borrado(local(), K_SESION);
    borrado(sesionStorage(), K_SESION);
  },

  actividad(id) {
    const u = Object.values(usuarios()).find((x) => x.id === id);
    return u ? u.actividad || [] : [];
  },

  /** Solo para tests y para el botón de restablecer de la demo. */
  _borrarTodo() {
    [K_USUARIOS, K_SESION, K_ULTIMO, K_INTENTOS].forEach((k) => {
      borrado(local(), k);
      borrado(sesionStorage(), k);
    });
  },
};

export { ErrorIdentidad, MAX_INTENTOS };
