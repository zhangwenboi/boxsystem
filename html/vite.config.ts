import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 查找文件
import { compression } from 'vite-plugin-compression2'
// vite.config.ts
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
// https://vitejs.dev/config/

const cdnurls = {
  "@ant-design/charts": "^1.4.2",
  "@ant-design/icons": "^5.5.1",
  "@ant-design/pro-components": "^2.6.51",
  "antd": "^5.15.3",
  "dayjs": "^1.11.13",
  "query-string": "^9.0.0",
  "rc-resize-observer": "^1.4.0",
  "react": "^18.2.0",
  "react-countup": "^6.5.3",
  "react-dom": "^18.2.0",
  "react-router": "^6.22.3",
  "react-router-dom": "^6.22.3",
  "react-transition-group": "^4.4.5",
  "umi-request": "^1.4.0"
}
export default defineConfig({
  plugins: [react(), compression({
    threshold: 2000, // 设置只有超过 2k 的文件才执行压缩
    deleteOriginalAssets: true, // 设置是否删除原文件
    skipIfLargerOrEqual: true, // 如果压缩后的文件大小与原文件大小一致或者更大时，不进行压缩
  }), importToCDN({
    modules: [
      autoComplete('react'),
      autoComplete('react-dom'),
      autoComplete('antd'),
      autoComplete('dayjs'),
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
        path: 'https://cdn.jsdelivr.net/npm/@ant-design/charts@1.4.2/dist/index.umd.min.js',
      },
      {
        name: 'query-string',
        var: 'query-string',
        path: 'https://cdn.jsdelivr.net/npm/query-string@9.0.0/dist/index.umd.min.js',
      },
      {
        name: 'rc-resize-observer',
        var: 'rc-resize-observer',
        path: 'https://cdn.jsdelivr.net/npm/rc-resize-observer@1.4.0/dist/index.umd.min.js',
      },
      {
        name: 'react-countup',
        var: 'react-countup',
        path: 'https://cdn.jsdelivr.net/npm/react-countup@6.5.3/dist/index.umd.min.js',
      },
      {
        name: 'react-transition-group',
        var: 'react-transition-group',
        path: 'https://cdn.jsdelivr.net/npm/react-transition-group@4.4.5/dist/react-transition-group.umd.min.js',
      },
      {
        name: 'umi-request',
        var: 'umi-request',
        path: 'https://cdn.jsdelivr.net/npm/umi-request@1.4.0/dist/index.umd.min.js',
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
