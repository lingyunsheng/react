import axios from 'axios';
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const initState ={
    isAuth:false,
    user:'杨幂',
    age:26
}
const USER_DATA = 'USER_DATA'
export function auth(state={initState},action) {
    switch(action.type) {
        case LOGIN:
            return {...state, isAuth:true}
        case LOGOUT:
            return {...state, isAuth:false}
        case USER_DATA:
            return {...state,user:action.payload.user,age:action.payload.age}
        default:
            return state
    }
}
// 异步处理
export function getUserData() {
    // dispatch通知
    return dispatch=>{
        axios.get('/data').then(res=>{
            if (res.status ===200) {
                dispatch(userData(res.data))
               
            }
            console.log(res)
        })
    }
}
export function userData(data) {
    return {type:USER_DATA,payload:data}
}
// action 生成login
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}