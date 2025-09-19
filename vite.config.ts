import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          // Modular chunks
          core: ['./src/modules/core'],
          ui: ['./src/modules/ui'],
          sections: ['./src/modules/sections'],
          data: ['./src/modules/data'],
          assets: ['./src/modules/assets'],
        },
      },
    },
    // Asset optimization
    assetsInlineLimit: 2048, // Reduced for better caching
    chunkSizeWarningLimit: 800, // Smaller chunks for better loading
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react'], // Tree-shake unused icons
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay in development
    },
    fs: {
      strict: true,
    },
  },
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
