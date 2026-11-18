import { UcjcIdentidad } from './element.js';

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}

export default { nombre: 'identidad', version: '0.3.0' };
