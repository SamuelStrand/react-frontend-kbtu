import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ftg': {
        target: 'https://www.freetogame.com',
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/ftg/, '/api'),
      },
    },
  },
})
