import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'quantum-coin' to your actual GitHub repository name
  // e.g. base: '/my-crypto-site/'
  base: '/quantum-coin/', 
})