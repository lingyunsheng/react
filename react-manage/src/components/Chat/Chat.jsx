import React from 'react';
import { List, InputItem } from 'antd-mobile';
import './chat.styl';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';
import io from 'socket.io-client';
const socket = io('ws://localhost:1314')
// 发起连接   // 连接socket 跨域请求

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg:[]
        }
    }
    componentDidMount() {
        //  接受消息
        // socket.on('recvmsg', (data)=>{
        //     // console.log(data)
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        this.props.getMsgList()
        this.props.recvMsg()

    }
    handleSubmit() {
        // 发送事件
        // socket.emit('sendmsg', { text: this.state.text })
        // console.log(this.state)
        // this.setState({ text: '' })

        // 发送
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from,to,msg)
        this.setState({text:''})

    }
    render() {
        console.log(this.props)
        return (
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}>
                            {/* 不需要传v 输入值在state */}
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat;