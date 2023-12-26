import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

export default defineConfig({
  // ...
  resolve: {
    alias: {
      '@': '/src', // Ajusta según la estructura de tu proyecto
    },
  },
});