import { CSS } from './styles.js';
import { store, fortaleza, emailValido, CUENTA_PRUEBAS } from './store.js';
import { fotoUsuario, avatarGenerado, procesarFoto } from './avatar.js';
import { cargarGoogle, perfilDesdeCredencial } from './google.js';

const EVENTO = 'ucjc:identidad:sesion-cambiada@1';

const esc = (t) =>
  String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ICONO_GOOGLE =
  '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

const ICONO_CAMARA =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';

function fechaCorta(iso) {
  try {
    return new Date(iso).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

const NOMBRE_METODO = { password: 'Correo y contraseña', google: 'Google' };

export class UcjcIdentidad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.vista = 'login';
    this.pestana = 'perfil';
    this.confirmarBorrado = false;
    this.demoGoogle = false;
    this.usuario = null;
    this._alStorage = this._alStorage.bind(this);
  }

  static get observedAttributes() {
    return ['google-client-id', 'sin-inicio-rapido'];
  }

  connectedCallback() {
    window.addEventListener('storage', this._alStorage);
    this.usuario = store.sesionActual();
    this.vista = this.usuario ? 'perfil' : 'login';
    this.render();
    this._emitir();
    // Quien se suscribe un poco más tarde (p. ej. el shell) recibe también el estado actual.
    this._reemision = setTimeout(() => this._emitir(), 500);
  }

  disconnectedCallback() {
    window.removeEventListener('storage', this._alStorage);
    clearTimeout(this._reemision);
  }

  attributeChangedCallback() {
    if (this.isConnected && !this.usuario) this.render();
  }

  /** El botón de inicio rápido (cuenta de pruebas) sale por defecto; `sin-inicio-rapido` lo oculta. */
  get inicioRapido() {
    return !this.hasAttribute('sin-inicio-rapido');
  }

  get clientId() {
    return (this.getAttribute('google-client-id') || '').trim();
  }

  /* --------------------------------- Eventos --------------------------------- */

  _emitir() {
    const u = this.usuario;
    // Contrato @1: solo estos campos. La foto, los roles y demás NO viajan por el bus.
    const detail = u
      ? { autenticado: true, usuario: { id: u.id, email: u.email, nombre: u.nombre }, momento: new Date().toISOString() }
      : { autenticado: false, usuario: null, momento: new Date().toISOString() };
    window.dispatchEvent(new CustomEvent(EVENTO, { detail }));
  }

  _alStorage(e) {
    if (e.key && !e.key.startsWith('ucjc-identidad:')) return;
    const antes = this.usuario ? this.usuario.id : null;
    this.usuario = store.sesionActual();
    const despues = this.usuario ? this.usuario.id : null;
    if (antes !== despues) {
      this.vista = this.usuario ? 'perfil' : 'login';
      this.confirmarBorrado = false;
      this.render();
      this._emitir();
    } else if (this.usuario) {
      this.render();
    }
  }

  /* --------------------------------- Plantillas ------------------------------ */

  render() {
    const sr = this.shadowRoot;
    let cuerpo;
    let titulo;
    let sub;
    if (this.vista === 'perfil' && this.usuario) {
      titulo = 'Mi identidad';
      sub = 'Tu cuenta de Tienda UCJC';
      cuerpo = this._tplPerfil();
    } else if (this.vista === 'registro') {
      titulo = 'Crea tu cuenta';
      sub = 'Tarda menos de un minuto';
      cuerpo = this._tplAcceso('registro');
    } else {
      titulo = 'Te damos la bienvenida';
      sub = 'Inicia sesión para continuar';
      cuerpo = this._tplAcceso('login');
    }
    sr.innerHTML = `<style>${CSS}</style>
      <div class="marco"><div class="tarjeta" role="region" aria-label="Identidad">
        <div class="cabecera"><div class="marca">Tienda UCJC · Identidad</div><h2>${titulo}</h2><p>${sub}</p></div>
        <div class="cuerpo">${cuerpo}</div></div></div>`;
    this._enlazar();
  }

  _tplAcceso(modo) {
    const ult = store.ultimo();
    const esRegistro = modo === 'registro';
    const marcaGoogle = ult && ult.metodo === 'google' ? '<span class="chip">Último usado</span>' : '';
    const marcaClave = ult && ult.metodo === 'password' ? '<span class="chip">Último usado</span>' : '';
    const bienvenida = ult && !esRegistro
      ? `<div class="bienvenida"><img alt="" src="${esc(fotoUsuario(ult))}"><div class="txt"><b>Hola de nuevo, ${esc(ult.nombre.split(' ')[0])}</b><small>${esc(ult.email)}</small></div><button type="button" class="enlace" data-a="olvidar">No soy yo</button></div>`
      : '';
    const botonGoogle = this.clientId
      ? `<div class="google" style="display:flex;justify-content:center;min-height:44px"><div id="gbtn"></div></div>${marcaGoogle ? `<p class="ayuda" style="text-align:center">${marcaGoogle} Usaste Google la última vez</p>` : ''}`
      : `<button type="button" class="boton secundario google" data-a="google">${ICONO_GOOGLE}<span>${esRegistro ? 'Registrarse' : 'Continuar'} con Google</span>${marcaGoogle}</button>`;
    const rapido = this.inicioRapido && !esRegistro
      ? `<div class="demo"><b>Inicio rápido (solo pruebas)</b>
          <button type="button" class="boton primario" data-a="rapido" style="margin-top:.5rem">Inicio rápido · ${esc(CUENTA_PRUEBAS.nombre)}</button>
          <p class="ayuda">Entra directamente con una cuenta de prueba (<code>${esc(CUENTA_PRUEBAS.email)}</code>). Se crea sola en este navegador.</p></div>`
      : '';
    return `
      ${bienvenida}
      ${rapido}
      <div class="pestanas" role="tablist">
        <button class="pestana" role="tab" type="button" data-vista="login" aria-selected="${!esRegistro}">Iniciar sesión</button>
        <button class="pestana" role="tab" type="button" data-vista="registro" aria-selected="${esRegistro}">Registrarse</button>
      </div>
      ${botonGoogle}
      ${this.demoGoogle ? this._tplDemoGoogle() : ''}
      ${!this.clientId ? '<div class="demo"><b>Modo demo.</b> Sin <code>google-client-id</code> el botón de Google simula el inicio de sesión: no contacta con Google.</div>' : ''}
      <div class="separador">o con tu correo ${marcaClave}</div>
      <form data-form="${modo}" novalidate>
        ${esRegistro ? '<label for="nombre">Nombre</label><input id="nombre" name="nombre" type="text" autocomplete="name" required>' : ''}
        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" autocomplete="email" value="${esc(!esRegistro && ult ? ult.email : '')}" required>
        <div class="fila-etiqueta"><label for="clave">Contraseña</label></div>
        <div class="campo-clave">
          <input id="clave" name="clave" type="password" autocomplete="${esRegistro ? 'new-password' : 'current-password'}" required>
          <button type="button" class="ojo" data-a="ver" aria-label="Mostrar u ocultar la contraseña" aria-pressed="false">Mostrar</button>
        </div>
        ${esRegistro ? '<div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>' : ''}
        <label class="recordar"><input type="checkbox" name="recordar" checked> Mantener la sesión 7 días en este dispositivo</label>
        <button class="boton primario" type="submit">${esRegistro ? 'Crear cuenta' : 'Entrar'}</button>
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
    const u = this.usuario;
    const pest = ['perfil', 'seguridad', 'actividad'];
    const nombres = { perfil: 'Perfil', seguridad: 'Seguridad', actividad: 'Actividad' };
    let panel = '';
    if (this.pestana === 'perfil') panel = this._tplPanelPerfil(u);
    else if (this.pestana === 'seguridad') panel = this._tplPanelSeguridad(u);
    else panel = this._tplPanelActividad(u);
    return `
      <div class="perfil-cab">
        <div class="avatar-grande">
          <img alt="Foto de perfil de ${esc(u.nombre)}" src="${esc(fotoUsuario(u))}">
          <button type="button" class="camara" data-a="foto" aria-label="Cambiar foto de perfil">${ICONO_CAMARA}</button>
          <input type="file" accept="image/*" hidden data-archivo>
        </div>
        <div><h3>${esc(u.nombre)}</h3><p>${esc(u.email)}</p>
          <div class="metodos">${u.metodos.map((m) => `<span class="chip">${esc(NOMBRE_METODO[m] || m)}${m === u.metodoSesion ? ' · esta sesión' : ''}</span>`).join('')}</div></div>
      </div>
      <div class="pestanas tres" role="tablist">
        ${pest.map((p) => `<button class="pestana" role="tab" type="button" data-pest="${p}" aria-selected="${this.pestana === p}">${nombres[p]}</button>`).join('')}
      </div>
      ${panel}
      <div class="mensaje" role="alert" data-msg></div>
      <div class="zona"><button type="button" class="boton secundario" data-a="salir">Cerrar sesión</button></div>`;
  }

  _tplPanelPerfil(u) {
    return `<form data-form="perfil" novalidate>
      <label for="pn">Nombre visible</label>
      <input id="pn" name="nombre" type="text" autocomplete="name" value="${esc(u.nombre)}">
      <p class="ayuda">Este nombre se comparte con el resto de piezas de la tienda junto a tu correo. La foto no se comparte.</p>
      <div class="dos"><button type="submit" class="boton primario" style="margin-top:0">Guardar</button>
      <button type="button" class="boton secundario" data-a="quitar-foto" ${u.foto ? '' : 'disabled'}>Quitar foto</button></div>
      <p class="ayuda">Cuenta creada el ${esc(fechaCorta(u.creado))}</p></form>`;
  }

  _tplPanelSeguridad(u) {
    const cambio = `<form data-form="clave" novalidate>
      ${u.tienePassword ? '<label for="ca">Contraseña actual</label><input id="ca" name="actual" type="password" autocomplete="current-password">' : '<p class="ayuda">Tu cuenta entra con Google. Puedes añadir una contraseña para entrar también con tu correo.</p>'}
      <label for="cn">${u.tienePassword ? 'Contraseña nueva' : 'Crear contraseña'}</label>
      <input id="cn" name="nueva" type="password" autocomplete="new-password">
      <div class="medidor" data-p="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div class="etiqueta-fuerza"><span data-fuerza>Muy débil</span><span data-consejo></span></div>
      <button type="submit" class="boton primario">${u.tienePassword ? 'Cambiar contraseña' : 'Añadir contraseña'}</button></form>`;
    const borrar = this.confirmarBorrado
      ? `<div class="mensaje error" style="display:block"><b>¿Eliminar tu cuenta?</b> Se borrarán tus datos de este navegador y no se puede deshacer.
          <div class="dos"><button type="button" class="boton secundario" data-a="no-borrar">Cancelar</button><button type="button" class="boton peligro" data-a="si-borrar">Sí, eliminar</button></div></div>`
      : '<button type="button" class="boton peligro" data-a="borrar">Eliminar mi cuenta</button>';
    return `${cambio}<div class="zona"><h4>Zona de peligro</h4>${borrar}</div>`;
  }

  _tplPanelActividad(u) {
    const filas = store.actividad(u.id);
    if (!filas.length) return '<p class="ayuda">Aún no hay actividad.</p>';
    return `<ul class="lista">${filas.map((f) => {
      const clase = f.evento.startsWith('cierre') ? 'salida' : f.evento.startsWith('cambio') ? 'cambio' : '';
      return `<li><span class="punto ${clase}"></span><div><b>${esc(f.evento[0].toUpperCase() + f.evento.slice(1))}</b><small>${esc(NOMBRE_METODO[f.metodo] || f.metodo)} · ${esc(f.dispositivo)} · ${esc(fechaCorta(f.t))}</small></div></li>`;
    }).join('')}</ul>`;
  }

  /* ---------------------------------- Lógica --------------------------------- */

  $(sel) {
    return this.shadowRoot.querySelector(sel);
  }

  _mensaje(texto, tipo = 'error', ambito = null) {
    const caja = (ambito && ambito.querySelector('[data-msg]')) || this.$('[data-msg]');
    if (!caja) return;
    caja.className = `mensaje ${tipo}`;
    caja.textContent = texto || '';
  }

  _entrar(usuario) {
    this.usuario = store.sesionActual() || usuario;
    this.vista = 'perfil';
    this.pestana = 'perfil';
    this.demoGoogle = false;
    this.render();
    this._emitir();
  }

  _enlazar() {
    const sr = this.shadowRoot;
    sr.querySelectorAll('[data-vista]').forEach((b) => b.addEventListener('click', () => { this.vista = b.dataset.vista; this.demoGoogle = false; this.render(); }));
    sr.querySelectorAll('[data-pest]').forEach((b) => b.addEventListener('click', () => { this.pestana = b.dataset.pest; this.confirmarBorrado = false; this.render(); }));

    const acciones = {
      ver: (b) => {
        const campo = this.$('#clave');
        const oculto = campo.type === 'password';
        campo.type = oculto ? 'text' : 'password';
        b.textContent = oculto ? 'Ocultar' : 'Mostrar';
        b.setAttribute('aria-pressed', String(oculto));
      },
      rapido: async (b) => {
        b.disabled = true;
        try {
          this._entrar(await store.iniciarRapido(true));
        } catch (e) {
          b.disabled = false;
          this._mensaje(e.message);
        }
      },
      olvidar: () => { store.olvidarUltimo(); this.render(); },
      google: () => { this.demoGoogle = true; this.render(); const i = this.$('#gnombre'); if (i) i.focus(); },
      'cancelar-demo': () => { this.demoGoogle = false; this.render(); },
      foto: () => this.$('[data-archivo]').click(),
      'quitar-foto': () => {
        this.usuario = store.actualizarPerfil(this.usuario.id, { foto: null });
        this.usuario = store.sesionActual();
        this.render();
        this._mensaje('Foto eliminada.', 'ok');
      },
      salir: () => { store.cerrar(); this.usuario = null; this.vista = 'login'; this.render(); this._emitir(); },
      borrar: () => { this.confirmarBorrado = true; this.render(); },
      'no-borrar': () => { this.confirmarBorrado = false; this.render(); },
      'si-borrar': () => { store.eliminarCuenta(this.usuario.id); this.usuario = null; this.vista = 'login'; this.confirmarBorrado = false; this.render(); this._emitir(); },
    };
    sr.querySelectorAll('[data-a]').forEach((b) => {
      const f = acciones[b.dataset.a];
      if (f) b.addEventListener('click', () => f(b));
    });

    const archivo = this.$('[data-archivo]');
    if (archivo) archivo.addEventListener('change', () => this._subirFoto(archivo));

    sr.querySelectorAll('input[name=clave], input[name=nueva]').forEach((c) => c.addEventListener('input', () => this._medidor(c)));
    sr.querySelectorAll('form[data-form]').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); this._enviar(f); }));

    if (this.clientId && !this.usuario && this.$('#gbtn')) this._montarGoogle();
  }

  _medidor(campo) {
    const f = fortaleza(campo.value);
    const form = campo.closest('form');
    const m = form.querySelector('.medidor');
    if (!m) return;
    m.dataset.p = String(campo.value ? Math.max(1, f.puntos) : 0);
    form.querySelector('[data-fuerza]').textContent = campo.value ? f.etiqueta : 'Muy débil';
    form.querySelector('[data-consejo]').textContent = campo.value && f.consejos[0] ? f.consejos[0] : '';
  }

  async _subirFoto(input) {
    const f = input.files && input.files[0];
    if (!f) return;
    try {
      const foto = await procesarFoto(f);
      store.actualizarPerfil(this.usuario.id, { foto });
      this.usuario = store.sesionActual();
      this.render();
      this._mensaje('Foto actualizada.', 'ok');
    } catch (err) {
      this._mensaje(err.message);
    }
  }

  async _montarGoogle() {
    try {
      const gid = await cargarGoogle(this.shadowRoot);
      gid.initialize({
        client_id: this.clientId,
        callback: (resp) => {
          const perfil = perfilDesdeCredencial(resp);
          if (!perfil) return this._mensaje('Google no devolvió un perfil válido.');
          try {
            this._entrar(store.iniciarConGoogle(perfil, true));
          } catch (e) {
            this._mensaje(e.message);
          }
        },
      });
      const destino = this.$('#gbtn');
      if (destino) gid.renderButton(destino, { theme: 'outline', size: 'large', text: this.vista === 'registro' ? 'signup_with' : 'continue_with', width: 300, locale: 'es' });
    } catch (e) {
      this._mensaje(e.message, 'aviso');
    }
  }

  async _enviar(form) {
    const tipo = form.dataset.form;
    const datos = Object.fromEntries(new FormData(form).entries());
    const boton = form.querySelector('button[type=submit]');
    const recordar = form.querySelector('input[name=recordar]') ? form.querySelector('input[name=recordar]').checked : true;
    const bloquear = (v) => { if (boton) { boton.disabled = v; } };
    this._mensaje('', 'error', form);
    try {
      bloquear(true);
      if (tipo === 'login') {
        if (!emailValido(datos.email)) throw new Error('Escribe un correo válido.');
        this._entrar(await store.iniciar({ email: datos.email, password: datos.clave, recordar }));
      } else if (tipo === 'registro') {
        this._entrar(await store.registrar({ nombre: datos.nombre, email: datos.email, password: datos.clave, recordar }));
      } else if (tipo === 'demo-google') {
        this._entrar(store.iniciarConGoogle({ email: datos.email, nombre: datos.nombre, demo: true }, true));
      } else if (tipo === 'perfil') {
        store.actualizarPerfil(this.usuario.id, { nombre: datos.nombre });
        this.usuario = store.sesionActual();
        this.render();
        this._mensaje('Cambios guardados.', 'ok');
        this._emitir();
      } else if (tipo === 'clave') {
        await store.cambiarPassword(this.usuario.id, { actual: datos.actual, nueva: datos.nueva });
        this.usuario = store.sesionActual();
        this.render();
        this._mensaje('Contraseña actualizada.', 'ok');
      }
    } catch (e) {
      bloquear(false);
      this._mensaje(e.message, 'error', form);
    }
  }
}

export { avatarGenerado };
