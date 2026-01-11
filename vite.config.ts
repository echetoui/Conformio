import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Note: Compression is disabled as Vercel handles it server-side
    // with proper MIME type headers. Enabling compression here can cause
    // MIME type issues in production where .gz/.br files are served with
    // incorrect Content-Type headers.
    // Vercel's automatic compression provides better compatibility.
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
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
    },
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@styles': '/src/styles'
    }
  },
  server: {
    headers: {
      'Cache-Control': 'no-store',
    },
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    port: 3000,
    open: true
  }
})
