import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || '/laffeyy-portfolio-website', // Comment this line during local
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Comment this line during local
    },
  },
})