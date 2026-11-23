import { describe, it, expect, beforeEach, vi } from 'vitest';
import meta from '../src/main.js';
import { store } from '../src/store.js';

const EVENTO = 'ucjc:identidad:sesion-cambiada@1';

describe('<ucjc-identidad>', () => {
  beforeEach(() => { store._borrarTodo(); document.body.innerHTML = ''; });

  it('exporta nombre y versión y registra el custom element', () => {
    expect(meta).toEqual({ nombre: 'identidad', version: '0.3.1' });
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

  it('el inicio rápido sale por defecto, se oculta con sin-inicio-rapido y entra en la cuenta de pruebas', async () => {
    const sin = document.createElement('ucjc-identidad');
    sin.setAttribute('sin-inicio-rapido', '');
    document.body.appendChild(sin);
    expect(sin.shadowRoot.querySelector('[data-a="rapido"]')).toBeNull();
    sin.remove();

    const eventos = [];
    window.addEventListener(EVENTO, (e) => eventos.push(e.detail));
    const el = document.createElement('ucjc-identidad');
    document.body.appendChild(el);
    el.shadowRoot.querySelector('[data-a="rapido"]').click();
    await vi.waitFor(() => expect(eventos.some((d) => d.autenticado)).toBe(true));
    const d = eventos.find((x) => x.autenticado);
    expect(d.usuario.nombre).toBe('IDENTIDADBMEJORQUEIDENTIDADA');
    expect(Object.keys(d.usuario).sort()).toEqual(['email', 'id', 'nombre']);
  });
});
