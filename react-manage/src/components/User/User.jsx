import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
@connect(
    state => state.user,
    {logoutSubmit}
)


class User extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }
    logout() {
        // 清楚cookies 退出登录
        // browserCookie.erase('userid')
        // window.location.href=window.location.href
        const alert = Modal.alert

        alert('注销', '确认退出吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定', onPress: () => {
                    browserCookie.erase('userid')
                    // 也可以不手动刷新
                    // window.location.href = window.location.href
                    this.props.logoutSubmit()
                }
            },
        ])

    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        // console.log(this.props)
        return props.user ? (
            
            <div>
                <Result
                    // img={<img src={require(`../img/boy.png`)} alt=""/>}
                    img={<img style={{ width: 50 }} src={require(`../img/${this.props.avatar}.png`)} alt="" />}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company : null}>
                </Result>
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {/* 变灰 */}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}

                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>
                        退出登录
                    </Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}
export default User;