import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 1. Capture any request starting with "/api"
      '/api': {
        // 2. Forward it to your Render Backend
        target: 'https:/api-leadcrm.faizarfi.dev/',
        
        // 3. IMPORTANT: This tells the server "I am coming from the cloud", 
        // effectively lying about the origin to bypass security checks.
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
