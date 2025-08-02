// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weather-forecast-application/', // 👈 important!
  plugins: [react()],
});
