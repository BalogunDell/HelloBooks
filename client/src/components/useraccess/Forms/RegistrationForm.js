import React from 'react';
import toastr from 'toastr';
import { Link, Redirect } from 'react-router-dom';

/**
 * @class RgistrationForms
 * @classdesc returns the registration form
 */
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: '',
      processingRequest: false,
      btnDisable: false,
      redirectUser: false,
      connectionStatus: false
    };

    this.handleInput = this.handleInput.bind(this);
    this. handleSubmit = this.handleSubmit.bind(this);
  }

    handleInput(event) {
      this.setState({[event.target.name]: event.target.value})
    }


    handleSubmit(event) {
      event.preventDefault();
      this.props.userRegistration(this.state);

    }

  render() {
      //  Assign spinner to a variable for display in return
    let Spinner = <div className="center">
           <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div><br/>
            <span className="center">Creating your account...</span>
          </div>
          
          // condition to show spinner
    let showSpinner = this.state.processingRequest ? Spinner : '';

     //  define connection error message
    let connectionStatusMessage =  'You are offline, please connect your device to the internet';

          // condition to show connection message
    let showConnectionMessage = this.state.connectionStatus ? connectionStatusMessage: ''


    return(
  <div className="row">
    {/*Check if redirect user in the state is not false, if true, redirect user   */}
    {this.state.redirectUser ? <Redirect to ="/user"/>: 
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
          <form onSubmit={this.handleSubmit} className="user-form">

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
                    value= {this.state.firstname} 
                    onChange={this.handleInput}
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
                    value= {this.state.lastname} 
                    onChange={this.handleInput}
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
                    value= {this.state.username} 
                    onChange={this.handleInput}
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
                    value = {this.state.email} 
                    onChange={this.handleInput}
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
                    value= {this.state.password} 
                    onChange={this.handleInput}
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
                    value={this.state.confirmPassword} 
                    onChange={this.handleInput}
                />
              </div>  
            </div> 

            {/* Preloader here */}
              {showSpinner}
            
            {/* Signup button  */}
            <div className="row">
              <div className="col s12">
                <input 
                type="submit" 
                className="btn waves-effect waves-teal" 
                id="regBtn" 
                value="Create Account"
                disabled={this.state.btnDisable} 
                disabled={this.state.processingRequest}/>
              </div>
            </div>

            <div>
              <p>{showConnectionMessage}</p> 
            </div>

          </form>

          {/* G plus Signup button  */}
            <div className="row">
              <button className="btn waves-effect waves-teal red">Signup with Google+ </button>
            </div>
        </div>
      </div>
    </div>
  } 
  </div>
      );
    }
}

RegistrationForm.propTypes = {
  userRegistration: React.PropTypes.func.isRequired
} 


export default RegistrationForm;
