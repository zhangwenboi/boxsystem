import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 查找文件


export default defineConfig({
  plugins: [react()],
  base: '/',
  // 更改build输出文件夹名
  build: {
    outDir: 'html',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },

    rollupOptions: {
      output: {
        // 配置rollup输出选项
        // Static resource classification and packaging//静态资源分类打包
        chunkFileNames: `assets/js/[name].js`, //代码块文件名
        entryFileNames: `assets/js/[name].js`, //入口文件名
        assetFileNames: `assets/[ext]/[name].[ext]`, // 资源文件名
        manualChunks: {
          antd: ['antd'],
          'react-dom': ['react-dom'],
          'ant-design-pro-components': ['@ant-design/pro-components'],
          'icons': ['@ant-design/icons'],
          'ant-charts': ['@ant-design/charts'],
          'react-countup': ['react-countup'],
          'react-router': ['react-router'],
          'react-router-dom': ['react-router-dom'],
          'umi-request': ['umi-request']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 'target': 'http://192.168.1.108:3000',
        'target': 'http://10.147.20.104',
        // 'target': 'http://127.0.0.1:3000',
        // 'target': 'http://10.54.0.71:3000',
        // 'target': 'http://localhost:3000',
        'changeOrigin': false
      },
    }
  }
})
