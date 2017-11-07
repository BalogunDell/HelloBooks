import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../Actions/userAccessAction';

/**
 * @class PasswordResetModal
 * @classdesc returns Password reset modal
 */
class PasswordResetModal extends React.Component {
  constructor(prop) {
    super();
    this.state = {
      email: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelPassReset = this.cancelPassReset.bind(this);
    const message = document.getElementById('message');
  }

  /**
   * 
   * @param { object } event 
   * @memberof PasswordResetModal
   * @returns { object } a new state with use email
   */
  handleInput(event) {
    this.setState({email: event.target.value})
  }

  /**
   * 
   * 
   * @param { object } event 
   * @memberof PasswordResetModal
   * @returns { object } respose from api call 
   */
  handleSubmit(event) {
    // validate input
    if(this.state.email === "") {
    message.innerHTML = `Your email is needed to reset your password`;
    message.className="red-text center-align";  
    } else {
      
      //Make API call
      this.props.sendEmail({email: this.state.email})
      .then(() => {
        message.innerHTML = `A password reset link has been sent to ${this.state.email}`;
        message.className="green-text center-align";
      })
      .catch((error) => {
        if (error.response.status === 501) {
          message.innerHTML ="Ooops! Something went wrong, the server could not process your request at this time. Please try again.";
          message.className="red-text center-align";
        } else {
          message.innerHTML = error.response.data.message;
          message.className="red-text center-align";
        }
      })
    }
    // prevent button default action
    event.preventDefault();
  }

  cancelPassReset() {
    this.setState({email: ''})
    message.innerHTML = 'A password reset link will be sent to this email';
    message.className="black-text center-align"
  }

  render() {
    return(
    <div className="modal passwordModal" id="passwordResetModal">
      <div className="container">
        <div className="col s12 m6 l4 offset-l8">
          <div className="modal-content">
            <h5 className="center-align"> Password reset</h5>
              <p className="center-align" id="message">
              A password reset link will be sent to this email</p>
            <form className="col s6 offset-s3" onSubmit={this.handleSubmit}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" className="validate" value={this.state.email} onChange={this.handleInput}/>
              </div>

              <div className="input-field">
                <input type="submit" className="btn waves-effect waves-ripple green" value="RESET"/>
                <div className="btn waves-effect modal-close modal-action" onClick={this.cancelPassReset}>Cancel</div>
              </div>
            </form>
          </div>   
        </div>
      </div>
    </div>
    );
  }

}

function dispatchToProps(dispatch){
  return {
    sendEmail: (email) => dispatch(userActions.sendEmail(email))
  }
}

export default connect(null, dispatchToProps)(PasswordResetModal);