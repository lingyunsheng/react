import React from 'react';
import LoginStatus from './LoginStatus';
import ExampleMobx from './exampleMobx/index';
import ShopCart from './ShopCart';
import withLogin from './WithLogin';
import examplebase from './examplebase/index';
import './App.css';


// const WithLoginStatus = withLogin(LoginStatus);
// const WithShopCart = withLogin(ShopCart);
function App() {
  return (
    // 专门把所有抱起来或者 <> </> 只有登陆才能看见，
    <React.Fragment>
      <LoginStatus />
      <ShopCart />
      {/* <WithLoginStatus />
      <WithShopCart a="1" b="2"/> */}
      <ExampleMobx />
    </React.Fragment>
  )
};

export default App;