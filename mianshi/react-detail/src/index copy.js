import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { counter } from './index.redux';
import reducers from './reducer';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => { }
))
console.log(store.getState())
// // 渲染页面用的
// function render() {
// 	// 渲染dispatch
// 	ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync} removeGunAsync={removeGunAsync} />, document.getElementById('root'));
// }
// render()

// // 状态改变监听
// store.subscribe(render)

// 登录页面 没有登录信息 同意跳转login
// 页面 导航+显示+注销
// frist home pass  权限校验
// router+redux
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<Switch>
				{/* 只渲染第一个route */}
				<Route path='/login' component={Auth}></Route>
				<Route path='/dashboard' component={Dashboard}></Route>
				<Redirect to='/dashboard'></Redirect>
			</Switch>
			<App />
		</BrowserRouter>

	</Provider>)
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
