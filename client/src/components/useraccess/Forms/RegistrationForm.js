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
      redirectUser: false
    };

    this.handleInput = this.handleInput.bind(this);
    this. handleSubmit = this.handleSubmit.bind(this);
  }

    handleInput(event) {
      this.setState({[event.target.name]: event.target.value})
    }


    handleSubmit(event) {
      this.setState({error: '', processingRequest:true, btnDisable:true})
      event.preventDefault();
      //expect this function UserReqReq as props
      this.props.UserRegReq(this.state)
      .then(
        (response) => {
          // Set user token
          localStorage.setItem('Hellobooks-Token', response.data.token)

          // disable/enable all that needs to be
          this.setState({ processingRequest: false, btnDisable:false, redirectUser: true})

        },
        (data) => {this.setState({ error: data.response.data.message, processingRequest:false, btnDisable:false})}
      )
      
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
                  value= {this.state.firstname} 
                  onChange={this.handleInput}
              />
              <label>Firstname
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
  UserRegReq: React.PropTypes.func.isRequired
}

export default RegistrationForm;