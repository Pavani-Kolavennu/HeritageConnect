import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/Pavani-Kolavennu/HeritageConnect'   // MUST match repo name exactly
})
