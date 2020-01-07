# js的运行机制
# js运行机制 分为 渲染引擎和js引擎

渲染引擎 是将HTML CSS 和JavaScript 通过渲染引擎
将其解析为可视化的浏览器页面

渲染引擎 将html css js 其他资源 通过html 解释器 css解释器 js引擎 layout  将其解析为图像

js引擎 就是负责处理javascript脚本的虚拟机  JavaScript引擎从头到尾负责整个JavaScript程序的编译和执行过程。

js引擎 V8引擎

渲染引擎和js引擎的关系

渲染引擎 通过 调用接口API的方式 来处理javascript的逻辑
js引擎通过桥接接口的方式去访问渲染引擎的渲染的dom元素

#javascript 运行时 runtime

javascript 单靠v8引擎 无法完成ajax请求 设置定时器
需要运行时 提供对象和机制 完成js的交互功能

# javascript 分成两个阶段
- 编译阶段
 将js脚本 分词 解析 通过代码生成器 预编译
- 执行阶段
分成代码块来执行
  - 全局执行代码块
  - 函数执行代码块
  - eval执行代码块

# javascript 执行阶段

js是编译型语言也是解释型语言

js jIT 即时编译

js运行时调用的组件

- 全局内存 Global Memory

var num=2;
function pow(num) {
    return num*num;
}

该代码块不会执行
首选var num=2;
定义声明了一个变量通过js的运行机制
var num=2；是全局内存 保存了

- 调用堆栈 call Stack
通过调用堆栈stack的方式 执行这个函数
var num =2;
function pow(num) {
    return num*num;
}
pow(num)
堆栈是一种数据结构
线性的 先进后出的执行顺序

debugger

多个函数 一次进栈 先进后出
- 执行上下文
  - 全局执行上下文
    基础执行上下文，一个函数只有一个全局执行上下文，函数外部的都是在全局执行上下文中
    如果要想让其在全局执行上下文中，声明window全局对象
    或者 this和全局对象绑定
  - 函数执行上下文
    任何一个函数被调用的时候，都会创建一个函数执行上下文，如果一个函数内部有多个函数时，会相应的创建多个函数执行上下文
  - eval执行上下文
    eval内部也会有自己的执行上下文 不要随意使用eval这个函数

# 执行上下文的创建

1. 决定this的绑定
2. 创建词法环境
3. 创建变量环境

### this的绑定
可以根据执行上下文创建的时候，隐士绑定 显式绑定 默认绑定

### this绑定分类

- 普通函数调用： this指向的时全局window对象
function pow(num) {
    return num*num;
}
console.log(this)
VM2989:1 Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
- 对象方法的调用： this指向该对象
- 构造函数： 指向绑定构造函数的实例
- apply call bind 指向绑定值 显式绑定
- 箭头函数 this 没有this 指向箭头函数外部 第一个函数调用的this 默认绑定

- 绑定优先级规则 
函数是否存在new绑定调用：如果是的话this绑定到新创建的对象上。
函数是否通过apply、call、bind显示绑定：如果是，this绑定到指定对象上。
函数是否在对象方法隐式调用：如果是的话，this绑定到调用对象。
如果上面三条都不满足的话：在严格模型下，this绑定到undefined，在非严格模式下，this绑定到全局对象上。

### 词法变量和作用域类似的
### 变量环境


### React
    什么是react 开源的javascript库，用于构建用户页面页面的单页面应用程序，处理网页和移动应用的试图从UI框架
### React特点
- 虚拟dom，真是dom使用成本高
- 支持服务端渲染
- 数据单向流
- 提供可复用 可组合的UI开发组合视图

### JSX语法
JSX语法是es EMScriprt中类似于XML的一种语法，提供一个语法糖，为React.createElement将其便宜成真是dom

React.createElement('div',null,'hello')
React.createElement('div',null,React.createElement('h1',null,'hello,world'))

Render() {
    return (
        <h1>hello</h1>
    )
}
在render函数里使用jsx语法 然后返回给渲染函数 jsx模板编译成html

### 元素和组件区别

元素不可修改 在页面以某个dom节点呈现的
React.Dom 通过render() 渲染成dom

而组件可以通过多种声明方式

### 为什么React有一个$$typeof属性

<Head background:'#fff'>hi</Head>

React.createElement(
    type:'Head',
    children:'hi',
    props: background:'#fff'
    key:null，
    ref:null,
    $$typeof:symbol.for(React.element) 告诉React下一步要渲染的是谁  安全漏洞
)

### 什么是 Pure Components?
React.PureComponent 与 React.Component 完全相同，只是它为你处理了 shouldComponentUpdate() 方法。当属性或状态发生变化时，PureComponent 将对属性和状态进行浅比较。另一方面，一般的组件不会将当前的属性和状态与新的属性和状态进行比较。因此，在默认情况下，每当调用 shouldComponentUpdate 时，默认返回 true，所以组件都将重新渲染。

### jsx 回调绑定方法
1. 
this.handleClick = this.handleClick.bind(this)
handleClick () {

}
2. 
handleClick = () => {

}
<Button onClick={this.handleClick}></Button>
3. 
<Button onClick={(event) => this.handleClick(event)}>
4. 将参数传给bind

<Button Onclick = {this.handleClick.bind(this, id)}>

###  js 内联表达式

在 JS 中你可以使用 if 语句或三元表达式，来实现条件判断。除了这些方法之外，你还可以在 JSX 中嵌入任何表达式，方法是将它们用大括号括起来，然后再加上 JS 逻辑运算符 &&。

在任何地方都可以用{} 使用三元表达式 做逻辑运算或者&&

### keys的用处

数组渲染的时候 需要一个key 作为唯一的id 告诉react 哪些已经渲染和删除

const todomains = todos.map(index=> 
    return (
        <li key={index}>{uindex.name}</li>
    )
)

### ref 对元素的引用 可以访问DOM元素 和组件实例

- React.createRef 通过react.createRef 创建 将其添加到组件元素上 分配给构造函数的实例属性

constructor(props) {
    super(props)
    this.ref= React.creatRef()
}
render() {
    <div ref={this.myRef}></div>
}

- 通过回调 创建一个ref

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            terms:'',
        }
        this.txtSearch = null;
        this.setInputRef = e => {
          terms:  this.textSearch = e;
        }
    }

    inputChange() {
        this.setState({
            this.txtSearch.value
        })
    }

    render() {
        <Input
            value={this.state.terms}
            onChange={this.inputChange.bind(this)}
            ref = {this.setInputRef}
        >
    }
}

### forward ref
是ref的一个特性

通过组件去接受到ref 将ref传递给子组件

const ButtonElement = React.forwardRef((props, ref) => {
    <Button ref={ref}>props.name</Button>
})

const ref = React.createRef()
<ButtonElement ref={ref}></ButtonElement>

### CallBack Ref 和 findDomNode

- findDOMNode()
findDOMNode() API 直接访问dom 弃用

