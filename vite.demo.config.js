import { defineConfig } from 'vite';

// Demo para GitHub Pages: compila index.html (app normal, no librería).
export default defineConfig({
  base: './',
  build: { outDir: 'dist-demo', emptyOutDir: true },
});
