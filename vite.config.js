import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      external: [/^lit/],
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        globals: {
          lit: 'lit'
        }
      }
    }
  },
  server: {
    port: 1234
  },
  base: '/memory-game-pwa/',
  resolve: {
    alias: {
      'lit': resolve(__dirname, 'node_modules/lit/index.js')
    }
  }
}); 