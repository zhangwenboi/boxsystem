import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 查找文件
import { compression } from 'vite-plugin-compression2'
// vite.config.ts
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/


export default defineConfig({
  plugins: [react(), compression({
    threshold: 200000, // 设置只有超过 2k 的文件才执行压缩
    deleteOriginalAssets: true, // 设置是否删除原文件
    skipIfLargerOrEqual: true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
  }), importToCDN({
    modules: [
      autoComplete('react'),
      autoComplete('react-dom'),
      autoComplete('dayjs'),
      autoComplete('antd'),
      autoComplete('react-router-dom'),
      {
        name: '@ant-design/pro-components',
        var: 'antd',
        path: 'umd/pro-components.min.js',
      },
      {
        name: '@ant-design/icons',
        var: 'antd',
        path: 'https://cdn.jsdelivr.net/npm/@ant-design/icons@5.5.1/dist/index.umd.min.js',
      },
      {
        name: '@ant-design/charts',
        var: 'antd',
        path: 'https://cdn.jsdelivr.net/npm/@ant-design/charts@1.4.2/dist/charts.min.js',
      },
      {
        name: 'query-string',
        var: 'query-string',
        path: 'https://cdn.jsdelivr.net/npm/query-string@9.1.1/index.min.js',
      },
      {
        name: 'rc-resize-observer',
        var: 'rc-resize-observer',
        path: 'https://cdn.jsdelivr.net/npm/rc-resize-observer@1.4.0/lib/index.min.js',
      },
      {
        name: 'react-countup',
        var: 'react-countup',
        path: 'https://cdn.jsdelivr.net/npm/react-countup@6.5.3/build/index.min.js',
      },
      {
        name: 'react-transition-group',
        var: 'react-transition-group',
        path: 'https://cdn.jsdelivr.net/npm/react-transition-group@4.4.5/dist/react-transition-group.min.js',
      },
      {
        name: 'umi-request',
        var: 'umi-request',
        path: 'https://cdn.jsdelivr.net/npm/umi-request@1.4.0/dist/index.min.js',
      },
    ]
  })],
  // 更改build输出文件夹名
  build: {
    outDir: 'html',
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
