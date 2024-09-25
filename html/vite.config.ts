import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 查找文件


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 更改build输出文件夹名
  build: {
    outDir: 'html'
  },
  server: {
    proxy: {
      '/api': {
        'target': 'http://localhost:3000',
        'changeOrigin': true
      },
    }
  }
})
