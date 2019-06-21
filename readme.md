### React 全家桶
- React基础知识 生命周期
- Router 4.0
- Redux 
- AntD Ui组件
    基础组件
  AntD栅格系统
  ETable 组件封装
  BaseForm组件封装
  表格内嵌单选、复选封装
- 公共机制封装
  Axios请求插件封装
  API封装
  错误拦截
  权限封装 菜单
  loadinng 分页 mock

  架构

  React16  Router4.0 Redux

  Axios AntD 

  组件

  FaceBook 开源的 javascript库
  结合生态哭构成 MV*框架
  特点：
    Declarative 声明式编码
    Component-Based 组件化编码
    高效的DOM Diff'算法 最小化页面重绘   基于虚拟Dom  jq
    单向数据流   vue 表单双向 组件单向  单向数据流：父子元素  借助Redux

## MVVM 框架  Vue React
    MV 框架代表  + 只关注视图层 + 数据层Model
## 生态介绍
    Vue 生态 ： Vue+Vue-Router+Vuex+Axios+Babel+Webpack
    React 生态 ：React+React-Router+Redux+Axios+Babel+Webpack   Babel解析 es6 语法  Redux 数据存储

## 编程式实现
## 声明式实现  无需关心底层如何实现
   声明变量

## React 脚手架 yarn

npm install -g create-react-app
create-react-app my-app

cd my-app
yarn start
## yarn
 - yarn 新一代包管理工具
   速度快 
   安全版本统一  更安全 
   更简洁的输出  
   更好的语义化   修复npm缺陷

   eject 抛出暴露

## React 生命周期
 - getDefaultProps 初始化一个props 属性  来自父组件传递 或者其他组件传递过来的
 - getInitialState 初始化当前组件的状态 state状态贯穿项目 
 - componentWillMount 组件初始化在之前 调用
 - render 最重要的  ui渲染 取决于 render set个 state  render ui
 - componentDidMount  组件dom插入完后调用
 - componentWillReceiveProps 父组件传递 
 - shouldComponentUpdate组件更新 调用 set state
 - componentWillUpdate 组件更新之前
 - componentDidUpdate 组件插入更新之后
 - componentWillUnmount 销毁

## 安装插件  
   React-Router、Axios
   AntD
   less-loder

   yarn add react-router-dom axios less-loader



  