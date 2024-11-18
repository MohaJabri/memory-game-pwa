import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/memory-game-pwa/', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      lit: resolve(__dirname, 'node_modules/lit/index.js'), 
    },
  },
});
