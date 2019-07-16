import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import NavLinkBar from '../NavLinkBar/NavLinkBar';
import Boss from '../../components/Boss/Boss';
import Genius from '../../components/Genius/Genius';
import Msg from '../../components/Msg/Msg';
import User from '../../components/User/User';
import './dashboard.styl';
@connect(state => state)
class Dashboard extends React.Component {
    render() {
        // 定义整体的导航栏
        // 路径
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
        return (
            <div>
            {/* {navList.find(v => v.path === pathname).title} */}
                <NavBar mode='dark' className='fixd-header'>{navList.find(v=>v.path===pathname).title}</NavBar>
                {/* 吸顶 */}
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                               <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard;