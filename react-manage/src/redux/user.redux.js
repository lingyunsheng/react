// user.redux.js
import axios from 'axios';  // 用axios做请求
import { getRedirectPath } from '../util';
// 定义常量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS' // 注册成功
const TODO_ERRSHOW = 'TODO_ERRSHOW'// 操作失败
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
// state初始值
let initState = {
    redirectTo: '', // 完成之后跳到哪里
    user: '', // 账号
    pwd: '', // 密码
    rpwd: '', // 确认密码
    type: '', // 用户类型
    msg: '', // 错误消息
    isAuth: false // 是否登录
}

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { ...state, ...action.payload, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true }
        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true }
        case LOAD_DATA:
            return {...state,...action.payload}
        case TODO_ERRSHOW:
            return { ...state, msg: action.msg, isAuth: false }
        default:
            return state;
    }
}

function registerFail(msg) {
    return {
        msg,
        type: TODO_ERRSHOW
    }
}

function registerSuccess(data) {
    return {
        
        type: REGISTER_SUCCESS,
        payload:data
    }
}
function loginSuccess(data) {
    return {

        type: LOGIN_SUCCESS,
        payload:data
    }
}
export function userinfo() {
    // 获取用户信息
    return dispatch=>{
        axios.get('/user/info').then(res=> {
            if(res.status === 200) {
                if(res.data.code ===0) {
                    // 有登录信息
                }else {
                    console.log(this.props.history)
                    this.props.history.push('/login')
                }
                console.log(res.data)
            }
        })
    }
}
export function loadData(userifo) {
    console.log(loadData)
    return {type:LOAD_DATA,payload:userinfo}
}
export function login({ user, pwd }) {
    if (!user || !pwd) {
        registerFail('账号密码不能为空')
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(registerFail(res.data.msg))
                }
            })
    }
}
// register是一个action creator ，返回的action供user这个reducer使用，从而改变state
export function register({ user, pwd, rpwd, type }) {
    if (!user || !pwd) {
        registerFail('账号密码不能为空')
    }
    if (pwd !== rpwd) {
        registerFail('两次密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                } else {
                    dispatch(registerFail(res.data.msg))
                }
            })
    }
}