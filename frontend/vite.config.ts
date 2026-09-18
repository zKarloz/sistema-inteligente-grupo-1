import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Plugin React: Entiende React y TSX
// Plugin Tailwind: Genera los estilos de Tailwind
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
