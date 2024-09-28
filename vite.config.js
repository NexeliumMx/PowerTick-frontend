import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { version } from './package.json';  // Import the version from package.json

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),  // Define a global variable for version
  },
  base: './', // For relative paths
  build: {
    outDir: 'build', // Output directory
  },
});