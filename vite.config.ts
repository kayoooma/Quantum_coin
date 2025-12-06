import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base set to './' makes assets load relatively, solving the black screen issue
  base: './', 
})