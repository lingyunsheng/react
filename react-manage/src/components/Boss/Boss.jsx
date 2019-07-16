import React from 'react';
// 前后端联调
import axios from 'axios';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../UserCard/UserCard';
// import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         data:[]
    //     }
    // }
    componentDidMount() {
        // 获取用户信息
        // axios.get('/user/list?type=genius').then(res => {
        //     if (res.data.code === 0) {
        //         // 渲染用户列表
        //         this.setState({
        //             data: res.data.data
        //         })
        //     }
        // })
        this.props.getUserList('genius')
    }
    render() {
        console.log(this.state)
        // card.header
        // const Header = Card.Header
        // const Body = Card.Body
        return (
            <div>
               <UserCard userlist={this.props.userlist}></UserCard>
            </div>
        )
    }
}
export default Boss;