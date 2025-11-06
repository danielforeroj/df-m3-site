import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { 
    // This is the key change: output the build directly to the root directory.
    outDir: '.', 
    sourcemap: false 
  }
});