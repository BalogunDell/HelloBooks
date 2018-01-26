import React from 'react';
import { Link } from 'react-router-dom';
import 'jquery';
import GoogleLogin from 'react-google-login';
import PasswordResetModal from './PasswordResetModal';
import Loader from '../../Userprofile/AdminSubComponents/Loader';

require('dotenv').config();

/**
 * renders login form
 *
 * @param {object} userData
 * @param {Function} handleLoginInput
 * @param {Function} loginHandler
 * @param {Function} googleLoginHandler
 * 
 * @returns {JSX}  JSX representation of commponent
 */
const LoginForm = ({ 
  userData,
  handleLoginInput,
  loginHandler,
  googleLoginHandler,
  loginError,
  isLoading }) => {

    // loader
    const isLoadingText = <h5>Loading...</h5>

    // error display
    const errorDisplay = <div className="center red-text">{loginError}</div>

    // check condition
    let showIsLoading = isLoading ?  <Loader/> : ''; 

    // set error status to empty if loader is displayed
    let errorStatus = isLoading ? '' : errorDisplay;

    
    return(
        <div className="user-login-form">
          <div className="col s12 m6 offset-m3 valing-wrapper">
            <div className="form-holder">
              <div className="form-header">
                <h2>Signin</h2>
                <div>
                  <p>Not registered? <Link to="/register">Signup</Link></p>
                </div>
              </div>
              <div className="user-form">
                <form className="" onSubmit={loginHandler}>

                  <div className="row">
                    <div className="input-field s12">
                      <input 
                      type="text" 
                      id="username" 
                      name="username"
                      value = {userData.username}
                      onChange={handleLoginInput}
                      className="validate"
                      required
                      />
                      <label 
                      data-error={loginError}
                      data-success="">Username <span>*</span></label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field s12">
                      <label>Password<span>*</span></label>
                      <input 
                      type="password" 
                      id="password" 
                      name="password"
                      value = {userData.password}
                      onChange = {handleLoginInput}
                      required
                      
                      />
                      <div className="center red-text">
                        {errorStatus}
                        {showIsLoading}
                      </div>
                    </div>  
                  </div>

                  <div className="row resetPassBtn">
                    <a href="#passwordResetModal" 
                    className="button forgotPass modal-trigger">Forgot password
                    </a>
                  </div>
                  <div className="row">
                    <div>
                      <input 
                        type="submit"
                        className="btn waves-effect waves-teal"
                        id="regBtn"
                        value="Signin"/>
                    </div>
                  </div>
                </form>
                <h5><span>or</span></h5>
                   <div className="row">
                    <GoogleLogin
                      clientId = {process.env.GOOGLE_CLIENT_ID}
                      buttonText = 'Signin with Google'
                      onSuccess = {googleLoginHandler}
                      onFailure = {googleLoginHandler}
                      className = 'btn waves-effect waves-teal red'
                    />
                  </div>
              </div>
            </div>
          </div>

  {<PasswordResetModal/>}
 </div>
    );
  }

LoginForm.propTypes = {
 handleLoginInput: React.PropTypes.func.isRequired,
 googleLoginHandler: React.PropTypes.func.isRequired,
 userData: React.PropTypes.object.isRequired,
 loginError: React.PropTypes.string.isRequired,
 isLoading: React.PropTypes.bool.isRequired
}

export default LoginForm;