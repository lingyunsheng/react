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

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => { }
))
console.log(store.getState())
function Boss() {
	return <h2>boss</h2>
}
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				{/* 检测路由是否ok */}
				<AuthRoute></AuthRoute>
				<Route path='/bossinfo' component={BossInfo}></Route>
				<Route path='/geniusinfo' component={GeniusInfo}></Route>
				<Route path='/boss' component={Boss}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
			</div>
			<App />
		</BrowserRouter>

	</Provider>)
	, document.getElementById('root')
);

serviceWorker.unregister();
