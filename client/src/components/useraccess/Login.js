import React from 'react';
import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';

/**
 * @class Register
 * @classdesc returns the component for user signin
 */
class Login extends React.Component {
  render() {
    return(
      <div>
        {/* This div holds the navbar component  */}
        <div className="home-bg">
          <Navbar/>
            <LoginForm/> 
        </div>
      </div>
    );
  }
}

export default Login;
