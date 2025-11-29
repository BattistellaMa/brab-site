import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/brab-site/',
  plugins: [react()],
  // O Vite automaticamente copia arquivos da pasta public/ para dist/
  // Então o 404.html será copiado automaticamente
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})