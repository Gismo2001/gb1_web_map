import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ol'], // Beibehalten für OpenLayers
  },
  build: {
    sourcemap: true, // Beibehalten für Debugging
  },
});
