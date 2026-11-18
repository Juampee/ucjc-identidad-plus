/** Avatares: iniciales generadas y redimensionado de fotos subidas. */

function hash(texto) {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

export function iniciales(nombre = '', email = '') {
  const partes = String(nombre).trim().split(/\s+/).filter(Boolean);
  if (partes.length >= 2) return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return String(email).slice(0, 2).toUpperCase() || '?';
}

/** Avatar SVG (data URL) con degradado estable según el correo. */
export function avatarGenerado(nombre, email) {
  const h = hash(String(email || nombre));
  const a = h % 360;
  const b = (a + 48) % 360;
  const txt = iniciales(nombre, email);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${a} 70% 52%)"/><stop offset="1" stop-color="hsl(${b} 75% 42%)"/>` +
    `</linearGradient></defs><rect width="120" height="120" fill="url(#g)"/>` +
    `<text x="60" y="60" dy=".35em" text-anchor="middle" font-family="system-ui,Segoe UI,Arial,sans-serif" ` +
    `font-size="46" font-weight="600" fill="#fff">${txt.replace(/[<&>]/g, '')}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export function fotoUsuario(u) {
  return u && u.foto ? u.foto : avatarGenerado(u ? u.nombre : '', u ? u.email : '');
}

const TIPOS_FOTO = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 5 * 1024 * 1024;

/** Recorta al centro y reduce a 192×192 JPEG para guardarla en el navegador. */
export function procesarFoto(archivo, lado = 192) {
  return new Promise((resolve, reject) => {
    if (!archivo) return reject(new Error('No se ha elegido ninguna imagen.'));
    if (!TIPOS_FOTO.includes(archivo.type)) return reject(new Error('Usa una imagen JPG, PNG, WebP o GIF.'));
    if (archivo.size > MAX_BYTES) return reject(new Error('La imagen pesa más de 5 MB.'));
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const lienzo = document.createElement('canvas');
      lienzo.width = lienzo.height = lado;
      const ctx = lienzo.getContext('2d');
      const lMin = Math.min(img.width, img.height);
      const sx = (img.width - lMin) / 2;
      const sy = (img.height - lMin) / 2;
      ctx.drawImage(img, sx, sy, lMin, lMin, 0, 0, lado, lado);
      URL.revokeObjectURL(url);
      resolve(lienzo.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen.'));
    };
    img.src = url;
  });
}
