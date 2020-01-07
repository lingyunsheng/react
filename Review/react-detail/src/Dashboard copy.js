import React from 'react';
import {Route,Link,Redirect} from 'react-router-dom';
import App from './App';
import {connect} from 'react-redux';
import {logout} from './Auth.redux';
import {Button} from 'antd-mobile';
function Home() {
    return <h2>Home</h2>
}
function Pass() {
    return <h2>Pass</h2>
}
@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component {
 
    constructor(props) {
        super(props);
    }
    render() {
        // console.log(this.props)
        const match =this.props.match
        console.log(match)
        const redirectToLogin =<Redirect to='/login'></Redirect>
        const app =(
            <div>
                <h1>演员的诞生</h1>
                {this.props.logout ? <Button onClick={this.props.logout}>注销</Button>:null }
                	<ul>
					<li>
						<Link to={`${match.url}/}`}>Frist</Link>
					</li>
					<li>
						<Link to={`${match.url}/home`}>home</Link>
					</li>
					<li>
						<Link to={`${match.url}/pass`}>pass</Link>
					</li>
				</ul>
                <Route path={`${match.url}/`} exact component={App}></Route>
                <Route path={`${match.url}/home`} component={Home}></Route>
                <Route path={`${match.url}/pass`} component={Pass}></Route>
            </div>

        )
        return this.props.isAuth ? app: redirectToLogin
    }
}
export default Dashboard;