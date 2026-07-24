import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../generator',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
