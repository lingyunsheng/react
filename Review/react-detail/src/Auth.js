import React from 'react';
import {connect} from 'react-redux';
import {login} from './Auth.redux';
import {Redirect} from 'react-router-dom';
import {Button} from 'antd-mobile';
// 页面一个reducers 每个reducers都有一个state
// 合并reducers
@connect(
    state=>state.auth,
    {login}
)
class Auth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/* 拿到用户登录信息 */}
                {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
                <h2>你没有权限，你需要登陆后才能使用</h2>
                <Button onClick={this.props.login}>登录</Button>
            </div>
        )
    }
}
export default Auth;