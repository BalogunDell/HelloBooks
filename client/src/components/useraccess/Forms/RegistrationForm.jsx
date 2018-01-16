import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../userprofile/adminSubComponents/loader';




export const RegistrationForm  = ({ userData, handleSubmit, handleUserInput, error, loading }) => {

  return ( 
    <div className="row">
    {/*Check if redirect user in the state is not false, if true, redirect user   */}
    <div className="">
      <div className="form-holder">
      {/* form headers  */}
        <div className="form-header">
          <h2>Signup</h2>
          <div>
            <p>Already registered?<Link to="/login"> Signin</Link></p>
          </div>
        </div>
      {/* form header ends  */}
        <div>
          <form onSubmit={handleSubmit} className="user-form">
            {/* Firstname input */}
            <div className="row">
              <div className="input-field col s6">
                <input 
                  type="text" 
                  required 
                  id="firstname" 
                  name="firstname"
                  className="validate"
                  minLength="4"
                  value= {userData.firstname}
                  onChange= {handleUserInput}
                />
                <label data-error="Invalid input">Firstname
                  <span>*</span>
                </label>
              </div>

              {/* Last name input  */}
              <div className="input-field col s6">
                <label>Lastname
                  <span>*</span>
                </label>
                <input 
                  type="text" 
                  id="lastname" 
                  required
                  minLength="4"
                  name="lastname" 
                  value= {userData.lastname} 
                  onChange= {handleUserInput}
                />
              </div>
            </div>

            {/* Username input  */}
            <div className="row">
              <div className="input-field col s12">
                <label>Username
                    <span>*</span>
                </label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  required
                  minLength="4"
                  value= {userData.username}
                  onChange= {handleUserInput}
                />
              </div>
            </div>
            
            {/* Email input  */}
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

            {/* Password input  */}
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

            {/* Confirm Password input  */}
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
                <h6 className="red-text">{error}</h6>
                { loading ? <Loading/> : null }
              </div>
            </div>
            
            {/* Signup button  */}
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
error: React.PropTypes.string.isRequired,
} 


export default RegistrationForm;
