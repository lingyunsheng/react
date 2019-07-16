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


### 登录注册

开发模式
基于cookie用户验证
- express 依赖cookie-parser 需要npm install cookie-parser --save 安装
- cookie 类似于一张身份卡 登陆后 服务端返回 带着cookie就可以访问受限资源
- 页cookie的管理浏览器会自动处理

用户加载页面 ---带着cookie向后端获取用户信息------》用户加载页面/
                            已登录             未登录

       App内部页面            《         ---          登录成功前端存储cookie         ------------------------------ 登录页面

登录注册页

index.js

检查路由

import AuthRouter from './AuthRouter.jsx';
import Login from '/login.jsx';
import Register from './register.jsx';
<BrowserRouter>
    <div>
        <AuthRouter></AuthRoute>
        <Route path='/login' component={Login}></Route>
         <Route path='/register' component={Register}></Route>
    </div>
</BrowserRouter>

然后设计登录注册组件
login.jsx
引入logo
引入其他组件
Login 页跳转到 register页
constructor(props){
    super(props);
        this.register=this.register.bind(this)
   
}

register() {
    console.log(this.props)
    this.props.history.push('/register')
}
<Button onClick={this.register}>注册</Button>

register.jsx
一样同上
import {} from 'antd-mobile';
constructors(props) {
    super(props);
    this.state={
        type:'boss'
    }
}


前后端联调

AuthRouter.jsx 判断登录
import  {withRouter} from 'react-router-dom';
@withRouter
    componentDidMount() {
        const publicList = ['/login','register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)> -1) {
            return null
        }
        axios.get('/user/info').then(res=> {
            if(res.status === 200) {
                if(res.data.code ===0) {
                    // 有登录信息
                }else {
                    console.log(this.props.history)
                    this.props.history.push('/login')
                }
                console.log(res.data)
            }
        })
    }

server.js

const express = require('express')
// 引入库
const userRouter = require('./user.js')
// 开启中间件
const app = express()
app.use('/user',userRouter)


// 发送
// app.get('/', function (req, res) {
//     res.send('<h1>Hello,World</h1>')
// })
app.listen(1314, function () {
    console.log('Node app start at port')
})

user.js
// 中间件
const express = require('express')
const Router = express.Router()
// 路由对象进行挂载

Router.get('/info',function(req,res) {
    return res.json({code:1})
})

module.exports = Router

model.js

const mongoose = require('mongoose')
// 连接mongo 并且使用myapp这个集合
const DB_URL = 'mongodb://localhost:27017/myapp'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
    console.log('mongo connect success')
})

### 注册交互实现

