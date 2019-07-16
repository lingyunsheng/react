import React from 'react';
// 前后端联调
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../UserCard/UserCard';
@connect(
    state => state.chatuser,
    { getUserList }
)
class Genius extends React.Component {

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
        this.props.getUserList('boss')
    }
    render() {
        return (
            <div>
                {/* 定义新组件 */}
                <UserCard userlist={this.props.userlist}></UserCard>
            </div >
        )
    }
}
export default Genius;