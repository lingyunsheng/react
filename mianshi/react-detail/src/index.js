import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { counter } from './index.redux';

const store = createStore(counter, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension():f=>{}
))


// // 渲染页面用的
// function render() {
// 	// 渲染dispatch
// 	ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync} removeGunAsync={removeGunAsync} />, document.getElementById('root'));
// }
// render()

// // 状态改变监听
// store.subscribe(render)

ReactDOM.render(
	(<Provider store={store}>
		<App/>
	</Provider>)
, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
