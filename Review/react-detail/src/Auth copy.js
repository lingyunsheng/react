import React from 'react';
import {connect} from 'react-redux';
import {login,getUserData} from './Auth.redux';
import {Redirect} from 'react-router-dom';
import {Button} from 'antd-mobile';
import axios from 'axios';
// 页面一个reducers 每个reducers都有一个state
// 合并reducers
@connect(
    state=>state.auth,
    {login,getUserData}
)
class Auth extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state={
    //         data:{}
    //     }
    // }
    componentDidMount() {
        // 返回的是promise
        // axios.get('/data').then(res=>{
        //     if (res.status ===200) {
        //         this.setState({data:res.data})
        //     }
        //     console.log(res)
        // })
        this.props.getUserData()
    }
    render() {
        return (
            <div>
                <h2>欢迎登录{this.props.user}年龄{this.props.age}</h2>
                {/* 拿到用户登录信息 */}
                {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
                <h2>你没有权限，你需要登陆后才能使用</h2>
                <Button onClick={this.props.login}>登录</Button>
            </div>
        )
    }
}
export default Auth;