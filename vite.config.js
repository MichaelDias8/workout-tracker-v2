import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs';

export default {
  plugins: [react(),
            commonjs()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '~bootstrap': 'bootstrap'
    }
  }, 
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  },
}