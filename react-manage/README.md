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
    this.addChange = this.addChange.bind()
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