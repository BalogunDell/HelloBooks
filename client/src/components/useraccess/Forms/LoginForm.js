import React from 'react';
import { Link } from 'react-router-dom';

import PasswordResetModal from './PasswordResetModal';

/**
 * @class LoginForm
 * @classdesc returns login form
 */
class LoginForm extends React.Component {
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
        <form className="user-form">
          {/* Username input  */}
          <div className="row">
            <div className="input-field s12">
              <label>Username <span>*</span></label>
              <input type="text" id="username" ref="username"/>
            </div>
          </div>
          

          {/* Password input  */}
          <div className="row">
            <div className="input-field s12">
              <label htmlFor="Password">Password<span>*</span></label>
              <input type="password" id="password" name="password"/>
            </div>  
              <a className="button forgotPass modal-trigger" href="#modal-link">Forgot password</a> 
          </div>
          
          {/* Signin button  */}
          <div className="row">
            <div>
              <button className="btn waves-effect waves-teal" id="regBtn">Signin</button>
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