componentDIdMount() {
    findDOMNode(this).scrollIntoView()
}
render() {
    <div />
}

- CallBack 

componentDidMount() {
    this.node.scrollIntoView()
}

render() {
    <div ref={node => this.node = node}></div>
}

### string ref 被弃用

<div re="ref"></div>  this.ref.background  对react不利 无法访问整个 


### Virtual DOM 虚拟dom

真实DOM Real DOM          虚拟DOM Virtual DOM

    更新较慢                    更新较快

    直接更新html                无法直接更新html

    如果元素更新，              元素更新，更新JSX
    直接更新DOM元素

    DOM操作非常昂贵               DOM操作简单

    内存浪费                     没有内存浪费

    virtual DOM 底层UI的变化 遍历整个dom树 对比新老Virtual DOM的节点 有变化的直接更新

###  React Fiber

React 16 核心算法的实现  React V16 的recornillication的实现

旨在提高动画 布局 手势 等实用性

主要是将渲染任务划分成多个小任务模块 原先每次遍历DOM树 渲染


### 受控组件 和 非受控组件 自身查询值

### React.creatElement 创建元素  React.cloneElement 克隆 只用来传递属性和传递值

### React V16 生命周期 分为三个阶段 Mounting Update Unmonunting  挂载阶段 更新阶段  卸载阶段

- Mounting 挂载阶段 组件准备好 挂载到DOM元素中
    - constructor
    - getDerivedStateFormProps
    - render
    - componentDIdMount

- Update 更新阶段  组件以两种方式进行更行  setState() forceUpdate() 方法更新状态

    - getDerivedStateFormProps(nextProps,prev) {
        if(nextProps) && (prev===this.state)
    }
    - shouldComponnetUpdate()
    - render() 
    - getSnapShotBeforUpdate()
    - componentDidUpdate()

- Unmounting 卸载阶段  不需要组件 将其从dom中卸载
    - componentWillUnmonut


1. constructor()
设置一些 默认的状态state
2. getDerivedStateFormProps()
在 render() 渲染之前使用 从负组件接收到props 对齐变更状态前使用
3. render()
4. compnentDidMount()
对于所有的ajax请求 dom更新 设置监听器 都在componentDidMount使用
5. shouldComponentUodate()
确认组件是否更新  更新返回true 不更新返回false 如果你确定在更新状态或属性后不需要渲染组件，则可以返回false值。 它是一个提高性能的好地方，因为它允许你在组件接收新属性时阻止重新渲染。
6. getSnapShotBeforUpdate()
最新的渲染输出提交给 DOM 前将会立即调用，这对于从 DOM 捕获信息（比如：滚动位置）很有用。
监听高度 滚动位置
7. componentDidUpdate()
 它主要用于更新 DOM 以响应 prop 或 state 更改。 如果shouldComponentUpdate()返回false，则不会触发。
8. componentWillUnMount
组件不需要渲染时调用 不需要更新dom 取消ajax 请求 监听器


componentDidMount() {
    window.addEventListener('resize',this.onResize)
}

componentWillUnmount() {
    window.removeEventListenner('resize',this.onResize)
}

onResize = () => {

}
监听事件

### React v16.3 以前声明周期   废弃的  UN_SAFE

- componentWillMount()
 在render前使用
- componentWillReciveProps()
更新state的状态
对比this.state和 nextProps
- componentWillUpdate()
在shounldComponentUpdate 返回true执行


### 高阶组件

本质就是一个函数

一个函数 接收一个组件作为参数 并且返回一个新的组件 这就是高阶组件 HOC

特点有点：
- 代码复用 逻辑抽象化
- 渲染劫持
- 抽象画和操作状态
- 操作属性

### HOC 设置属性代理

function HOC(WrappComponent) {
    return class Header extends Component {
        newProps ={

        }

        return <WrappCompoennt {...newProps} {...state} />
    }
}

### 为什么React 组件名要大写

因为组件不是dom元素 只是构造函数 小写是默认的html元素

###  className 传递一个字符串 作为className的属性
class 是 JavaScript 中的关键字，而 JSX 是 JavaScript 的扩展。这就是为什么 React 使用 className 而不是 class 的主要原因。传递一个字符串作为 className 属性。

render() {
  return <span className={'menu navigation-menu'}>{'Menu'}</span>
}
在实际项目中，我们经常使用classnames来方便我们操作className。


### FrageMents 多个组件组成

### 有状态组件 和 无状态组件
- 无状态组件 没有state和 this  纯函数组件 没有生命周期
如果行为独立于其状态，则它可以是无状态组件。你可以使用函数或类来创建无状态组件。但除非你需要在组件中使用生命周期钩子，否则你应该选择函数组件。无状态组件有很多好处： 它们易于编写，理解和测试，速度更快，而且你可以完全避免使用this关键字。
- 有状态组件   state 生命周期 初始化 state

如果组件的行为依赖于组件的state，那么它可以被称为有状态组件。这些有状态组件总是类组件，并且具有在constructor中初始化的状态。

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    // ...
  }
}

### react 校验 props 属性  类型校验 PropTypes
当应用程序以开发模式运行的时，React 将会自动检查我们在组件上设置的所有属性，以确保它们具有正确的类型。如果类型不正确，React 将在控制台中生成警告信息。由于性能影响，它在生产模式下被禁用。使用 isRequired 定义必填属性。

import React from 'react'
import PropType from 'prop-type'

export default class User extends Component {
    static propTypes= {
        name:PropType.String.isRequired
    }

    render() {
        return(
            <div>{this.props.name}</div>
        )
    }
}

### Pure Component 纯组件调用


### React 优点

使用 Virtual DOM 提高应用程序的性能。
JSX 使代码易于读写。
它支持在客户端和服务端渲染。
易于与框架（Angular，Backbone）集成，因为它只是一个视图库。  UI
使用 Jest 等工具轻松编写单元与集成测试。

### React 缺点

React 只是一个视图库，而不是一个完整的框架。
对于 Web 开发初学者来说，有一个学习曲线。
将 React 集成到传统的 MVC 框架中需要一些额外的配置。
代码复杂性随着内联模板和 JSX 的增加而增加。
如果有太多的小组件可能增加项目的庞大和复杂。


### React 错误边界

componentDidCatch getDerivedStateFormError

componentDidCatch(err,info) {

}

### react 设置 内联样式

dangerouslySetInnerHTML 属性是 React 用来替代在浏览器 DOM 中使用 innerHTML。与 innerHTML 一样，考虑到跨站脚本攻击（XSS），使用此属性也是有风险的。使用时，你只需传递以 __html 作为键，而 HTML 文本作为对应值的对象。

在本示例中 MyComponent 组件使用 dangerouslySetInnerHTML 属性来设置 HTML 标记：

function createMarkup() {
  return { __html: 'First &middot; Second' }
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />
}

通过 dangerouslySetInnerHTML
<div dangerouslySetInnnerHTML={createHTML()}>

function createHTML() {
    return {
        _html:'hello'
    }
}

