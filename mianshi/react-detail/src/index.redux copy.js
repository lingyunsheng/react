
const ADD_GUN = '加演员'
const REMOVE_GUN = '减演员'
// reducer
export function counter(state = 10, action) {
    // 管理状态
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case REMOVE_GUN:
            return state - 1
        default:
            return state
    }
}

export function addGun() {
    return { type: ADD_GUN }
}
export function removeGun() {
    return { type: REMOVE_GUN }
}
export function addGunAsync() {
    // 异步
    return dispatch=>{
        setTimeout(()=> {
            dispatch(addGun())
            console.log('添加了')
        },2000)
        
    }
}
export function removeGunAsync() {
    return dispatch=>{
        setTimeout(()=> {
            dispatch(removeGun())
            console.log('减少了')
        },2000)
    }
}