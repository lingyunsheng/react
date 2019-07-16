import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserList} from '../../redux/chatuser.redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
@connect(
    state=>state.chatuser,
    {getUserList}
)

class UserCard extends React.Component{

    static propTypes = {
		userlist: PropTypes.array.isRequired
	}
    render(){
        console.log(this.state)
        // card.header
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>
                       <WhiteSpace></WhiteSpace>
                <WingBlank>
                    {/* 直接渲染card */}
                    {/* this.state.data */}
                    {this.props.userlist.map(v => (
                        v.avatar ? (<Card key={v._id}>
                            <Header title={v.user} thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}>

                            </Header>
                            <Body>
                                {v.type==='boss' ? <div>公司:{v.company}</div>:null}
                                {/* 信息换行 */}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                            </Body>
                        </Card>) : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}
export default UserCard;