import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 查找文件
import { compression } from 'vite-plugin-compression2'


export default defineConfig({
  plugins: [react(), compression({
    threshold: 100000, // 设置只有超过 2k 的文件才执行压缩
    deleteOriginalAssets: true, // 设置是否删除原文件
    skipIfLargerOrEqual: true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
  })],
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
        chunkFileNames: `assets/js/[name]-[hash].js`, //代码块文件名
        entryFileNames: `assets/js/[name]-[hash].js`, //入口文件名
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`, // 资源文件名
        manualChunks: {
          antd: ['antd'],
          'react-dom': ['react-dom'],
          'ant-design-pro-components': ['@ant-design/pro-components'],
          'icons': ['@ant-design/icons'],
          'ant-charts': ['@ant-design/charts'],
          'rc-resize-observer': ['rc-resize-observer'],
          'react-countup': ['react-countup'],
          'react-router': ['react-router'],
          'react-router-dom': ['react-router-dom'],
          'react-transition-group': ['react-transition-group'],
          'umi-request': ['umi-request']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 'target': 'http://192.168.1.108:3000',
        'target': 'http://192.168.2.86',
        // 'target': 'http://127.0.0.1:3000',
        // 'target': 'http://10.54.0.71:3000',
        // 'target': 'http://localhost:3000',
        'changeOrigin': false
      },
    }
  }
})
