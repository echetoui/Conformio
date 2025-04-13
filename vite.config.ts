import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/Landing-Page-SaaS-Cybers-curit-Moderne/',
  plugins: [
    react(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    // Brotli compression
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext',
    cssTarget: 'chrome61',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      format: {
        comments: false
      }
    },
    sourcemap: true,
    reportCompressedSize: true
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    port: 3000,
    host: true,
    open: true
  },
  _server: {
    hmr: {
      clientPort: 443,
      path: '/Landing-Page-SaaS-Cybers-curit-Moderne/'
    },
  },
  get server() {
    return this._server
  },
  set server(value) {
    this._server = value
  },
  preview: {
    port: 3000,
    open: true
  }
})
