import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../presentational/Loader';
import { sendEmail } from '../../../Actions/userAccessAction';

/**
 * @description PasswordResetModal
 * 
 * @class PasswordResetModal
 * 
 * @extends {Component}
 */
export class PasswordResetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loader:false,
      disableBtn: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelPassReset = this.cancelPassReset.bind(this);
    const message = document.getElementById('message');
  }

  /**
   * @description User input handler - handleInput
   * 
   * @param { object } event 
   * 
   * @memberof PasswordResetModal
   * 
   * @returns { object } a new state with use email
   */
  handleInput(event) {
    this.setState({email: event.target.value})
  }

  /**
   * @description Reset password handler - handleSubmit
   * 
   * @param { object } event 
   * 
   * @memberof PasswordResetModal
   * 
   * @returns { object } updated state and success message 
   */
  handleSubmit(event) {
     event.preventDefault();
     message.innerHTML = ``;
    this.setState({  disableBtn: true});
    if(this.state.email === "") {
      message.innerHTML = `Your email is needed to reset your password`;
      message.className="red-text center-align";
      this.setState({ disableBtn: false});
    } else {
      
      this.props.sendEmail({email: this.state.email})
      .then(() => {
        Materialize.toast(
          `A password reset link has been sent to your email`,
        3200,
        'blue rounded');

        setTimeout(() => {
          $('.modal').modal('close');
          this.setState({
            disableBtn: true,
            email: ''
          });
        }, 2500);

      })
      .catch((error) => {
        this.setState({ disableBtn: false});
      })
    }
  }

  /**
   * @description Cancel Password Reset - cancelPassReset
   * 
   * @memberof PasswordResetModal
   * 
   * @returns { object } updated state and success message 
   */
  cancelPassReset() {
    this.setState({email: '', loader: false, disableBtn: false
  });
    message.innerHTML = 'A password reset link will be sent to this email';
    message.className="black-text center-align"
  }

  /**
   * @description Lifecycle hook - componentDidMount
   * 
   * @memberof PasswordResetModal
   * 
   * @returns { object } updated state
   */
  componentDidMount() {
    message.innerHTML = '';
    this.setState({
      disableBtn: false,
      error: false
    });
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: false,
        opacity: 0.3
      });
    });
  }

  /**
   * @description React render method - render
   * 
   * @memberof PasswordResetModal
   * 
   * @returns { object } JSX representation of DOM
   */
  render() {
    return(
    <div className="modal passwordModal" id="passwordResetModal">
      <div className="container">
        <div className="col s12 m6 l4 offset-l8">
          <div className="modal-content">
            <h5 className="center-align">Password reset</h5>
              <p className="center-align" id="message">
              A password reset link will be sent to this email</p>
              {
                this.state.error 
                ? 
                  <div className="row center-align">
                    <Loader/>
                  </div>
                :
                null
              }
            <form
              className="col s6 offset-s3"
              id ="handleSubmit"
              onSubmit={this.handleSubmit}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input 
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.handleInput}/>
              </div>

              <div className="input-field">
                <button
                  className="btn waves-effect waves-ripple green"
                  disabled= {this.state.disableBtn}>Reset
                </button>
                <div
                  className="btn waves-effect modal-close modal-action"
                  id="cancelPass"
                  onClick={this.cancelPassReset}>Cancel
                </div>
              </div>
            </form>
          </div>   
        </div>
      </div>
    </div>
    );
  }

}

/**
 * @description Redux connect parameter - dispatchToProps
 * 
 * @param {function} dispatch
 * 
 * @returns {object} mapped dispatch 
*/
export const dispatchToProps = (dispatch) => {
  return {
    sendEmail: (email) => dispatch(sendEmail(email))
  }
}

export default connect(null, dispatchToProps)(PasswordResetModal);