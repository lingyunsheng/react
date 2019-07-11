import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { counter } from './index.redux';

const store = createStore(counter, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => { }
))

function Home() {
	return <h2>Home</h2>
}
function Pass() {
	return <h2>Pass</h2>
}

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
		<BrowserRouter>
			<div>

				<ul>
					<li>
						<Link to='/'>Frist</Link>
					</li>
					<li>
						<Link to='/home'>home</Link>
					</li>
					<li>
						<Link to='/pass'>pass</Link>
					</li>
				</ul>
				<Route path='/' exact component={App}></Route>
				<Route path='/home' component={Home}></Route>
				<Route path='/pass' component={Pass}></Route>
			</div>

			<App />
		</BrowserRouter>

	</Provider>)
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
