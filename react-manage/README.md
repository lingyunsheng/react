## react 
React view
复杂应用 react redux

## redux
dispatch action reducer state 单身边数据流

实时聊天功能的app

登录注册 信息完善 个人中心 牛人列表 BOSS列表

## 技术栈

前端页面
前段支撑 Antd React16 Redux Reducer
后端支撑 Express Socket.io MongoDB

react react.js
node.js npm webpack
es6基础

create-react-app 脚手架
第三方库 redux react-router
定制化配置

yarn start 启动

 yarn add redux


 ### Express+mongodb 开发web后台接口
 

 ### React
   - react 帮助你构建UI的库  MVC的view层
   - facebook 出品 专注view层
   - 一切皆组件
   - 全是用es6语法 16 核心代码重写的版本 
   - 错误处理
   npm install --save react react-dom
 # React 是什么

 # 如何使用react实现组件化

 # react 进阶

 ### React  基础语法

 - import React
 - class  组件 render直接使用 
 - render函数返回值jsx 转成js执行

 # React View层语法

 - Js直接写成html
 - Class  写成 className
 - 变量用 {} 

### API
-  一切皆是组件
- 组件间通信通过属性传递
- 类实现组件 使用jsx语法

### 组件之间用props传递数据
- 使用 <组件 数据= "值" > 的形式传递
- 组件里使用 this.props获取值
- 如果只有render函数 用函数的形式写组件

父组件 
<app name="jijian"></app>
子组件
return (
    <div>
        {this.props.name}
    </div>
)
函数式组件 
function Zujian(props){
    return (
        <div>
            {props.name}
        </div>
    )
}

### 组件内部 state 状态

组件内部通过state管理状态

- JSX本质是js 所以直接数组.map渲染列表 映射
- Constructor 设置组件的初始状态，构造函数 实例化执行 记得执行super(props)
- State 不可变对象 this.state 获取值 this.setSate 修改值 不能直接对state赋值

constructor(props) {
    super(props)
    this.state = {
        actor:['a','b','c]
    }
}
render() {
    return (
        <div>
            <ul>
                {this.state.actors.map(v=> {
                    return <li key="{v}">{v}</li>
                })}
            </ul>
        </div>
    )
}

修改state状态

方法一
constructor(props){
    super(props)
    this.state={

    }
    this.addChange = this.addChange.bind(this)
}
addChange() {
    this.setState={
         actors:[...this.state.actors,'小明'+Math.random()]
    }
   
}
render() {

}
<button onClick={this.addChange}>添加<button>

关于this指向的问题
箭头函数
<button onClick={()=>this.addChange()}>添加</button>

或者
<button onClick={this.addChange}>添加</button>
addChange=()=>{

}

### React 生命周期

React周期有若干钩子函数 在组件不同的状态执行

- 初始化周期
- 组件重新渲染生命周期
- 组件卸载生命周期

componentWillMount
componentDidMount
componentRecieveMount
componentWillUpdate
componentShouldUpdate
componentDidUpdate

### antd-mobile --save

 npm install antd --save

 ## 常用组件 
 - Layout 

 按需加载

 import {Button, List} from 'antd-mobile';
 import '../node_modules/antd-mobile/dist/antd-mobile.css';

 render() {
     return (
         <List renderHeader={()='演员列表}>     
            this.state.actors.map((v)=> {
                return <List.Item key={v}>{v}</List.Item>
            })
         </List>
     )
 }


### Redux 

## Redux 是什么
- 专注于状态管理的库 和react解耦   
- 单一状态 single state 单向数据流
- 核心概念： store state action reducer
## Redux 核心概念
## Redux 实战


### 项目越来越大 管理不过来

- 人少数据少 setState
- 状态 redux管理  store  记录 state
- 需要改变  告诉 dispatch 做什么 action
- 处理变化的人 reducer 拿到 state和action 生成新的 state

### Redux使用方法

- 通过reducer 新建store， 随时通过store.getState获取状态
- 需要状态变更， store.dispatch(action)
- Reducer 函数接受state和action，返回新的state，可以用store.subscribe监听每次修改

<!-- store获取存储 -->
import {createStore} from 'redux';
<!-- 通过reducer建立 -->
<!-- 根据老的state和action来获取状态 生成新的state -->
function counter(state=0, action) {
    switch(action.type) {
        case '加演员'
            return state+1
        case '减演员'
            return state-1
        default
            return 10
    }
}

<!-- 新建store -->
const store = createStore(counter)
const init = store.getState()
<!-- 获取状态 -->
console.log(init)

function listener() {
    const current =store.getState()
    console.log(`现在有${current}演员`)
}
store.subscribe(listener)
<!-- 状态变更dispatch（action） -->
store.dispatch({type:'加演员'})
console.log(store.getState())


### Redux如何和React使用

状态管理 订阅发布的设计模式

## 使用
- 把store.dispatch 传给组件 内部可以修改状态
- Subscribe 订阅render函数 每次修改都渲染
- Redux下官内容 移到单独的index.js reducer.js action.type.js   index.redux.js


  先在index.rudex.js 封装
  import React from 'react';
  const ADD_GUN ='演员+1'
  const REMOVE_GUN = '演员-1'
  export function counter(state=0,action) {
      switch() {
          case ADD_GUN:
            return state+1
          case REMOVE_GUN:
            return state-1
          default:
            return 10
      }
  }
  export function addGun() {
      return {
          type:'演员+1'
      }
  }
    export function removeGun() {
      return {
          type:'演员-1'
      }
  }

  store.dispatch({type:'演员+1'})

  index.js
  import {createStor} from 'redux';
  import {couter} from './index.redux.js';
  const store = createStore(counter)
  function render() {
      <App store={store} />
  }
  执行render
  render()
  subscriobe(render)

  App.js
  const store = this.props.store
  const num = store.getState
  render(){
      return (
          <div>
                {num}
                <button onClick={()=>store.dispatch(addGun())}>add</button>
          </div>
      )
  }


### 组件解耦
  内部组件不依赖于外部状态 外部只负责传进参数

### 处理异步
处理异步 调试工具 更优雅的和react结合
- Redux处理异步 需要redux-thunk插件
- npm i redux-devtools-extension 并开启
- 使用react-redux优雅的连接react和redux

## redux默认值处理同步 异步任务需要redux-thunk中间件
- yarn add redux-thunk --save
- 使用applyMiddleware开启thunk中间件
- Action 返回函数 使用dispatch提交action

redux处理异步
首先 安装redux-thunk中间件
index.js
<!-- 导入 -->
import {applyMiddleware} from 'redux'
<!-- thunk -->
import thunk from 'redux-thunk'
<!-- 引入异步函数 -->
import {addGunAsync,removeGunAsync} from './index.redux.js'

index.redux.js

export function addGunAsync() {
   return  dispatch => {
       setTimeout(()=>{
           dispatch(addGun())
       },2000)
   }
}

App.js

const addGunAsync = this.props.addGunAsync
<button onClick={()=>store.dispatch(addGunAsync())}>添加</button>

### redux 扩展程序 chorme
- 新建store判断window.devToolsExtension
- 使用compose结合thunk和window.devToolsExtension
- 调试窗的redux选项卡 实时看到state
index.js
import {compose} from 'redux'

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>{}
))

### react-redux
方便管理 连接
- yarn add react-redux --save
- 忘记subscribe 记住 reducer action dispatch即可
- React-redux提供Provider和connect两个接口来连接

- Provider组件在应用最外层，传入store即可 用一次
- connect 负责从外部组件获取组件需要的参数
- connect装饰器

高阶组件

index.js

<!-- 引入react-redux -->

删除引入的其他函数
import {Provider} from 'react-redux';
ReactDom.render(
    (<Provider store={store}>
        <App/>
    </Provider>
    )
)

App.js

import {connect} from 'react-redux'
import {addGun,removeGun,addGunAsync,removeGunAsync} from './index.redux.js';

<button onClick={this.props.addGun}>添加</button>

const mapStatetoProps=(state)=>{
    const num ={state}
}
const actionsCreators ={addGun,removeGun,addGunAsync,removeGunAsync}

App = connet(mapStatetoProps,actionsCreators)(App)

### 装饰器 优化代码

- yarn eject
- yarn add babel-plugin-transform-decorators-legacy --save-dev
- plugins


<!-- const mapStatetoProps=(state)=>{
    const num ={state}
}
const actionsCreators ={addGun,removeGun,addGunAsync,removeGunAsync}

App = connet(mapStatetoProps,actionsCreators)(App) -->

<!-- @connect(mapStatetoProps,actionsCreators) -->
@connect(
    <!-- 你要state什么属性放到props -->
    state=>({num=state})
    <!-- 你要什么方法放到props里 自动dispatch -->
    {addGun,removeGun,addGunAsync,removeGunAsync}
)


### 进阶
- 什么数据放到react里
- Redux管理ajax
- Redux管理聊天数据

### React4

开发单页应用

安装

yarn add react-router-dom --save

 yarn add roadhog@2.5.0-beta.1
  "plugins": [ ["@babel/plugin-proposal-decorators", { "legacy": true }]]

入门组件

- BrowserRouter 包裹整个应用
- Router 路由对应渲染的组建 可嵌套
- Link跳转
- 动态路由 router 
index.js
import {BrowserRouter,Router,Route,Link} from 'react-router-dom';
function Home() {
    return <h2>home</h2>
}
(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to='/'>Frist</Link>
                    <li>
                      <li>
                        <Link to='/home'>home</Link>
                    <li>
                      <li>
                        <Link to='/pass'>pass</Link>
                    <li>
                </ul>
                <Route path='/' exact component={App}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/pass' component={pass}></Route>
            </div>
            <App/>
        </BrowserRouter>
    </Provider>
)

exact 精准匹配

### React-router
- url参数 router组件参数冒号标识参数
- Redirect 组件跳转
- Switch只渲染一个子组件

历史跳转
class Test extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props);
		return <h2>测试组件{this.props.match.params.location}</h2>
	}
}

import {BrowserRouter,Router,Route,Redirect, Switch,Link} from 'react-router-dom';
<Redirect to='/'></Redirect>最先显示的页面
<Switch>所有的route</Switch>
直接路由跳转

	       <Switch>
					{/* 只渲染第一个route */}
					<Route path='/' exact component={App}></Route>
					<Route path='/home' component={Home}></Route>
					<Route path='/pass' component={Pass}></Route>
					{/* 自动跳转 */}
					<Redirect to='/home'></Redirect>
					<Route path='/:location' component={Test}></Route>

				</Switch>

                	<ul>
					<li>
						<Link to='/'>Frist</Link>
					</li>
					<li>
						<Link to='/home'>home</Link>
					</li>
					<li>
						<Link to='/pass'>pass</Link>
					</li>
				</ul>



构建登录跳转页面
index.js
<Switch>
    <Route path='/login' component={Auth}></Route>
    <Route path='/dashboard' component={Dashboard}></Route>
    <Redirect to='/dashboard'></Redirect>
</Swicth>
建立Auth.js Dashboard.js Auth.redux.js

Dashboard.js
<ul>
    <li>
        <Link to='/dashboard/'>frist</Link>
    </li>
    <li>
        <Link to='/dashboard/home'>home</Link>
    </li>
    <li>
        <Link to='/dashboard/pass'>pass</Link>
    </li>
</ul>
<Route path='/dashboard/' component={App}></Route>
<Route path='/dashboard/home' component={Home}></Route>
<Route path='/dashboard/pass' component={Pass}></Route>

Auth.redux.js

const LOGIN ='LOGIN'
const LOGOUT ='LOGOUT'

export function auth(state=(isAuth=true,user='杨幂'),action) {
    switch(action.type) {
        case LOGIN:
            return {...state,isAuth=true}
        case LOGOUT:
            return {...state,isAuth=false}
        default:
            return state
    }
}

export function login() {
    return {type:LOGIN}
}
export function logout() {
    return {type:LOGOUT}
}


### 和reduce配合

- 多个reducer 合并reducer combineReducers合并
index.js
合并后
import reducers from './reducer';

const store = createStore(reducers,compose({
    applyMiddleWare(thunk),
    window.devToolsExtension:window.devToolsExtension()=>f=>{}
}))

reducer.js
import {counter} from './index.redux';
import {auth} from './Auth.redux';
import {combinReduces} from 'redux';

const reducers = combinReducers({counter,auth});
export default reducers;

### 登录校验

Auth.js
@connect(
    state=>state.auth,
    {login}
)
 <h1>你还没有登录</h1>
 {this.props.isAuth ? <Redirect to='/dashboard' />:null}
 <Button onClick={this.props.login}>登录</Button>

dashboard.js

@connect(
    state=>state.auth,
    {logout}
)

const match = this.props.match
const redirectToLogin =<Redirect to='/login'></Redirect>
const app=(
    <div>
        <h1>欢迎</h1>
        {this.props.logout ? <Button onClick={this.props.logout}>注销</Button> : null}
    </div>
)
return this.props.isAuth ? app:redirectToLogin



### 招聘需求分析

用户中心   牛人            boss

登录   求职信息 个人信息  管理职位

注册     职位列表         查看信息

信息完善    聊天 socke.io

### 项目骨架

- src 前端源码目录
- server express目录
- component组件 container reducers 等 路由

### 页面骨架

- router划分页面
- 用户信息 聊天

- mongodb
- axios异步请求
- redux管理所有数据 antd-mobile 弱化css


### 前后端联调

yarn add axios --save

## axios 如何发送异步请求
- 如何发送 使用proxy配置转发
- axios 拦截器 同意loading处理 最常用的
- redux使用异步数据 渲染页面

简洁好用的请求库

所有的请求转发到1314端口
"proxy":"http://localhost:1314"

   axios.get('/data').then(res=>{
            if (res.status ===200) {
                dispatch(userData(res.data))
               
            }
            console.log(res)
        })

Auth.redux.js
const initState={
    isAuth=true,
    user:'杨幂',
    age:26
}
export function auth(state={initState},action) {
    switch(action.type) {
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        case USER_DATA:
            return {...state,user:action.payload.user,age:action.payload.age}
    }
}
export function getUserData(){
      axios.get('/data').then(res=>{
            if (res.status ===200) {
                dispatch(userData(res.data))
               
            }
            console.log(res)
        })

}
export function userData() {
    return {type:USER_DATA,payload:data}
}

App.js

import {login.getUserData}
@connect(
    {login,getUserData}
)
componentDidMount() {
    this.props.getUserData()
}
{this.props.name} {thi.props.age}
### 拦截器 拦截请求
config.js
import axios from 'axios';
import {Toast} from 'antd-mobile';

axios.interceptors.request.use(function(config){
    Toast.loading('加载中',0)
    return config
})
axios.interceptors.response.use(function(config) {
    setTimeout(()=>{
        Toast.hide()
    },3000)
    return config
})