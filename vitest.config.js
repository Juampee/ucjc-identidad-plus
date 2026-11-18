import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { environment: 'jsdom', setupFiles: ['test/setup.js'], testTimeout: 20000 },
});
