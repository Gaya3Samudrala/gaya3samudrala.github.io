import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the root of gaya3samudrala.github.io.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
