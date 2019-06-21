import React from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import Layout from './page/Layout';
import 'antd/dist/antd.css';
import './App.css';


function Table(){
  return (
    <div>Table</div>
  )
}
function Label(){
  return (
    <div>Label</div>
  )
}
function App() {
  return (
    <Router>
      <Route path="/" component={Layout}>
        {/* 根路由 必须添加 否则无效*/}
       <Route path="/" component={Layout}></Route>
        {/* 页面路由 传数据到 */}
        <Route path="/table" component={Table}></Route>
        <Route path="/label" component={Label}></Route>
      </Route>
    </Router>
  );
}

export default App;
