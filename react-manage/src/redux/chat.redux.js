import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:1314')

// 获取聊天天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'
// 接受
// const MSG_RECV = 'MSG_RECV'

const initState={
    // 所有聊天信息
    chatmsg:[],
    // 未读信息
    unread:0
}
export function chat(state=initState,action) {
    switch(action.type) {
        case MSG_LIST:
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length}
        case MSG_RECV:
            return {...state,chatmsg:[...state.chatmsg,action.payload]}
        // case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs) {
    return {type:MSG_LIST,payload:msgs}
}
function msgRecv(msg) {
    return {type:MSG_RECV,payload:msg}
}
// recvmsg
export function recvMsg() {
    return dispatch=>{
        socket.on('recvmsg',function(data) {
            dispatch(msgRecv(data))
        })
    }
}
// sendmsg
export function sendMsg(from,to,msg) {
    // 发送给后端
  return dispatch=>{
    socket.emit('sendmsg',{from,to,msg})
  }
}
// redmsg
export function getMsgList() {
    return dispatch=>{
        axios.get('/user/getmsgList').then(res=>{
            if(res.status===200 && res.data.code===0) {
                dispatch(msgList(res.data.msgs))
            }
        })
    }
}