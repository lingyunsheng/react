import React from 'react';

// 父组件
class App extends React.Component {
  render() {
    const boss = '杨幂'
    return (
      <div>
        <h2>独立团, 演员{boss}</h2>
        <Yiying name="zly"></Yiying>
        <Erying name="lyf"></Erying>
      </div>
    )
  }
}
// 函数式组件 不需要this
function Erying(props) {

  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )



}
// 子组件 this.props.key 获取父组件的值 进行传递
class Yiying extends React.Component {
  constructor(props) {
    super(props)
    //  初始化状态
    this.state = {
      actors: ['李易峰', '吴亦凡', '鹿晗']
    }
    // 强制绑定this指向
    // this.addActor = this.addActor.bind(this)
  }
  componentWillMount() {
    console.log('组件马上加载初次渲染前')
  }
  componentDidMount() {
    console.log('组件加载初完毕')
  }
  addActor=()=> {
    console.log('你好，演员')
    // this指向
    this.setState({
      actors: [...this.state.actors, '肖战' + Math.random()]
    })
  }
  render() {
    console.log('组件正在加载了')
    return (
      <div>
        <h2>二级演员, 演员{this.props.name}</h2>
        {/* 箭头函数的形式 */}
        <button onClick={this.addActor}>演员爱豆</button>
        {/* 渲染state列表 */}
        <ul>
          {/* 列表循环时 需要设置key */}
          {this.state.actors.map(v => {
            return <li key={v}>{v}</li>
          })}
        </ul>

      </div>
    )
  }
}
export default App;
