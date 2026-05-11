import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase — only loads when auth/share features are used
          if (id.includes('node_modules/firebase')) {
            return 'firebase';
          }
          // Framer-motion — large animation library, lazy-loaded
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  }
})