### React 装饰器
你可以装饰你的类组件，这与将组件传递到函数中是一样的。 装饰器是修改组件功能灵活且易读的方式。

@setTitle('Profile')
class Profile extends React.Component {
    //....
}

/*
  title is a string that will be set as a document title
  WrappedComponent is what our decorator will receive when
  put directly above a component class as seen in the example above
*/
const setTitle = (title) => (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

### 如何实现 Server Side Rendering 或 SSR?
React 已经配备了用于处理 Node 服务器上页面渲染的功能。你可以使用特殊版本的 DOM 渲染器，它遵循与客户端相同的模式。

import ReactDOMServer from 'react-dom/server'
import App from './App'

ReactDOMServer.renderToString(<App />)
此方法将以字符串形式输出常规 HTML，然后将其作为服务器响应的一部分放在页面正文中。在客户端，React 检测预渲染的内容并无缝地衔接。

import ReactDOMServer from 'react-dom/server'


### 什么是 CRA 及其好处?
create-react-app CLI 工具允许你无需配置步骤，快速创建和运行 React 应用。

让我们使用 CRA 来创建 Todo 应用：

npm install -g create-react-app 
create-react-app js
npm run build
npm run start

# Installation
$ npm install -g create-react-app

# Create new project
$ create-react-app todo-app
$ cd todo-app

# Build, test and run
$ npm run build
$ npm run test
$ npm start
它包含了构建 React 应用程序所需的一切：

React, JSX, ES6, 和 Flow 语法支持。
ES6 之外的语言附加功能，比如对象扩展运算符。
Autoprefixed CSS，因此你不在需要 -webkit- 或其他前缀。
一个快速的交互式单元测试运行程序，内置了对覆盖率报告的支持。
一个实时开发服务器，用于警告常见错误。
一个构建脚本，用于打包用于生产中包含 hashes 和 sourcemaps 的 JS、CSS 和 Images 文件。


### 在 mounting 阶段生命周期方法的执行顺序是什么?
在创建组件的实例并将其插入到 DOM 中时，将按以下顺序调用生命周期方法。

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()   static getDerivedStateFormProps

### 在 React v16 中，哪些生命周期方法将被弃用?
以下生命周期方法将成为不安全的编码实践，并且在异步渲染方面会更有问题。

componentWillMount()
componentWillReceiveProps()
componentWillUpdate()
从 React v16.3 开始，这些方法使用 UNSAFE_ 前缀作为别名，未加前缀的版本将在 React v17 中被移除。

### static getDerivedStateFormProps
生命周期方法 getDerivedStateFromProps() 的目的是什么?
新的静态 getDerivedStateFromProps() 生命周期方法在实例化组件之后以及重新渲染组件之前调用。它可以返回一个对象用于更新状态，或者返回 null 指示新的属性不需要任何状态更新。

class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
此生命周期方法与 componentDidUpdate() 一起涵盖了 componentWillReceiveProps() 的所有用例。

### 生命周期方法 getSnapshotBeforeUpdate() 的目的是什么?
新的 getSnapshotBeforeUpdate() 生命周期方法在 DOM 更新之前被调用。此方法的返回值将作为第三个参数传递给componentDidUpdate()。

class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
此生命周期方法与 componentDidUpdate() 一起涵盖了 componentWillUpdate() 的所有用例。


getSnapShotBeforUpdate(prevProps,prevState) {

}

### 为什么我们需要将函数传递给 setState() 方法?
这背后的原因是 setState() 是一个异步操作。出于性能原因，React 会对状态更改进行批处理，因此在调用 setState() 方法之后，状态可能不会立即更改。这意味着当你调用 setState() 方法时，你不应该依赖当前状态，因为你不能确定当前状态应该是什么。这个问题的解决方案是将一个函数传递给 setState()，该函数会以上一个状态作为参数。通过这样做，你可以避免由于 setState() 的异步性质而导致用户在访问时获取旧状态值的问题。

假设初始计数值为零。在连续三次增加操作之后，该值将只增加一个。

// assuming this.state.count === 0
this.setState({ count: this.state.count + 1 })
this.setState({ count: this.state.count + 1 })
this.setState({ count: this.state.count + 1 })
// this.state.count === 1, not 3
如果将函数传递给 setState()，则 count 将正确递增。

this.setState((prevState, props) => ({
  count: prevState.count + props.increment
}))
// this.state.count === 3 as expected

setState 是异步的 调用setState方法不可能会立即更改 通过函数 或者回调

### React.StrictMode 是一个有用的组件，用于突出显示应用程序中的潜在问题。就像 <Fragment>，<StrictMode> 一样，它们不会渲染任何额外的 DOM 元素。它为其后代激活额外的检查和警告。这些检查仅适用于开发模式。

React.StrictMode 严格模式
import React from 'react'

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  )
}
在上面的示例中，strict mode 检查仅应用于 <ComponentOne> 和 <ComponentTwo> 组件。

### 在使用 ES6 类的 React 中 super() 和 super(props) 有什么区别?
当你想要在 constructor() 函数中访问 this.props，你需要将 props 传递给 super() 方法。

使用 super(props):

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props) // { name: 'John', ... }
  }
}
使用 super():

class MyComponent extends React.Component {
  constructor(props) {
    super()
    console.log(this.props) // undefined
  }
}
在 constructor() 函数之外，访问 this.props 属性会显示相同的值。


### 为什么使用super(props)

constructor() {
    super(props)
    //super 是父类超类的构造函数  访问this
}

### 如何合并多个内联的样式对象?
在 React 中，你可以使用扩展运算符:

 <button style={{...styles.panel.button, ...styles.panel.submitButton}}>{'Submit'}</button>
如果你使用的是 React Native，则可以使用数组表示法：

<button style={[styles.panel.button, styles.panel.submitButton]}>{'Submit'}</button>


### 如何在调整浏览器大小时重新渲染视图?
你可以在 componentDidMount() 中监听 resize 事件，然后更新尺寸（width 和 height）。你应该在 componentWillUnmount() 方法中移除监听。

class WindowDimensions extends React.Component {
  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()})
  }

  render() {
    return <span>{this.state.width} x {this.state.height}</span>
  }
}

### 在 React 状态中删除数组元素的推荐方法是什么?
更好的方法是使用 Array.prototype.filter() 方法。

例如，让我们创建用于更新状态的 removeItem() 方法。

removeItem(index) {
  this.setState({
    data: this.state.data.filter((item, i) => i !== index)
  })
}

### 如何用 React 漂亮地显示 JSON?
我们可以使用 <pre> 标签，以便保留 JSON.stringify() 的格式：

const data = { name: 'John', age: 42 }

