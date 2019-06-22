
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Layout from './page/Layout'
import 'antd/dist/antd.css'

function App() {
  return (
    // 配置两次根路由 当根路由下配置了其他路由的 根路由就会无效 需要再配置一次根路由
    <Router>
      {/* 返回根路由 拿到Layout */}
      <Route path="/" component={Layout}></Route>
    </Router>
  )
}

export default App;