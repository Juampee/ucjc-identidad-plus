export const CSS = `
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
`;