class User extends React.Component {
  render() {
    return (
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }
}

React.render(<User />, document.getElementById('container'))


### 为什么你不能更新 React 中的 props?
React 的哲学是 props 应该是 immutable 和 top-down。这意味着父级可以向子级发送任何属性值，但子级不能修改接收到的属性。

父级可以向子组件传递props属性 而子组件不可以修改 props属性


### 如何在页面加载时聚焦一个输入元素?
你可以为 input 元素创建一个 ref，然后在 componentDidMount() 方法中使用它：

class App extends React.Component{
  componentDidMount() {
    this.nameInput.focus()
  }

  render() {
    return (
      <div>
        <input
          defaultValue={'Won\'t focus'}
        />
        <input
          ref={(input) => this.nameInput = input}
          defaultValue={'Will focus'}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))



class InputDemo extends Component {
    constructor(props) {
            this.nameInput.focus()
    }

    render() {
        return (
            <Input defaultValue="h" />
            <Input 
                ref={(nameInput) => this.nameInput = nameInput}
                defaultValue="hh"
            >
        )
    }
}


### 更新状态中的对象有哪些可能的方法?
用一个对象调用 setState() 来与状态合并：

使用 Object.assign() 创建对象的副本：

const user = Object.assign({}, this.state.user, { age: 42 })
this.setState({ user })
使用扩展运算符：

const user = { ...this.state.user, age: 42 }
this.setState({ user })
使用一个函数调用 setState()：

this.setState(prevState => ({
  user: {
    ...prevState.user,
    age: 42
  }
}))


### 在 React 中是否可以使用 async/await?
如果要在 React 中使用 async/await，则需要 Babel 和 transform-async-to-generator 插件。

### 最流行的动画软件包是什么?
React Transition Group 和 React Motion 是React生态系统中流行的动画包。

### class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      error: null
    }
  }

  componentDidMount() {
    fetch('https://api.example.com/items')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employees: result.employees
          })
        },
        (error) => {
          this.setState({ error })
        }
      )
  }

  render() {
    const { error, employees } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <ul>
          {employees.map(item => (
            <li key={employee.name}>
              {employee.name}-{employees.experience}
            </li>
          ))}
        </ul>
      )
    }
  }
}


async ajaxData = data = > {
    const res = await commonQuery()
}

componentDidMount() {
    fetch('address')
    .then(res => res.json)
    .then(
        (result) => {
            this.setState({

            })
        },
        (error) => {
            this.setState(error)
        }
    )
}

### React -router
什么是 React Router?
React Router 是一个基于 React 之上的强大路由库，可以帮助您快速地向应用添加视图和数据流，同时保持 UI 与 URL 同步。

⬆ 返回顶部

React Router 与 history 库的区别?
React Router 是history库的包装器，它处理浏览器的window.history与浏览器和哈希历史的交互。它还提供了内存历史记录，这对于没有全局历史记录的环境非常有用，例如移动应用程序开发（React Native）和使用 Node 进行单元测试。

⬆ 返回顶部

在 React Router v4 中的<Router>组件是什么?
React Router v4 提供了以下三种类型的 <Router> 组件:

<BrowserRouter>
<HashRouter>
<MemoryRouter>
以上组件将创建browser，hash和memory的 history 实例。React Router v4 通过router对象中的上下文使与您的路由器关联的history实例的属性和方法可用。

histrory.push
this.props.history.push('/')



### 如何在 React Router v4 中获取查询字符串参数?
在 React Router v4 中并没有内置解析查询字符串的能力，因为多年来一直有用户希望支持不同的实现。因此，使用者可以选择他们喜欢的实现方式。建议的方法是使用 query-string 库。

const queryString = require('query-string');
const parsed = queryString.parse(props.location.search);
如果你想要使用原生 API 的话，你也可以使用 URLSearchParams ：

const params = new URLSearchParams(props.location.search)
const foo = params.get('name')
如果使用 URLSearchParams 的话您应该为 IE11 使用polyfill。


### 为什么你会得到 "Router may have only one child element" 警告?
此警告的意思是Router组件下仅能包含一个子节点。

你必须将你的 Route 包装在<Switch>块中，因为<Switch>是唯一的，它只提供一个路由。

首先，您需要在导入中添加Switch：

import { Switch, Router, Route } from 'react-router'
然后在<Switch>块中定义路由：

<Router>
  <Switch>
    <Route {/* ... */} />
    <Route {/* ... */} />
  </Switch>
</Router>


### 如何在 React Router v4 中将 params 传递给 history.push 方法?
在导航时，您可以将 props 传递给history对象：

this.props.history.push({
  pathname: '/template',
  search: '?name=sudheer',
  state: { detail: response.data }
})
search属性用于在push()方法中传递查询参数。


### 如何实现默认页面或 404 页面?
<Switch>呈现匹配的第一个孩子<Route>。 没有路径的<Route>总是匹配。所以你只需要简单地删除 path 属性，如下所示：

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/user" component={User}/>
  <Route component={NotFound} />
</Switch>


<Route component={NotFound} />

###  react-router包在 React Router 中提供了<Redirect>组件。渲染<Redirect>将导航到新位置。与服务器端重定向一样，新位置将覆盖历史堆栈中的当前位置。

import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class LoginComponent extends Component {
  render() {
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/your/redirect/page" />
    } else {
      return <div>{'Login Please'}</div>
    }
  }
}

### 什么是 React Intl?
React Intl库使 React 中的内部化变得简单，使用现成的组件和 API ，可以处理从格式化字符串，日期和数字到复数的所有功能。React Intl 是FormatJS的一部分，它通过其组件和 API 提供与 React 的绑定。

⬆ 返回顶部

React Intl 的主要特性是什么?
用分隔符显示数字
正确显示日期和时间
显示相对于“现在”的日期
将标签转换为字符串
支持 150 多种语言
支持在浏览器和 Node 中运行
建立在标准之上

在 React Intl 中有哪两种格式化方式?
该库提供了两种格式化字符串，数字和日期的方法：React 组件或 API。

<FormattedMessage
  id={'account'}
  defaultMessage={'The amount is less than minimum balance.'}
/>
const messages = defineMessages({
  accountMessage: {
    id: 'account',
    defaultMessage: 'The amount is less than minimum balance.',
  }
})

formatMessage(messages.accountMessage)


在 React Intl 中如何使用<FormattedMessage>作为占位符使用?
react-intl的<Formatted ... />组件返回元素，而不是纯文本，因此它们不能用于占位符，替代文本等。在这种情况下，您应该使用较低级别的 API formatMessage()。您可以使用injectIntl()高阶函数将intl对象注入到组件中，然后使用该对象上使用formatMessage()格式化消息。

import React from 'react'
import { injectIntl, intlShape } from 'react-intl'

const MyComponent = ({ intl }) => {
  const placeholder = intl.formatMessage({id: 'messageId'})
  return <input placeholder={placeholder} />
}

MyComponent.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(MyComponent)



### React Redux

## flux 单向数据流
Flux 是应用程序设计范例，用于替代更传统的 MVC 模式。它不是一个框架或库，而是一种新的体系结构，它补充了 React 和单向数据流的概念。在使用 React 时，Facebook 会在内部使用此模式。

