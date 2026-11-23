# Identidad+ · Tienda UCJC (DFE 76042)

Propuesta de pieza **Identidad** para la tienda de micro-frontends: acceso con Google o con correo, foto de perfil, aviso de **último método usado**, seguridad y registro de actividad.

**Responsable:** Juan Pedro Faba Prados · **Custom element:** `<ucjc-identidad>` · **Versión:** 0.3.0

## Qué incluye

- Inicio de sesión y registro con correo y contraseña (hash PBKDF2-SHA256, 150 000 iteraciones, con sal).
- Inicio de sesión con **Google** (Google Identity Services) y modo demo si no hay `google-client-id`.
- **Último método usado**: etiqueta "Último usado" y tarjeta "Hola de nuevo, …" con foto y correo; botón "No soy yo".
- **Foto de perfil**: la de Google o una subida por la persona (recorte centrado a 192×192), o avatar generado con iniciales.
- Perfil editable, cambio/alta de contraseña con medidor de fuerza, eliminación de cuenta en dos pasos.
- Pestaña **Actividad** con los últimos 20 eventos (inicio, cierre, cambio de contraseña, dispositivo).
- Bloqueo temporal tras 5 intentos fallidos (30 s), sesión recordada 7 días o solo la pestaña, sincronización entre pestañas.
- Shadow DOM, modo oscuro, foco visible, `prefers-reduced-motion`, textos accesibles.

## Cumplimiento del contrato

Emite únicamente `ucjc:identidad:sesion-cambiada@1` en `window`:

```json
{ "autenticado": true, "usuario": { "id": "u-…", "email": "…", "nombre": "…" }, "momento": "ISO-8601" }
```

Sin sesión: `{ "autenticado": false, "usuario": null, "momento": "…" }`. Se emite al iniciar y cerrar sesión, al cambiar el nombre, al eliminar la cuenta, al montarse el elemento y de nuevo ~500 ms después (por si el shell se suscribe tarde). **La foto, los roles y cualquier otro campo no viajan por el bus.** La pieza no toca nada fuera de su elemento. Hay un test que lo comprueba.

## Uso

```html
<ucjc-identidad google-client-id="TU_CLIENT_ID.apps.googleusercontent.com"></ucjc-identidad>
<script type="module" src="https://<usuario>.github.io/<repo>/vX.Y.Z/remote.js"></script>
```

El módulo exporta `{ nombre: 'identidad', version: '0.3.0' }`.

### Inicio rápido para pruebas

Con el atributo opcional `inicio-rapido` aparece un botón que entra directamente en una cuenta solo para pruebas
(`IDENTIDADBMEJORQUEIDENTIDADA`, `identidadb@pruebas.ucjc.edu`), creada sola en el navegador. La demo (`index.html`) lo trae activado;
el shell no lo usa. Para probarlo allí, añade el atributo al elemento o entra con ese correo y la contraseña `IdentidadB-Pruebas1!`.

```html
<ucjc-identidad inicio-rapido></ucjc-identidad>
```

### Activar Google de verdad

1. En Google Cloud Console crea un ID de cliente OAuth "Aplicación web".
2. Añade como origen autorizado el dominio donde se sirve la tienda.
3. Pásalo en el atributo `google-client-id`.

Sin el atributo, el botón abre una simulación claramente marcada como demo.

## Desarrollo

```
npm install
npm run dev      # demo en local
npm test         # 10 tests (almacén, contrato y "último usado")
npm run build    # dist/remote.js
```

Publicar: `git tag vX.Y.Z && git push --tags` (el workflow `release.yml` publica en `gh-pages/vX.Y.Z/remote.js`).

## Límites (honestidad técnica)

- Es una **simulación en el cliente**: usuarios y sesiones viven en `localStorage`/`sessionStorage`. Un sistema real necesitaría servidor.
- El token de Google se decodifica en el navegador solo para leer nombre, correo y foto; **no se verifica su firma**.
- El flujo con Google real **no se ha probado** con un client-id real; sí el modo demo y el resto.
- La foto no está en el contrato @1. Si se quiere mostrarla en otras piezas habría que proponer un campo opcional `foto` en una versión @2.
