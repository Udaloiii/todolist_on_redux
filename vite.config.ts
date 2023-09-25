import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3001,
    open: true,
  }, // поменял порт из-за cors-ошибки ( запросы на сервер social-network разрешено только с localhost:3000, localhost:3001, localhost:9009)
})
