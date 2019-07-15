import React from 'react';
import axios from 'axios';
import  {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';
@withRouter
@connect (
    // state=>state,
    state=>state.user,
    {loadData}
)
class AuthRoute extends React.Component{
    // 获取用户信息
    // 是否登录
    // 现在的url地址 login不需要跳转
    // 用户的type 身份是boss 还是个人
    // 用户是否完善信息 (选择头像 个人简介)
    componentDidMount() {
        const publicList = ['/login','register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)> -1) {
            return null
        }
        axios.get('/user/info').then(res=> {
            if(res.status === 200) {
                if(res.data.code ===0) {
                    // 有登录信息
                    this.props.loadData(res.data.data)
                }else {
                    // console.log(this.props.history)
                 
                    this.props.history.push('/login')
                }
                // console.log(res.data)
            }
        })
    }
    render(){
        return(
            <div>
            </div>
        )
    }
}
export default AuthRoute;