import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import './chat.styl';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';
import io from 'socket.io-client';
const socket = io('ws://localhost:1314')
// 发起连接   // 连接socket 跨域请求

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
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
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }



    }
    // 修正跑马灯
    fixCarousel() {
        setTimeout(function () {
            // 延迟派发
            window.dispatchEvent(new Event('resize'))
        }, 0)
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
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '' })

    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))
        // console.log(this.props)
        const userid = this.props.match.params.user
        const Item = List.Item
        // userid
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        // 聊天信息
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid = chatid)
        return (
            <div id="chat-page">
                <NavBar mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        //   history 对象的方法
                        this.props.history.goBack()
                    }}>
                    {/* 用户列表 */}
                    {/* {this.props.match.params.userid} */}
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    // const avatar = require(`../img/${users[v.from].avatar}.png`)
                    // thumb={avatar}
                    // extra={<img src={avatar} />}
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item >{v.content}</Item>
                        </List>
                    ) : (
                            <List key={v._id}>
                                <Item className='chat-me'>{v.content}</Item>
                            </List>
                        )
                    // return <p key={v._id}>{v.content}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={
                                <div>
                                    <span style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: true
                                            })
                                            this.fixCarousel()
                                        }}>😀</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }>
                            {/* 不需要传v 输入值在state */}
                        </InputItem>
                    </List>
                    {this.state.showEmoji ?
                        <Grid data={emoji} columnNum={9}
                            carouselMaxRow={4} isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                                console.log(el)
                            }}
                        ></Grid> : null}
                </div>
            </div>
        )
    }
}
export default Chat;