handleChange(key) {
    this.setState({
        [key]:value
    })
}
<InputItem onChange={(v)=>{this.handleChange('user',v)}}>用户名</InputItem>
<InputItem onChange={(v)=>{this.handleChange('pwd',v)}} type='password'>密码</InputItem>
<InputItem onChange={(v)=>{this.handleChange('rpwd',v)}} type='password'>确认密码</InputItem>
<RadioItem checked={this.state.type==='genius}
onChange={()=>this.handleChange('type':'genius')}>个人<RadioItem>
<RadioItem checked={this.state.type==='boss'}
onChange={()=>this.handleChange('type':'boss')}>企业<RadioItem>


this.handleRegister=this.handleRegister.bind(this)
handleRegister() {
    console.log(this.state)
}
<Button onClick={this.handleRegister}>注册</Button>

### 注册发送
redux

定义user.redux.js


const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState={
    isAuth:false,
    msg:'',
    user:'',
    pwd:'',
    type:''
}
export function user(state={initState},action) {
    switch(action.type) {
        case REGISTER:
            return {...state,msg,...action.payload,isAuth:true}
        case ERROR_MSG:
            return {...state,msg:action.msg,isAuth:false}
        default:
            return state
    }
}
export function errorMsg() {
    return {msg,type:'ERROR_MSG'}
}
<!-- 把data传入进去 -->
export function register(user,pwd,type) {
    if (!user||!pwd||!type) {
        return erroMsg('用户名密码必须输入')
    }
    if(pwd!==rpwd) {
        return erroMsg('密码不一致')
    }
    return dispatch=> {
        axios.get('/user/register',{user,pwd,type}).then(res=>{
            if (res.status ===2000 && res.data.code===0) {
                dispatch(REGISTER_SUCCESS(user,pwd,type))
            } else {
                dispatch(ERROR_MSG(res.data.msg))
            }
        })
    }
}

export function registerSuccess(data) {
    return {type:REGISTER_SUCCESS,payload:data}
}


reducer.js
import {user} from './redux/user.redus.js';
import {combinReducers} from 'redux';

const reducers = combinReducers({user})
export reducers;

register.jsx

import {connect} from 'react-redux';
import {register} from './redux/user'
@connect(
    state=>state.user,
    {register}
)
register() {
    this.props.register()
}
{this.props.msg ? <p>{this.props.msg}</p>: null}

### 数据库模型的建立

server.js 
const express=require('express')
const app =express()
const userRouter = require('./user.js')
app.use('/user',userRouter)

app.listen(1314,function() {
    console.log('port 1314)
})

user.js

const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel(name)

Router.get('/list',function(req,res) {
    User.find({},function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/info', function(req.res) {
    return res.json({code:1})
})

module.exports=Router

Model.js

const mongoose = require('mongoose')
const DB_URL = 'mongodb:localhost:27017/myapp'
mongoose.connect(DB_URL)
<!-- 查询数据库是否连接 -->
mongoose.connectin.on('connected',function() {
    console.log('连接成功)
})

<!-- 定义模型 -->

const models ={
    user:{
        'user':{type:String,require:true}
    }
}
<!-- 可以加遍历 -->
mongoose.model('user',Schema(models))
for(let m in models) {
    mongoose.model(m,Schema(models[m]))
}

<!-- 获取值 -->
module.exports={
    getModel:function(name){
        return mongoose.model(name)
    }
}

user.js
Router.post('/register',function(req,res) {
    // 接受传递的参数
    console.log(req.body)
    const {user,pwd,type} = req.body
    // 查询用户名是否重复
    User.findOne({user},function(err,doc) {
        if (doc) {
            return res.json({code:1,msg:'用户名已存在'})
        }
        if(err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        User.create({user,pwd:md5Pwd(pwd),type},function(err,doc) {
            // 如果出错了
            if(err) {
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})

然后user.redux.js
redirectTo设计

再添加util.js
export function getRedirectPath(type,avatar) {
    // 根据用户信息跳转
    // user.type /boss/genius
    // user.avatar /bossinfo/geniusinfo
    let url = (type === 'boss') ? '/boss': '/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}

register.jsx引入
<{this.props.redirecTo ? <Redirect to={this.props.redirecTo}/>} : null>
<!-- 注册引入插件 -->
 yarn add body-parser --save
 server.js
 用户注册
 const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
// 解析cookie
app.use(bodyParser.json())

 密码加密 MD5 非对称加密

 第三方库 utility
 yarn add utility --save

 server.js 引入 utils
 const utils =require('utility)
 user.js 也是

 pwd:utils.md5(pwd)

加密方法
 function md5Pwd(){
     const salt ='dguqhjeklf@321424'
     return utils.md5(utils.md5(pwd+salt))
 }

 ### 登录实现

后面一大串全没有听懂

使用 PropTypes 进行类型检查
自 React v15.5 起，React.PropTypes 已移入另一个包中。请使用 prop-types 库 代替。
是否必传
import PropTypes from 'prop-types';

static proptypes = {
selectAvatar:PropsType.func
}

export function update(data){
	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

        <Button onClick={()=>this.props.update(this.state)} type='primary'>保存</Button>
### 登录注册实现后

index.js

设置
	<Route path='/bossinfo' component={BossInfo}></Route>
	<Route path='/geniusinfo' component={GeniusInfo}></Route>
<Route componnent={Dashboard}/>

      const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                // hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                // hide: user.type == 'boss'
            }
        ]
        return (
            <div>
             <NavBar mode='dark' className='fixd-header'>{navList.find(v=>v.path===pathname).title}</NavBar>
                {/* 吸顶 */}
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                               <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>


Boss.jsx

import React from 'react';
// 前后端联调
import axios from 'axios';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        // 获取用户信息
        axios.get('/user/list?type=genius').then(res => {
            if (res.data.code === 0) {
                // 渲染用户列表
                this.setState({
                    data: res.data.data
                })
            }
        })
    }
    render() {
        console.log(this.state)
        // card.header
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    {/* 直接渲染card */}
                    {this.state.data.map(v => (
                        v.avatar ? (<Card key={v._id}>
                            <Header title={v.user} thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}>

                            </Header>
                            <Body>
                                {/* 信息换行 */}
                                {v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Body>
                        </Card>) : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}
export default Boss;

user.js
Router.get('/list',function(req,res) {
    // User.remove({},(err,doc) =>{
    //     if (!err) {

    //     }
    // })
    // 获取用户列表type识别
    const {type} = req.query
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc,msg:'用户列表获取成功'})
    })
})

### 俩喷嚏列表的渲染 redux管理
建立 chatuser.redux.js
import axios from 'axios';
const USER_LIST = 'USER_LIST'

const initState={
    userlist:[]
}
export function chatuser(state=initState,action) {
    switch(action.type) {
        case USER_LIST:
            return {...state,userlist:action.payload}
        default:
            return state
    }
}

function userList(data) {
    return {type:USER_LIST,payload:data}
}

export function getUserList(type) {
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            if (res.data.code===0 ) {
                 dispatch(userList(res.data.data))
            }
        })
    }
}

reduce.js
import {chatuser} from '../redux/chatuser.redux.js';
 const reducers = combinReducers({user,chatuser});
 export default reducers;

 ### boss列表和组件优化

 card

 usercard 组件
写一个usercard组件引入boss genius 即可

 ### 个人中心
 import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace } from 'antd-mobile';
@connect(
    state => state.user
)
class User extends React.Component {

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        // console.log(this.props)
        return props.user ? (
            <div>
                <Result
                    // img={<img src={require(`../img/boy.png`)} alt=""/>}
                    img={<img style={{ width: 50 }} src={require(`../img/${this.props.avatar}.png`)} alt="" />}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company : null}>
                </Result>
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {/* 变灰 */}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief>:null}

                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item>
                        退出登录
                    </Item>
                </List>
            </div>
        ) : null
    }
}
export default User;

### 清楚cookie cookie的各项
看application
document.cookie
"userid=j%3A%225d2d7c9dcddd22a57894c9b7%22"

yarn add browser-cookies --save

给退出登录 绑定 onclick事件
import browserCookie from 'browser-cookies'
browserCookie.erase('userid')
window.location.href= window.location.href
onClick={this.logout}
set get erase


取消是
import {Modal} rom 'antd-mobile
const alert = Modal.alert

        alert('注销', '确认退出吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: () => {
                    browserCookie.erase('userid')
                    // 也可以不手动刷新 注销时清空redux数据
                    window.location.href = window.location.href
                }
            },
        ])