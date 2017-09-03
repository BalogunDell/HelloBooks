import React from 'react';
import { Link } from 'react-router-dom';
import 'jquery';
import Proptypes from 'prop-types';

import PasswordResetModal from './PasswordResetModal';

/**
 * @class LoginForm
 * @classdesc returns login form
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.initialUsername,
      password: '',
      redirectUser: props.authenticate
    }

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

  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    return(
<div className="user-login-form">
  <div className="col s12 m6 offset-m3 valing-wrapper">
    <div className="form-holder">

    {/* form headers  */}
      <div className="form-header">
        <h2>Signin</h2>
        <div>
          <p>Not registered? <Link to="/register">Signup</Link></p>
        </div>
      </div>
      <p>{this.state.status}</p>
    {/* form header ends  */}
      <div>
        <form className="user-form" onSubmit={this.props.loginHandler.bind(this)}>
          {/* Username input  */}
          <div className="row">
            <div className="input-field s12">
              <label>Username <span>*</span></label>
              <input type="text" id="username" name="username" 
              value={this.state.username} 
              onChange={(event) => this.handleInput(event)} />
            </div>
          </div>
          

          {/* Password input  */}
          <div className="row">
            <div className="input-field s12">
              <label htmlFor="Password">Password<span>*</span></label>
              <input type="password" id="password" name="password"/>
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

LoginForm.propTypes = {
  loginHandler:React.PropTypes.func,
  inputHandler:React.PropTypes.func,
  initialUsername:React.PropTypes.string
}

export default LoginForm;