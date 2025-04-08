import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginCompression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Landing-Page-SaaS-Cybers-curit-Moderne/',
  plugins: [
    react(),
    // Gzip compression
    VitePluginCompression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    // Brotli compression
    VitePluginCompression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    })
  ],
  optimizeDeps: {
    exclude: ['chunk-2YIMICFJ', 'chunk-RLMGAKMB', '@heroicons/react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    port: 3000,
    open: true
  },
  preview: {
    port: 3000,
    open: true,
  },
})
