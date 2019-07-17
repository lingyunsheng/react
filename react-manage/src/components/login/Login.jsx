import React from 'react';
import Logo from '../logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/user.redux';
import Form from '../Form/Form';
import '../register/register.styl';

// function WrapperHello(Comp) {

//     class WrapComp extends React.Component{
//         render() {
//             return (
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//                 // 属性代理 可以加属性
//             )
//         }
//     }
//     return WrapComp
// }
// @WrapperHello
// class Hello extends React.Component{
//     render()  {
//         return (
//             <div>
//                 <h2>i am mooc</h2>
//             </div>
//         )
//     }
// }
// Hello=WrapperHello(Hello)
@connect(
    state=>state.user,
    {login}
)
@Form
class Login extends React.Component{
    constructor(props) {
        super(props);
        // this.state={
        //     user:'',
        //     pwd:''
        // }
        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
    }
    // handleChange(key, val) {
    //     this.setState({
    //         // 加中括号
    //         [key]: val
    //     })
    // }
    handleLogin() {
        // this.props.login(this.state)
        this.props.login(this.props.state)
    }
    register() {
        console.log(this.props)
        // 路由跳转
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                {/* <Hello></Hello> */}
                  {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo/>
                {/* <h2>登录页</h2> */}
                <WingBlank>
                    <List>
                    <p className="erroMsg">{this.props.msg ? this.props.msg : null}</p>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem onChange={v => this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;