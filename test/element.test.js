import { describe, it, expect, beforeEach } from 'vitest';
import meta from '../src/main.js';
import { store } from '../src/store.js';

const EVENTO = 'ucjc:identidad:sesion-cambiada@1';

describe('<ucjc-identidad>', () => {
  beforeEach(() => { store._borrarTodo(); document.body.innerHTML = ''; });

  it('exporta nombre y versión y registra el custom element', () => {
    expect(meta).toEqual({ nombre: 'identidad', version: '0.3.0' });
    expect(customElements.get('ucjc-identidad')).toBeTruthy();
  });

  it('emite sesión no autenticada al montarse', () => {
    const eventos = [];
    window.addEventListener(EVENTO, (e) => eventos.push(e.detail), { once: true });
    document.body.appendChild(document.createElement('ucjc-identidad'));
    expect(eventos[0].autenticado).toBe(false);
    expect(eventos[0].usuario).toBeNull();
  });

  it('con sesión emite SOLO id, email y nombre (sin foto)', () => {
    store.iniciarConGoogle({ email: 'g@gmail.com', nombre: 'Gina', foto: 'data:image/png;base64,AA', demo: true });
    const eventos = [];
    window.addEventListener(EVENTO, (e) => eventos.push(e.detail), { once: true });
    document.body.appendChild(document.createElement('ucjc-identidad'));
    const d = eventos[0];
    expect(d.autenticado).toBe(true);
    expect(Object.keys(d.usuario).sort()).toEqual(['email', 'id', 'nombre']);
    expect(Object.keys(d).sort()).toEqual(['autenticado', 'momento', 'usuario']);
  });

  it('muestra "Último usado" en Google tras entrar con Google y cerrar sesión', () => {
    store.iniciarConGoogle({ email: 'g@gmail.com', nombre: 'Gina', demo: true });
    store.cerrar();
    const el = document.createElement('ucjc-identidad');
    document.body.appendChild(el);
    expect(el.shadowRoot.textContent).toContain('Último usado');
    expect(el.shadowRoot.textContent).toContain('Hola de nuevo, Gina');
  });
});
