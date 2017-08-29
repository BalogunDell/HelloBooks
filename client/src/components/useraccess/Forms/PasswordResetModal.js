import React from 'react';

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
    const message = document.getElementById('message');
  }

  handleInput(event) {
    this.setState({email: event.target.value})
  }

  handleSubmit(event) {
    // validate input
    if(this.state.email === "") {
    message.innerHTML = `Your email is needed to reset your password`;
    message.className="red-text center-align";  
    } else {
    message.innerHTML = `A password reset link has been sent to ${this.state.email}`;
    message.className="green-text center-align";
    }
    // prevent button default action
    event.preventDefault();
  }
  render() {
    return(
    <div className="passwordModal">
      <div className="modal" id="modal-link">
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
              <div className="btn waves-effect modal-close modal-action">Cancel</div>
            </div>
          </form>
        </div> 
      </div>
    </div>
    );
  }

}

export default PasswordResetModal;