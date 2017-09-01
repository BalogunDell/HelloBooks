import React from 'react';
import Navbar from '../navbar/Navbar';
import LoginForm from './Forms/LoginForm';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Background from '../Background/Background';
/**
 * @class Register
 * @classdesc returns the component for user signin
 */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      status: false
      // authenticated: false
    }
    // this.handleAuth = this.bind(this);
 }


  handleLogin(event) {
    event.preventDefault();
    if(this.state.username =='') {
      toastr.error('user name cannot be empty');
    } else {
      {this.loginBtn}
    }
  }

  render() {
    const loginBtn = () => {
      <Redirect to="/user"/>
    }
    return(
      <div>
        {/* This div holds the navbar component  */}
          <Background>
          <Navbar/>
          <LoginForm loginHandler={this.handleLogin} 
                     initialUsername = { this.state.username}
                     initialPassword= {this.state.password}
                     authenticate = {this.state.status}/> 
          </Background>
      </div>
    );
  }
}

export default Login;
