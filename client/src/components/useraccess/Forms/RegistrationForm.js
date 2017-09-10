import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';




const RegistrationForm  = ({ userData, handleSubmit, handleUserInput, error }) => {

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
                
                
                {/* <p>{this.error}</p> */}
              </div>

              {/* Last name input  */}
              <div className="input-field col s6">
                <label>Lastname
                  <span>*</span>
                </label>
                <input 
                  type="text" 
                  id="lastname" 
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
                <h6>{error}</h6>
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

          {/* G plus Signup button  */}
            <div className="row">
              <button className="btn waves-effect waves-teal red">Signup with Google+ </button>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
}
RegistrationForm.propTypes = {
userData:React.PropTypes.object.isRequired,
// value: React.PropTypes.string.isRequired,
// handleUserInput: React.PropTypes.func.isRequired,
// errors: React.PropTypes.string.isRequired
} 


export default RegistrationForm;
