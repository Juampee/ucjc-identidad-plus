/**
 * Inicio de sesión con Google (Google Identity Services).
 *
 * - Con el atributo `google-client-id` se usa el botón oficial de Google.
 * - Sin él, la pieza entra en MODO DEMO: no contacta con Google ni verifica nada.
 *
 * El token (JWT) se decodifica en el cliente solo para leer nombre, correo y foto.
 * En un sistema real habría que verificar su firma en un servidor.
 */

const URL_GSI = 'https://accounts.google.com/gsi/client';

let promesaScript = null;

/** Carga el script oficial dentro del propio elemento (no toca el <head> de la página). */
export function cargarGoogle(contenedor) {
  if (globalThis.google && globalThis.google.accounts && globalThis.google.accounts.id) {
    return Promise.resolve(globalThis.google.accounts.id);
  }
  if (promesaScript) return promesaScript;
  promesaScript = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = URL_GSI;
    s.async = true;
    s.onload = () => {
      if (globalThis.google && globalThis.google.accounts) resolve(globalThis.google.accounts.id);
      else reject(new Error('Google no respondió.'));
    };
    s.onerror = () => {
      promesaScript = null;
      reject(new Error('No se pudo cargar Google. Revisa tu conexión.'));
    };
    contenedor.appendChild(s);
  });
  return promesaScript;
}

export function decodificarJwt(token) {
  try {
    const carga = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(carga).split('').map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Convierte la respuesta de Google en el perfil que usa la pieza. */
export function perfilDesdeCredencial(respuesta) {
  const datos = respuesta && respuesta.credential ? decodificarJwt(respuesta.credential) : null;
  if (!datos || !datos.email) return null;
  if (datos.email_verified === false) return null;
  return { email: datos.email, nombre: datos.name || datos.given_name || datos.email, foto: datos.picture || null };
}
