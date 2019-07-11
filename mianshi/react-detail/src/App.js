import React from 'react';
import {connect} from 'react-redux';
// 连接
import {addGun,removeGun,addGunAsync,removeGunAsync} from './index.redux';
import {Button} from 'antd-mobile';
import '../node_modules/antd-mobile/dist/antd-mobile.css';

// 父组件
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    // 通过属性传递进来
    // const store = this.props.store
    // const num = store.getState()
    // const num = this.props.num
    // const addGun = this.props.addGun
    // const removeGun = this.props.removeGun
    // const addGunAsync = this.props.addGunAsync
    // const removeGunAsync = this.props.removeGunAsync
    return (
      <div>
        <h2>现在是2019演员颁奖大会,演员{this.props.num}</h2>
        <Button onClick={this.props.addGun}>添加演员</Button>
        <Button onClick={this.props.removeGun}>演员</Button>
        <Button onClick={this.props.addGunAsync}>添加</Button>
        <Button onClick={this.props.removeGunAsync}>减少</Button>
      </div>
    )
  }
}

// 高阶组件
const mapStatetoProps=(state)=> {
  return {num:state}
}
const actionCreators = {addGun,removeGun,addGunAsync,removeGunAsync}
// 先执行装饰器模式
App = connect(mapStatetoProps, actionCreators)(App)
export default App;
