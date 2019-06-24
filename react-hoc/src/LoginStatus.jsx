import React ,{Component} from 'react';
import withLogin from './WithLogin';

@withLogin
class LoginStatus extends Component{
    render(){
        return (
           <button>已经登录</button>
        )
    }
}
LoginStatus.displayName = 'displayName';
export default LoginStatus;