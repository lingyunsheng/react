import React, { useState } from 'react'
import { Table } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import './index.css'

import './box.css'

moment.locale('zh-cn')
/**
 * [
 *  super:{account:"qinsheng.wang"}{account:"hailong.zhang"},
 * admin:{account:"qinsheng.wang"}{account:"hailong.zhang"},
 * ]
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalIsOpen: 'none',
      modalOpen: 'none',
    }
  }

  handleMouseEnter = () => {
    this.setState({
      visible: true,
      modalIsOpen: 'block',
      modalOpen: 'block'
    })
  }

  handleMouseLeave = () => {
    this.setState({
      visible: 'false',
      modalIsOpen: 'none',
      modalOpen: 'none'
    })
  }

  render() {
    console.log(this.state.modalIsOpen, this.state.visible)

    // 判断值是否存在函数
  function isBlank (val) {
    if (val == null || val == "") {
      return true;
    }
  }
  let json = [[1,2,3,4,5,6], [2,4,6,7,8,9], [0,1,2,3,4,6]]; //也可以使用数组形式，自行替换测试看结果
  // 保存结果的数组
  let result = []; 
  // 遍历json
  for (let key in json) {
    // 遍历数组的每一项
    json[key].forEach((value, index) => {
      if (isBlank(result[index])) {
        result[index] = 0 ;
      }
      result[index] += value ;  
    })  
  }
  // 打印结果
  console.log(result);  // [4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0]
    const arr = [
      [1, 2, 3, 4, 5, 6],
      [2, 4, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 6]
    ]
    // let result =[]
    // function isBlank(val) {
    //   if(val === null || val === "") {
    //     return true
    //   }
    // }
    // for(let key in arr) {
    //   arr[key].forEach((value, index) => {
    //     if(isBlank(result[index])) {
    //       result[index] = 0
    //     }
    //     else {
    //       result[index] += value
    //     }
    //   })
    // }
    // console.log('result',result)
    // console.log('obj',obj)
    // console.log('resulut',result)
    let sum = arr.map(i => i.reduce((total,value, index, arr) => total+value))
    console.log('sum', sum)
    return (
      <div>
        <div className="box" style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="box1"
            style={{ width: '400px', height: '200px', background: '#e5e5e5', display: 'flex', marginLeft: '20px' }}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <div style={{ flex: '3', padding: '10px 20px' }}>
              <p>我的</p>
              <p>个人中心</p>
            </div>
            <div style={{ flex: '2', padding: '10px 20px', display: this.state.modalIsOpen }}>
              <p>你的</p>
            </div>
          </div>
          <div className="box1"
            style={{ width: '400px', height: '200px', background: '#e5e5e5', display: 'flex', marginLeft: '20px' }}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <div style={{ flex: '3', padding: '10px 20px' }}>
              <p>我的</p>
              <p>个人中心</p>
            </div>
            <div style={{ flex: '2', padding: '10px 20px', display: this.state.modalOpen }}>
              <p>我的</p>
            </div>
          </div>
        </div>
        <div>
          {arr}<br />
          {/* {aa} */}

        </div>
      </div>
    )
  }
}

export default App;