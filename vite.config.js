import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,  // <-- changed from 3000
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // <-- your NestJS API port
        changeOrigin: true,
      },
    },
  },
})