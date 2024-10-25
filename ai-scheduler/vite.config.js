import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Vite configuration is being loaded');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})