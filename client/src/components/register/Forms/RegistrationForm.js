import React from 'react';
import toastr from 'toastr';

import ValidateInput from '../../../middleware/ValidateInput';

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
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
      [name]: value
      });
    }


    handleSubmit(event) {
      console.log(this.state);
      event.preventDefault();
    }

  render() {
    return(
<div className="col row">
  <div className="col s12 m6 offset-m3">
    <div className="form-holder">

    {/* form headers  */}
      <div className="form-header">
        <h2>Signup</h2>
        <div>
          <p>Already registered?<a href="#">Signin</a></p>
        </div>
      </div>

    {/* form header ends  */}
      <div>
        <form onSubmit={this.handleSubmit}>
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

export default RegistrationForm;