### 什么是 Redux?
Redux 是基于 Flux设计模式 的 JavaScript 应用程序的可预测状态容器。Redux 可以与 React 一起使用，也可以与任何其他视图库一起使用。它很小（约2kB）并且没有依赖性。
单项数据流 数据状态管理中心

store 抽象管理共同状态

### Redux 核心原则
Redux 遵循三个基本原则：

单一数据来源： 整个应用程序的状态存储在单个对象树中。单状态树可以更容易地跟踪随时间的变化并调试或检查应用程序。
状态是只读的： 改变状态的唯一方法是发出一个动作，一个描述发生的事情的对象。这可以确保视图和网络请求都不会直接写入状态。
使用纯函数进行更改： 要指定状态树如何通过操作进行转换，您可以编写reducers。Reducers 只是纯函数，它将先前的状态和操作作为参数，并返回下一个状态。


### 与 Flux 相比，Redux 的缺点是什么?
我们应该说使用 Redux 而不是 Flux 几乎没有任何缺点。这些如下：

您将需要学会避免突变： Flux 对变异数据毫不吝啬，但 Redux 不喜欢突变，许多与 Redux 互补的包假设您从不改变状态。您可以使用 dev-only 软件包强制执行此操作，例如redux-immutable-state-invariant，Immutable.js，或指示您的团队编写非变异代码。
您将不得不仔细选择您的软件包： 虽然 Flux 明确没有尝试解决诸如撤消/重做，持久性或表单之类的问题，但 Redux 有扩展点，例如中间件和存储增强器，以及它催生了丰富的生态系统。
还没有很好的 Flow 集成： Flux 目前可以让你做一些非常令人印象深刻的静态类型检查，Redux 还不支持。


### mapStateToProps

mapStateProps = state => {

}
mapStateToProps()是一个实用方法，它可以帮助您的组件获得最新的状态（由其他一些组件更新）：

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
### mapDispatchToProps

mapDispatchToProps = dispatch => {

}

mapDispatchToProps()是一个实用方法，它可以帮助你的组件触发一个动作事件（可能导致应用程序状态改变的调度动作）：

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

### 我可以在 reducer 中触发一个 Action 吗?
在 reducer 中触发 Action 是反模式。您的 reducer 应该没有副作用，只是接收 Action 并返回一个新的状态对象。在 reducer 中添加侦听器和调度操作可能会导致链接的 Action 和其他副作用。

⬆ 返回顶部

如何在组件外部访问 Redux 存储的对象?
是的，您只需要使用createStore()从它创建的模块中导出存储。此外，它不应污染全局窗口对象。

store = createStore(myReducer)

export default store


### MVW 模式的缺点是什么?
DOM 操作非常昂贵，导致应用程序行为缓慢且效率低下。
由于循环依赖性，围绕模型和视图创建了复杂的模型。
协作型应用程序（如Google Docs）会发生大量数据更改。
无需添加太多额外代码就无法轻松撤消（及时回退）。


### Redux 和 RxJS 之间是否有任何相似之处?
这些库的目的是不同的，但是存在一些模糊的相似之处。

Redux 是一个在整个应用程序中管理状态的工具。它通常用作 UI 的体系结构。可以将其视为（一半）Angular 的替代品。 RxJS 是一个反应式编程库。它通常用作在 JavaScript 中完成异步任务的工具。把它想象成 Promise 的替代品。 Redux 使用 Reactive 范例，因为Store是被动的。Store 检测到 Action，并自行改变。RxJS也使用 Reactive 范例，但它不是一个体系结构，它为您提供了基本构建块 Observables 来完成这种模式。


### 您可以在componentDidMount()方法中触发 Action，然后在render()方法中可以验证数据。

class App extends Component {
  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    return this.props.isLoaded
      ? <div>{'Loaded'}</div>
      : <div>{'Not Loaded'}</div>
  }
}

const mapStateToProps = (state) => ({
  isLoaded: state.isLoaded
})

const mapDispatchToProps = { fetchData }

export default connect(mapStateToProps, mapDispatchToProps)(App)


### 在 React 中如何使用 Redux 的 connect() ?
您需要按照两个步骤在容器中使用您的 Store：

使用mapStateToProps()： 它将 Store 中的状态变量映射到您指定的属性。

将上述属性连接到容器： mapStateToProps函数返回的对象连接到容器。你可以从react-redux导入connect()。

import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return <div>{this.props.containerData}</div>
  }
}

function mapStateToProps(state) {
  return { containerData: state.data }
}

export default connect(mapStateToProps)(App)


import React from 'react'
import {connect} from 'react-redux'

@withRouter

class App extends Component {
    render() {
        return <div>this.props.containerData</div>
    }
}

const mapStateToProps = state => {
    return {containerData:state.date}
}

export default connect(mapStateToProps)(App)


### 如何在 Redux 中重置状态?
你需要在你的应用程序中编写一个root reducer，它将处理动作委托给combineReducers()生成的 reducer。

例如，让我们在USER_LOGOUT动作之后让rootReducer()返回初始状态。我们知道，无论 Action 怎么样，当使用undefined作为第一个参数调用它们时，reducers 应该返回初始状态。

