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
        'target': 'http://192.168.1.149:3000',
        // 'target': 'http://127.0.0.1:3000',
        // 'target': 'http://10.54.0.71:3000',
        'changeOrigin': false
      },
    }
  }
})
