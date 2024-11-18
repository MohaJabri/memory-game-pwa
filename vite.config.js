import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/app.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  server: {
    port: 1234
  },
  base: '/memory-game-pwa/'
}); 