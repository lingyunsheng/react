import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
import AuthRoute from './components/AuthRoute/AuthRoute';
import BossInfo from './components/BossInfo/BossInfo';
import GeniusInfo from './components/GeniusInfo/GeniusInfo';
import Dashboard from './components/Dashboard/Dashboard';
import  Chat from './components/Chat/Chat';
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => { }
))
console.log(store.getState())
// function Boss() {
// 	return <h2>boss</h2>
// }
// function Dashboard() {
// 	return <h2>Dashboard</h2>
// }
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				{/* 检测路由是否ok */}
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
					{/* 相同的部分 */}
					<Route component={Dashboard}></Route>
				</Switch>

			</div>
			<App />
		</BrowserRouter>

	</Provider>)
	, document.getElementById('root')
);

serviceWorker.unregister();
