import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
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
    },
    minify: false
  },
}