import React from 'react';
import Logo from '../logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import Form from '../Form/Form';
import './register.styl';
@connect(
    state => state.user,
    { register }
)
@Form
class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     // 设置用户输入的
        //     user: '',
        //     pwd: '',
        //     rpwd: '',
        //     type: 'genius'
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        this.props.handleChange('type','genius')
    }
    // handleChange(key, val) {
    //     this.setState({
    //         // 加中括号
    //         [key]: val
    //     })
    // }
    handleRegister() {
        this.props.register(this.props.state)
        console.log(this.props.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {/* 根据相对应的跳转 */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                {/* <h2>注册页</h2> */}
                <List>
                    {/* 报错信息 */}
                    <p className="erroMsg">{this.props.msg ? this.props.msg : null}</p>
                    {/* 指定key */}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>

                    <InputItem onChange={v => this.props.handleChange('pwd', v)} type="password">密码</InputItem>

                    <InputItem onChange={v => this.props.handleChange('rpwd', v)} type="password">确认密码</InputItem>

                    <RadioItem checked={this.props.state.type === 'genius'}
                        onChange={() => this.props.handleChange('type', 'genius')}>
                        个人
                    </RadioItem>

                    <RadioItem checked={this.props.state.type === 'boss'}
                        onChange={() => this.props.handleChange('type', 'boss')}>
                        企业
                    </RadioItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
                <footer className="ft">
                    <p className="text">注册即代表阅读并同意
                    <a href="#">服务条款</a></p>
                </footer>
            </div>
        )
    }
}
export default Register;