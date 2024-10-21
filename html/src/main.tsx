import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'
import 'antd/dist/reset.css';



import { BrowserRouter, HashRouter } from 'react-router-dom';
import { message } from 'antd';
message.config({
  maxCount: 1
})
message.destroy()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <HashRouter>
    <App />
  </HashRouter>
)
