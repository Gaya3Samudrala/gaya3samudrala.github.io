import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the site works at both gaya3samudrala.github.io
// and gaya3samudrala.github.io/My_portfolio/.
export default defineConfig({
  plugins: [react()],
  base: './',
});
