// {}
import * as ActionType from './actionTypes';
// 创建 action: 
export function showplayer(showStatus) {
    // 逻辑
    return { type: ActionType.SHOW_PLAYER, showStatus}
}
export function changeSong(song) {
    return { type: ActionType.CHANGE_SONG, song }
}
/**
 * redux 放对象
 * dispatch({type: '', song: {}})
 * dispatch(changeSong(song))
 */