import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../NavLinkBar/NavLinkBar';
@connect(state => state.user)
class Boss extends React.Component {
}
class Genius extends React.Component {

}
class Msg extends React.Component {
}
class User extends React.Component {

}
class Dashboard extends React.Component {
    render() {
        // 定义整体的导航栏
        // 路径
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                // hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                // hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        return (
            <div>

                <NavBar mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
                <NavLinkBar></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard;