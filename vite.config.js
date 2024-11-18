import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),  
      },
      output: {
        entryFileNames: `assets/[name].js`, 
        chunkFileNames: `assets/[name].js`, 
        assetFileNames: `assets/[name].[ext]`, 
        globals: {
          lit: 'lit',  // Esto es solo necesario si usas "lit" de un CDN en un entorno de producción
        },
      }
    }
  },
  server: {
    port: 1234  
  },
  base: '/memory-game-pwa/',  
  resolve: {
    alias: {
      // Usamos un CDN para lit en lugar de intentar resolverlo desde node_modules
      lit: 'https://cdn.skypack.dev/lit'
    }
  }
});
