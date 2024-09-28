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
        // 'target': 'http://192.168.1.108:3000',
        'target': 'http://localhost:3000',
        'changeOrigin': false
      },
    }
  }
})