import React from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';

/**
 * @class RgistrationForms
 * @classdesc returns the registration form
 */
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this. handleSubmit = this.handleSubmit.bind(this);
  }

    handleInput(event) {
      this.setState({[event.target.name]: event.target.value})
    }


    handleSubmit(event) {
      event.preventDefault();
      //expect this function UserReqReq as props
      this.props.UserRegReq(this.state);
    }

  render() {
    return(
<div className="row">
  <div className="">
    <div className="form-holder">

    {/* form headers  */}
      <div className="form-header">
        <h2>Signup</h2>
        <div>
          <p>Already registered?<Link to="/login">Signin</Link></p>
        </div>
      </div>

    {/* form header ends  */}
      <div>
        <form onSubmit={this.handleSubmit} className="user-form">
          {/* Username input  */}
          <div className="row">
            <div className="input-field s12">
              <label>Username <span>*</span></label>
              <input type="text" id="username" name="username" value= {this.state.username} onChange={this.handleInput}/>
            </div>
          </div>
          
          {/* Email input  */}
          <div className="row">
            <div className="input-field s12">
              <input type="email" id="email" name="email" className="validate" value = {this.state.email} onChange={this.handleInput}/>
              <label htmlFor="email" data-error="Invalid email" data-success="">Email<span>*</span></label>
            </div>  
          </div>

          {/* Password input  */}
          <div className="row">
            <div className="input-field s12">
              <label htmlFor="Password">Password<span>*</span></label>
              <input type="password" id="password" name="password" value= {this.state.password} onChange={this.handleInput}/>
            </div>  
          </div>

          {/* Confirm Password input  */}
          <div className="row">
            <div className="input-field s12">
              <label htmlFor="Password">Confirm Password<span>*</span></label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInput}/>
            </div>  
          </div>
          
          {/* Signup button  */}
          <div className="row">
            <div>
              <input type="submit" className="btn waves-effect waves-teal" id="regBtn" value="Create Account"/>
            </div>
          </div>
          <hr/>
          {/* Signup button  */}
          <div className="row">
            <button className="btn waves-effect waves-teal red">Signup with Google+ </button>
          </div>

        </form>
      </div>
    </div>
  </div>
 </div>
    );
  }

}

RegistrationForm.propTypes = {
  UserRegReq: React.PropTypes.func.isRequired
}

export default RegistrationForm;