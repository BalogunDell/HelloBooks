import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../presentational/Loader';

/**
 * RegistrationForm 
 * 
 * @param {object} userData 
 * @param {Function} handleSubmit
 * @param {Function} handleUserInput
 * @param {string} errorMessage
 * @param {boolean} loading
 * 
 * @returns {object} updated state
 */
export const RegistrationForm  = ({
  userData,
  handleSubmit,
  handleUserInput,
  errorMessage,
  loading }) => {

  return ( 
    <div className="row">
    <div className="">
      <div className="form-holder">
        <div className="form-header">
          <h2>Signup</h2>
          <div>
            <p>Already registered?<Link to="/login"> Signin</Link></p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="row">
              <div className="input-field col s6">
                <input 
                  type="text" 
                  required 
                  id="firstName" 
                  name="firstName"
                  className="validate"
                  minLength="2"
                  value= {userData.firstName}
                  onChange= {handleUserInput}
                />
                <label data-error="Invalid input">Firstname
                  <span>*</span>
                </label>
              </div>

              <div className="input-field col s6">
                <label>Lastname
                  <span>*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName" 
                  required
                  minLength="2"
                  name="lastName" 
                  value= {userData.lastName} 
                  onChange= {handleUserInput}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <label>Username
                    <span>*</span>
                </label>
                <input 
                  type="text" 
                  id="userName" 
                  name="userName" 
                  required
                  minLength="4"
                  value= {userData.userName}
                  onChange= {handleUserInput}
                />
              </div>
            </div>
            
            <div className="row">
              <div className="input-field col s12">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="validate" 
                  value = {userData.email}
                  onChange= {handleUserInput}
                />
                <label 
                  htmlFor="email" 
                  data-error="Invalid email" 
                  data-success="">Email
                    <span>*</span>
                </label>
              </div>  
            </div>

            <div className="row">
              <div className="input-field col s6">
                <label 
                    htmlFor="Password">Password
                    <span>*</span>
                </label>
                <input
                  type="password" 
                  id="password" 
                  name="password" 
                  value= {userData.password}
                  onChange= {handleUserInput}
                />
              </div> 

              <div className="input-field col s6">
                <label 
                    htmlFor="Password">Confirm Password
                    <span>*</span>
                </label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  value={userData.confirmPassword}
                  onChange= {handleUserInput}
                />
              </div>  
            </div> 

            <div className="row center error-holder">
              <div className="col s12">
                <h6 className="red-text">{errorMessage}</h6>
                { loading ? <Loading/> : null }
              </div>
            </div>
            
            <div className="row">
              <div className="col s12">
                <input 
                type="submit" 
                className="btn waves-effect waves-teal" 
                id="regBtn" 
                value="Create Account"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}
RegistrationForm.propTypes = {
userData:React.PropTypes.object.isRequired,
handleSubmit: React.PropTypes.func.isRequired,
handleUserInput: React.PropTypes.func.isRequired,
errorMessage: React.PropTypes.string.isRequired,
} 


export default RegistrationForm;
