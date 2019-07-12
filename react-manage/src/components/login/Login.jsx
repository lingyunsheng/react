import React from 'react';
import Logo from '../logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.register = this.register.bind(this)
    }
    register() {
        console.log(this.props)
        // 路由跳转
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                <Logo/>
                {/* <h2>登录页</h2> */}
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;