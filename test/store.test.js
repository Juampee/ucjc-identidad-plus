import { describe, it, expect, beforeEach } from 'vitest';
import { CUENTA_PRUEBAS, store, fortaleza, emailValido } from '../src/store.js';

beforeEach(() => store._borrarTodo());

describe('store', () => {
  it('registra, inicia y cierra sesión', async () => {
    const u = await store.registrar({ nombre: 'Ana Pérez', email: 'Ana@Mail.com', password: 'Clave-Segura1!' });
    expect(u.email).toBe('ana@mail.com');
    expect(u.hash).toBeUndefined();
    expect(store.sesionActual().id).toBe(u.id);
    store.cerrar();
    expect(store.sesionActual()).toBeNull();
    const v = await store.iniciar({ email: 'ana@mail.com', password: 'Clave-Segura1!' });
    expect(v.id).toBe(u.id);
    expect(store.ultimo().metodo).toBe('password');
  });

  it('rechaza contraseña incorrecta y bloquea tras 5 fallos', async () => {
    await store.registrar({ nombre: 'Ana', email: 'a@b.com', password: 'Clave-Segura1!' });
    store.cerrar();
    for (let i = 0; i < 5; i++) await expect(store.iniciar({ email: 'a@b.com', password: 'mala' })).rejects.toThrow(/incorrectos/);
    await expect(store.iniciar({ email: 'a@b.com', password: 'Clave-Segura1!' })).rejects.toThrow(/Demasiados/);
  });

  it('Google recuerda el último método y conserva la foto', () => {
    store.iniciarConGoogle({ email: 'g@gmail.com', nombre: 'Gina', foto: 'data:image/png;base64,AA', demo: true });
    expect(store.ultimo()).toMatchObject({ metodo: 'google', email: 'g@gmail.com' });
    expect(store.sesionActual().foto).toContain('data:image');
  });

  it('no registra duplicados ni contraseñas débiles', async () => {
    await expect(store.registrar({ nombre: 'Ana', email: 'x@y.com', password: '123' })).rejects.toThrow();
    await store.registrar({ nombre: 'Ana', email: 'x@y.com', password: 'Clave-Segura1!' });
    await expect(store.registrar({ nombre: 'Ana', email: 'x@y.com', password: 'Clave-Segura1!' })).rejects.toThrow(/Ya existe/);
  });

  it('cambia contraseña y elimina cuenta', async () => {
    const u = await store.registrar({ nombre: 'Ana', email: 'c@d.com', password: 'Clave-Segura1!' });
    await expect(store.cambiarPassword(u.id, { actual: 'x', nueva: 'Otra-Clave-9!' })).rejects.toThrow();
    await store.cambiarPassword(u.id, { actual: 'Clave-Segura1!', nueva: 'Otra-Clave-9!' });
    store.eliminarCuenta(u.id);
    expect(store.sesionActual()).toBeNull();
    await expect(store.iniciar({ email: 'c@d.com', password: 'Otra-Clave-9!' })).rejects.toThrow();
  });

  it('utilidades', () => {
    expect(emailValido('a@b.co')).toBe(true);
    expect(emailValido('nope')).toBe(false);
    expect(fortaleza('Abcdef12!xyz').puntos).toBe(4);
    expect(fortaleza('password').puntos).toBe(0);
  });

  it('inicio rápido crea y reutiliza la cuenta de pruebas', async () => {
    const u = await store.iniciarRapido();
    expect(u.nombre).toBe('IDENTIDADBMEJORQUEIDENTIDADA');
    expect(store.sesionActual().id).toBe(u.id);
    store.cerrar();
    const otra = await store.iniciarRapido();
    expect(otra.id).toBe(u.id);
    store.cerrar();
    const manual = await store.iniciar({ email: CUENTA_PRUEBAS.email, password: CUENTA_PRUEBAS.password });
    expect(manual.id).toBe(u.id);
  });
});
