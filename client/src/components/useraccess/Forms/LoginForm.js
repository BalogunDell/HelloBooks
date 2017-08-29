import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import toastr from 'toastr';
import 'jquery';

import PasswordResetModal from './PasswordResetModal';

/**
 * @class LoginForm
 * @classdesc returns login form
 */
class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  } 

  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  // modal method
  showModal() {
    console.log($('.forgotPass'));
    $('#modal-link').modal('open');
  }

  componentDidMount() {
     $('.modal').modal({
      dismissible: false
    }); 
  }

  handleLogin(event) {
    event.preventDefault();
    
    if(this.state.username === '') {
      toastr.error('username cannot be empty');
    } else if(/\d+/gi.test(this.state.username)) { 
      toastr.error('invalid username'); 
    } else {
      localStorage.setItem('token', `${this.state.username},${this.state.password}`);
      <Redirect to="/user"/>
    }
  }

  render() {
    return(
<div className="col row">
  <div className="col s12 m6 offset-m3 valing-wrapper">
    <div className="form-holder">

    {/* form headers  */}
      <div className="form-header">
        <h2>Signin</h2>
        <div>
          <p>Not registered? <Link to="/register">Signup</Link></p>
        </div>
      </div>

    {/* form header ends  */}
      <div>
        <form className="user-form" onSubmit={this.handleLogin}>
          {/* Username input  */}
          <div className="row">
            <div className="input-field s12">
              <label>Username <span>*</span></label>
              <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleInput}/>
            </div>
          </div>
          

          {/* Password input  */}
          <div className="row">
            <div className="input-field s12">
              <label htmlFor="Password">Password<span>*</span></label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInput}/>
            </div>  
              <span className="button forgotPass modal-trigger" onClick={this.showModal}>Forgot password</span> 
          </div>
          
          {/* Signin button  */}
          <div className="row">
            <div>
              <input type="submit" className="btn waves-effect waves-teal" id="regBtn" value="Signin"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <PasswordResetModal/>
 </div>
    );
  }

}

export default LoginForm;