const appReducer = combineReducers({
  /* your app's top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
如果使用redux-persist，您可能还需要清理存储空间。redux-persist在 storage 引擎中保存您的状态副本。首先，您需要导入适当的 storage 引擎，然后在将其设置为undefined之前解析状态并清理每个存储状态键。

const appReducer = combineReducers({
  /* your app's top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })

    state = undefined
  }
return appReducer(state, action)
}

### import React from 'react'
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MyApp extends React.Component {
  // ...define your main app here
}

### 为什么 Redux 状态函数称为 reducers ?
Reducers 总是返回状态的累积（基于所有先前状态和当前 Action）。因此，它们充当了状态的 Reducer。每次调用 Redux reducer 时，状态和 Action 都将作为参数传递。然后基于该 Action 减少（或累积）该状态，然后返回下一状态。您可以reduce一组操作和一个初始状态（Store），在该状态下执行这些操作以获得最终的最终状态。


### 如何在 Redux 中发起 AJAX 请求?
您可以使用redux-thunk中间件，它允许您定义异步操作。

让我们举个例子，使用fetch API将特定帐户作为 AJAX 调用获取：

export function fetchAccount(id) {
  return dispatch => {
    dispatch(setLoadingAccountState()) // Show a loading spinner
    fetch(`/account/${id}`, (response) => {
      dispatch(doneFetchingAccount()) // Hide loading spinner
      if (response.status === 200) {
        dispatch(setAccount(response.json)) // Use a normal function to set the received state
      } else {
        dispatch(someError)
      }
    })
  }
}

function setAccount(data) {
 return { type: 'SET_Account', data: data }
}


export function Login(id) {
    return dispatch => {
        fetch('/', (response) => {
            if(res.code==='0' && res.status === '200') {
                dispatch(res.json)
            }
            else {
                dispatch(error)
            }
        })
    }
}

### 访问 Redux Store 的正确方法是什么?
在组件中访问 Store 的最佳方法是使用connect()函数，该函数创建一个包裹现有组件的新组件。此模式称为高阶组件，通常是在 React 中扩展组件功能的首选方式。这允许您将状态和 Action 创建者映射到组件，并在 Store 更新时自动传递它们。

我们来看一个使用 connect 的<FilterLink>组件的例子：

import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
由于它具有相当多的性能优化并且通常不太可能导致错误，因此 Redux 开发人员几乎总是建议使用connect()直接访问 Store（使用上下文API）。


### React Redux 中展示组件和容器组件之间的区别是什么?
展示组件是一个类或功能组件，用于描述应用程序的展示部分。

容器组件是连接到 Redux Store的组件的非正式术语。容器组件订阅 Redux 状态更新和dispatch操作，它们通常不呈现 DOM 元素；他们将渲染委托给展示性的子组件。

展示组件 类 功能组件
容器组件 订阅redux 和dispatch

### Redux 中常量的用途是什么?
常量允许您在使用 IDE 时轻松查找项目中该特定功能的所有用法。它还可以防止你拼写错误，在这种情况下，你会立即得到一个ReferenceError。

通常我们会将它们保存在一个文件中（constants.js或actionTypes.js）。

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
在 Redux 中，您可以在两个地方使用它们：

在 Action 创建时:

让我们看看 actions.js:

import { ADD_TODO } from './actionTypes';

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

在 reducers 里:

让我们创建 reducer.js 文件:

import { ADD_TODO } from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    default:
      return state
  }
}

### mapDispatchToProps

const mapDispatchToprops = dispatch => {
    action:() => dispatch(action())
}

### 如何构建 Redux 项目目录?
大多数项目都有几个顶级目录，如下所示：

Components: 用于dumb组件，Redux 不必关心的组件。
Containers: 用于连接到 Redux 的smart组件。
Actions: 用于所有 Action 创建器，其中文件名对应于应用程序的一部分。
Reducers: 用于所有 reducer，其中文件名对应于state key。
Store: 用于 Store 初始化。
这种结构适用于中小型项目。


### 什么是 redux-saga?
redux-saga是一个库，旨在使 React/Redux 项目中的副作用（数据获取等异步操作和访问浏览器缓存等可能产生副作用的动作）更容易，更好。

这个包在 NPM 上有发布:

$ npm install --save redux-saga

让异步获取数据和访问浏览器缓存更加方便

redux-saga

Saga就像你的项目中的一个单独的线程，它独自负责副作用。redux-saga 是一个 redux 中间件，这意味着它可以在项目启动中使用正常的 Redux 操作，暂停和取消该线程，它可以访问完整的 Redux 应用程序状态，并且它也可以调度 Redux 操作。

redux-saga 是redux的一个中间件 可以访问redux 状态 可以使用正常的redux操作 和暂停 取消线程

### 在 redux-saga 中 call() 和 put() 之间有什么区别?
call()和put()都是 Effect 创建函数。 call()函数用于创建 Effect 描述，指示中间件调用 promise。put()函数创建一个 Effect，指示中间件将一个 Action 分派给 Store。

让我们举例说明这些 Effect 如何用于获取特定用户数据。

function* fetchUserSaga(action) {
  // `call` function accepts rest arguments, which will be passed to `api.fetchUser` function.
  // Instructing middleware to call promise, it resolved value will be assigned to `userData` variable
  const userData = yield call(api.fetchUser, action.userId)

  // Instructing middleware to dispatch corresponding action.
  yield put({
    type: 'FETCH_USER_SUCCESS',
    userData
  })
}

### 什么是 Redux Thunk?
Redux Thunk中间件允许您编写返回函数而不是 Action 的创建者。 thunk 可用于延迟 Action 的发送，或仅在满足某个条件时发送。内部函数接收 Store 的方法dispatch()和getState()作为参数。
### redux-thunk 和 redux-saga
redux-saga 和 redux-thunk 之间有什么区别?
Redux Thunk和Redux Saga都负责处理副作用。在大多数场景中，Thunk 使用Promises来处理它们，而 Saga 使用Generators。Thunk 易于使用，因为许多开发人员都熟悉 Promise，Sagas/Generators 功能更强大，但您需要学习它们。但是这两个中间件可以共存，所以你可以从 Thunks 开始，并在需要时引入 Sagas。


### 什么是 Redux DevTools?
Redux DevTools是 Redux 的实时编辑的时间旅行环境，具有热重新加载，Action 重放和可自定义的 UI。如果您不想安装 Redux DevTools 并将其集成到项目中，请考虑使用 Chrome 和 Firefox 的扩展插件。

⬆ 返回顶部

Redux DevTools 的功能有哪些?
允许您检查每个状态和 action 负载。
让你可以通过撤销回到过去。
如果更改 reducer 代码，将重新评估每个已暂存的 Action。
如果 Reducers 抛出错误，你会看到这发生了什么 Action，以及错误是什么。
使用persistState()存储增强器，您可以在页面重新加载期间保持调试会话。

### 如何向 Redux 添加多个中间件?
你可以使用applyMiddleware()。

例如，你可以添加redux-thunk和logger作为参数传递给applyMiddleware()：

import { createStore, applyMiddleware } from 'redux'
const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore)

applyMiddleWare()

### 如何在 Redux 中设置初始状态?
您需要将初始状态作为第二个参数传递给 createStore ：

const rootReducer = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})

const initialState = {
  todos: [{ id: 123, name: 'example', completed: false }]
}

const store = createStore(
  rootReducer,
  initialState
)


### React Native 和 React 有什么区别?
React是一个 JavaScript 库，支持前端 Web 和在服务器上运行，用于构建用户界面和 Web 应用程序。

React Native是一个移动端框架，可编译为本机应用程序组件，允许您使用 JavaScript 构建本机移动应用程序（iOS，Android和Windows），允许您使用 React 构建组件。


### 什么是 Flow?
Flow 是一个静态类型检查器，旨在查找 JavaScript 中的类型错误。与传统类型系统相比，Flow 类型可以表达更细粒度的区别。例如，与大多数类型系统不同，Flow 能帮助你捕获涉及 null 的错误。

⬆ 返回顶部

Flow 和 PropTypes 有什么区别?
Flow 是一个静态分析工具（静态检查器），它使用该语言的超集，允许你在所有代码中添加类型注释，并在编译时捕获整个类的错误。PropTypes 是一个基本类型检查器（运行时检查器），已经被添加到 React 中。除了检查传递给给定组件的属性类型外，它不能检查其他任何内容。如果你希望对整个项目进行更灵活的类型检查，那么 Flow/TypeScript 是更合适的选择。

⬆ 返回顶部

### 在 React 中如何使用 Font Awesome 图标?
接下来的步骤将在 React 中引入 Font Awesome：

安装 font-awesome:
$ npm install --save font-awesome
在 index.js 文件中导入 font-awesome:
import 'font-awesome/css/font-awesome.min.css'
在 className 中添加 Font Awesome 类:
render() {
  return <div><i className={'fa fa-spinner'} /></div>
}


### 与 Vue.js 相比，React 有哪些优势?
与 Vue.js 相比，React 具有以下优势：

在大型应用程序开发中提供更大的灵活性。
更容易测试。
更适合创建移动端应用程序。
提供更多的信息和解决方案。

与Vue.js

react更适合多人协作 大型应用程序开发 灵活性
更容易测试
提供更多信息和解决方案

### React 和 Angular 有什么区别?
React	                                            Angular
React 是一个库，只有View层	                    Angular是一个框架，具有完整的 MVC 功能
React 可以处理服务器端的渲染	                AngularJS 仅在客户端呈现，但 Angular 2 及更高版本可以在服务器端渲染
React 在 JS 中使用看起来像 HTML 的 JSX，
这可能令人困惑                                   Angular 遵循 HTML 的模板方法，这使得代码更短且易于理解
React Native 是一种 React 类型，
它用于构建移动应用程序，它更快，更稳定	Ionic，     Angular 的移动 app 相对原生 app 来说不太稳定和慢
在 Reac t中，数据只以单一方向传递，因此调试很容易	在 Angular 中，数据以两种方式传递，即它在子节点和父节点之间具有双向数据绑定，因此调试通常很困难


### Redux 中的 Action 是什么?
Actions是纯 JavaScript 对象或信息的有效负载，可将数据从您的应用程序发送到您的 Store。 它们是 Store 唯一的数据来源。 Action 必须具有指示正在执行的操作类型的 type 属性。

例如，表示添加新待办事项的示例操作：

{
  type: ADD_TODO,
  text: 'Add todo item'
}


### 我需要将所有状态保存到 Redux 中吗？我应该使用 react 的内部状态吗?
这取决于开发者的决定。即开发人员的工作是确定应用程序的哪种状态，以及每个状态应该存在的位置，有些用户喜欢将每一个数据保存在 Redux 中，以维护其应用程序的完全可序列化和受控。其他人更喜欢在组件的内部状态内保持非关键或UI状态，例如“此下拉列表当前是否打开”。

以下是确定应将哪种数据放入Redux的主要规则：

应用程序的其他部分是否关心此数据？
您是否需要能够基于此原始数据创建更多派生数据？
是否使用相同的数据来驱动多个组件？
能够将此状态恢复到给定时间点（即时间旅行调试）是否对您有价值？
您是否要缓存数据（即，如果已经存在，则使用处于状态的状态而不是重新请求它）？


### 什么是 hooks?
Hooks 是一个新的草案，它允许你在不编写类的情况下使用状态和其他 React 特性。让我们来看一个 useState 钩子示例：

import { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

不编写类组件依然可以使用react的特性
import {useState} from 'react'

function example() {
    const [count,setCount] = useState(0);
    return (
        <p>{count}</p>
        <button onClick={()=> setCount(count+1)}>
        click
        </button>
    )
}

### Hooks 需要遵循什么规则?
为了使用 hooks，你需要遵守两个规则：

仅在顶层的 React 函数调用 hooks。也就是说，你不能在循环、条件或内嵌函数中调用 hooks。这将确保每次组件渲染时都以相同的顺序调用 hooks，并且它会在多个 useState 和 useEffect 调用之间保留 hooks 的状态。
仅在 React 函数中调用 hooks。例如，你不能在常规的 JavaScript 函数中调用 hooks。


### Flux 和 Redux 之间有什么区别?
以下是 Flux 和 Redux 之间的主要区别

Flux	Redux
状态是可变的	状态是不可变的
Store 包含状态和更改逻辑	存储和更改逻辑是分开的
存在多个 Store	仅存在一个 Store
所有的 Store 都是断开连接的	带有分层 reducers 的 Store
它有一个单独的 dispatcher	没有 dispatcher 的概念
React 组件监测 Store	容器组件使用连接函数


### React Router V4 有什么好处?
以下是 React Router V4 模块的主要优点：

在React Router v4（版本4）中，API完全与组件有关。路由器可以显示为单个组件（），它包装特定的子路由器组件（）。
您无需手动设置历史记录。路由器模块将通过使用组件包装路由来处理历史记录。
通过仅添加特定路由器模块（Web，core 或 native）来减少应用大小。

### 在哪些情况下，错误边界不会捕获错误?
以下是错误边界不起作用的情况：

在事件处理器内。
setTimeout 或 requestAnimationFrame 回调中的异步代码。
在服务端渲染期间。
错误边界代码本身中引发错误时。


### 错误边界不会捕获事件处理程序中的错误。与 render 方法或生命周期方法不同，在渲染期间事件处理器不会被执行或调用。

如果仍然需要在事件处理程序中捕获错误，请使用下面的常规 JavaScript try/catch 语句：

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  handleClick = () => {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
上面的代码使用普通的 JavaScript try/catch 块而不是错误边界来捕获错误。


### 当组件重新渲染时顺序执行的方法有哪些?
更新可能由属性或状态的更改引起。在重新渲染组件时，会按以下顺序调用下列方法。

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()


### 什么是代码拆分?
Code-Splitting 是 Webpack 和 Browserify 等打包工具所支持的一项功能，它可以创建多个 bundles，并可以在运行时动态加载。React 项目支持通过 dynamic import() 特性进行代码拆分。例如，在下面的代码片段中，它将使 moduleA.js 及其所有唯一依赖项作为单独的块，仅当用户点击 'Load' 按钮后才加载。


### 严格模式有什么好处?
在下面的情况下， 将有所帮助：

使用 unsafe lifecycle methods 标识组件。
有关 legacy string ref API 用法发出警告。
检测无法预测的 side effects。
检测 legacy context API。
有关已弃用的 findDOMNode 用法的警告。


### 什么是 NextJS 及其主要特征?
Next.js 是一个流行的轻量级框架，用于使用 React 构建静态和服务端渲染应用程序。它还提供样式和路由解决方案。以下是 NextJS 提供的主要功能：

默认服务端渲染
自动代码拆分以加快页面加载速度
简单的客户端路由 (基于页面)
基于 Webpack 的开发环境支持 (HMR)
能够使用 Express 或任何其他 Node.js HTTP 服务器
可自定义你自己的 Babel 和 Webpack 配置


### JSX 如何防止注入攻击?
React DOM 会在渲染 JSX 中嵌入的任何值之前对其进行转义。因此，它确保你永远不能注入任何未在应用程序中显式写入的内容。

const name = response.potentiallyMaliciousInput;
const element = <h1>{name}</h1>;
这样可以防止应用程序中的XSS（跨站点脚本）攻击。

JSX会转义 防止XSS 跨站伪脚本攻击

###  什么是 loadable 组件?
如果你想要在服务端渲染的应用程序中实现代码拆分，建议使用 Loadable 组件，因为 React.lazy 和 Suspense 还不可用于服务器端渲染。Loadable 允许你将动态导入的组件作为常规的组件进行渲染。让我们举一个例子：

import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}

服务端渲染 实现代码拆分  Loadable组件


### 什么是 suspense 组件?
如果父组件在渲染时包含 dynamic import 的模块尚未加载完成，在此加载过程中，你必须使用一个 loading 指示器显示后备内容。这可以使用 Suspense 组件来实现。例如，下面的代码使用 Suspense 组件：

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
正如上面的代码中所展示的，懒加载的组件被包装在 Suspense 组件中。


### 什么是基于路由的代码拆分?
进行代码拆分的最佳位置之一是路由。整个页面将立即重新渲染，因此用户不太可能同时与页面中的其他元素进行交互。因此，用户体验不会受到干扰。让我们以基于路由的网站为例，使用像 React Router 和 React.lazy 这样的库：

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
在上面的代码中，代码拆分将发生在每个路由层级。


### 举例说明如何使用 context?
Context 旨在共享可被视为全局的数据，用于 React 组件树。例如，在下面的代码中，允许手动通过一个 theme 属性来设置按钮组件的样式。

//Lets create a context with a default theme value "luna"
const ThemeContext = React.createContext('luna');
// Create App component where it uses provider to pass theme value in the tree
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="nova">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// A middle component where you don't need to pass theme prop anymore
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
// Lets read theme value in the button component to use
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}


### 什么是差异算法?
React 需要使用算法来了解如何有效地更新 UI 以匹配最新的树。差异算法将生成将一棵树转换为另一棵树的最小操作次数。然而，算法具有 O(n3) 的复杂度，其中 n 是树中元素的数量。在这种情况下，对于显示 1000 个元素将需要大约 10 亿个比较。这太昂贵了。相反，React 基于两个假设实现了一个复杂度为 O(n) 的算法：

两种不同类型的元素会产生不同的树结构。
开发者可以通过一个 key 属性，标识哪些子元素可以在不同渲染中保持稳定。

差异算法涵盖了哪些规则?
在区分两棵树时，React 首先比较两个根元素。根据根元素的类型，行为会有所不同。它在重构算法中涵盖了以下规则：

不同类型的元素： 每当根元素具有不同的类型时，React 将移除旧树并从头开始构建新树。例如，元素 到 ，或从

到 的不同类型的元素引导完全重建。
相同类型的DOM元素： 当比较两个相同类型的 React DOM 元素时，React 查看两者的属性，保持相同的底层 DOM 节点，并仅更新已更改的属性。让我们以相同的 DOM 元素为例，除了 className 属性，

<div className="show" title="ReactJS" />

<div className="hide" title="ReactJS" />
相同类型的组件元素：

当组件更新时，实例保持不变，以便在渲染之间保持状态。React 更新底层组件实例的 props 以匹配新元素，并在底层实例上调用 componentWillReceiveProps() 和 componentWillUpdate()。之后，调用 render() 方法，diff 算法对前一个结果和新结果进行递归。

递归子节点： 当对 DOM 节点的子节点进行递归时，React 会同时迭代两个子节点列表，并在出现差异时生成变异。例如，在子节点末尾添加元素时，在这两个树之间进行转换效果很好。
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
处理 Key：

React支持 key 属性。当子节点有 key 时，React 使用 key 将原始树中的子节点与后续树中的子节点相匹配。例如，添加 key 可以使树有效地转换，

<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>


### 你什么时候需要使用 refs?
这里是 refs 的一些使用场景：

管理聚焦、文本选择或媒体播放。
触发命令式动画。
与第三方 DOM 库集成。


### 如何使用 React Hooks 获取数据?
名为 useEffect 的 effect hook 可用于使用 axios 从 API 中获取数据，并使用 useState 钩子提供的更新函数设置组件本地状态中的数据。让我们举一个例子，它从 API 中获取 react 文章列表。

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=react',
    );

    setData(result.data);
  }, []);

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
记住，我们为 effect hook 提供了一个空数组作为第二个参数，以避免在组件更新时再次激活它，它只会在组件挂载时被执行。比如，示例中仅在组件挂载时获取数据。

### Hooks 是否涵盖了类的所有用例?
Hooks 并没有涵盖类的所有用例，但是有计划很快添加它们。目前，还没有与不常见的 getSnapshotBeforeUpdate 和componentDidCatch 生命周期等效的钩子。



### 千分位

var str = '10000000000'
var arr =[]
for(var i=0; i<Math.round(str.length/3); i++) {
    //Math.round 向下取整
    arr.push(str.substring(str.length-3*(i+1), str.length-3*i))
}

arr.reverse();
arr.join('.')

没三位三位截取


法二

var num = Number('10000000000')
var num2 = num.toLocalString()
转换成 10,000,000,000

var num3 = num2.replace('/,/g,'.');
10.000.000.000


### 闭包

for(var i=0; i<5; i++) {
    setTimeout(function timer() {
        console.log(i)
    })
}

输出 55555

for(var i=0;i<5;i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i)
        })
    })(i)
}

输出 0 1 2 3 4

for(let i=0; i<5; i++) {
    setTimeout(()=> {
        console.log(i)
    },1000)
}

输出 0 1 2 3 4


### 费波纳茨  Fibonacci   剑指offer 1
F(n)=F(n-1)+F(n-2);

f0=0
f1=1
f2=f0+f1
先声明 f=[0,1] 初始f0 f1

for(let i=2; i<n;i++) {
    f[i]=f[i-1]+f[i-2];
}
可获得f[2]的值  
return f[n] 就得到当前n的值

输出f(n)

function Fibonacci(n)
{
    var f = [0, 1];
    for(let i = 2; i <= n; i++) {
        f[i] = f[i - 1] + f[i - 2];
    }
    return f[n];
}


### 剑指offer2   TopK问题

有一个整数数组，请你根据快速排序的思路，找出数组中第K大的数。

给定一个整数数组a,同时给定它的大小n和要找的K(K在1到n之间)，请返回第K大的数，保证答案存在。

测试样例：
[1,3,5,2,2],5,3
返回：2


#### 请讲一下图片的懒加载和预加载不同点，他们的本质是什么？这两种技术对于服务器前段的影响各是什么？
懒加载 延迟加载 甚至不加载 减缓服务器端压力
预加载 提前加载 图片渲染还存在本地 用户直接可以看 加大服务器端压力

### 请你讲一下，实现js中所有对象的深度克隆（包装对象，Date对象，正则对象）的方法是什么，特点是什么？

function DeepClone ()  {
    if(obj === null) {
        return obj;
    }
    if(typeof obj !== 'Object') {
        return obj;
    }

    if(obj instanceof Date) {
        return new Date(obj)
    }

    if(obj instanceof RegExp) {
        return new RegExp(obj)
    }

    let newObj = new obj.constructor
    for(let key in obj) {
        newObj[key] = DeepClone(obj[key])
    }
    return newObj;
}