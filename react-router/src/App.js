import React from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect} from 'react-router-dom';

import './App.css';
function Post(){
  return (
    <div>Post</div>
  )
}
function Login() {
  return(
    <div>Login</div>
  )
  
}
function Protect(){
  return (
    <div>Protect</div>
  )
}
function User(){
  return(
    <div>User</div>
  )
}
function About() {
  return (
    <div>About</div>
  )
}
function Index() {
  return (
    <div>Home</div>
  )
}
/**
 * 进入页面之前  鉴权
 * <PrivateRoute path="/user" component={}/>
 */
function PrivateRoute(props){
  const {path, component:Component}=props;
  return(
    <Route path={path} render={
      ()=>{
        return true ? <Component/>:
        <Redirect to={{
          pathname:"/login"
        }}></Redirect>
      }
    }>

    </Route>
  )

}
function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/protect">protect page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      {true ?
        <Route path="/" exact component={Index}>
        </Route> : <div>no router</div>
      }
      <Route path="/about" component={About}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/post" component={Post}></Route>
      <PrivateRoute path="/user" component={User}>  </PrivateRoute>
      <Route path="/protect" render={()=>{
       return true ? 
       <Protect/>:
       <Redirect to={{
          pathname:'/login',
          state:{from:'/protect'}
        }}/>
      }}> </Route>
     
    </Router>
  );
}

export default App;
