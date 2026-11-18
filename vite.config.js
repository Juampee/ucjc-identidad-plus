import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    lib: { entry: 'src/main.js', formats: ['es'], fileName: () => 'remote.js' },
    rollupOptions: { output: { inlineDynamicImports: true } },
    emptyOutDir: true,
  },
});
