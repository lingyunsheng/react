// 合并所有的reducer 并且返回
import {combineReducers} from 'redux';
import {counter} from './index.redux';
import {auth} from './Auth.redux';

const reducers= combineReducers({counter,auth});
export default reducers;