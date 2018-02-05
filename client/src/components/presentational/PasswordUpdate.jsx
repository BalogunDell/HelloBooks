import React from 'react';
import Loader from '../presentational/Loader';


/**
 *  @description PasswordUpdate
 *
 * @param {Object} handleHideVisibility
 * @param {function} handlePasswordUpdate
 * @param {function} userDetails
 * @param {function} handleChange
 * @param {function} passwordContainer
 * @param {function} handleShowVisibility
 * @param {function} resetPassword
 *
 * @returns {object} action creators
 */
class PasswordUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false
    }
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword() {
    this.setState({
      loader: true
    });
    this.props.resetPassword({
      email: this.props.userDetails.email
    }).then(() => {
      this.setState ({
        loader: false
      })
      Materialize.toast(
        'A password reset link has been sent to your email',
        4000,
        'blue rounded'
      )
    }).catch((error) => {
      if(!error.logout) {
        return
      }
    })
  }


render() {
const {
  handleHideVisibility,
  handlePasswordUpdate,
  userDetails,
  handleChange,
  passwordContainer,
  handleShowVisibility,
  resetPassword
} = this.props;
const disableBtn = userDetails.googleUser ? true : false;
    return <div>
          { userDetails.googleUser ?
              // <hr/>
              <div>
                  { this.state.loader ?
                  <Loader/>
                  : 
                  null  
                }
                <p className="googleUserInfo">
                  We noticed you logged in using your google account.
                  Please use the reset password on the login page to reset your
                  password.
                  <br/>
                  <br/>
                  <button 
                    className="custom btn"
                    onClick={this.resetPassword}
                    >Reset Password Now
                  </button>
                 
                </p>
                </div>
            :
          <form 
            onSubmit={handlePasswordUpdate}
            id="changePassword"
            > 
            <input
              type="password"
              placeholder="Enter your current password"
              name="currentPassword"
              onChange={handleChange}
              required
              minLength="6"
              value={passwordContainer.currentPassword}
            />
            <input
              type="password"
              name="newPassword"
              value={passwordContainer.newPassword}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Enter your new password"
            />

        <div className="row">  
          <div className="input-field col s12 m12 l6">
            <a
              className="btn white-text red"
              onClick={handleHideVisibility}
              >
              Cancel
            </a>
          </div>
          <div className="input-field col s12 m12 l6">
            <input
              type="submit"
              value = "submit"
              disabled ={disableBtn}
              className="btn white-text custom"
            />
          </div>
              
        </div>
          </form>
            }
      </div>
    }
  };
export default PasswordUpdate;
