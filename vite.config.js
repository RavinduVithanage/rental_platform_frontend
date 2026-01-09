import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split large dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-ui': ['react-select', '@headlessui/react', '@heroicons/react'],
          'vendor-icons': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 500,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Use esbuild for minification (default and faster)
    minify: 'esbuild'
  }
})
