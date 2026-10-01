import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils') ? 'motion' : undefined),
      },
    },
  },
})
