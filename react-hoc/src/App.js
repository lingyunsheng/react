import React from 'react';
import LoginStatus from './LoginStatus';
import ShopCart from './ShopCart';
// import WithLogin from './WithLogin';
import './App.css';
import withLogin from './WithLogin';

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
    </React.Fragment>
  )
};

export default App;