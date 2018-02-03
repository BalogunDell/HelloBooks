import React from 'react';


/**
 *  @description ProfileInfo -  Renders profile information
 *
 * @param {Object} - userData
 * @param {function} -  showInputHandler
 *
 * @returns {object} action creators
 */
const PasswordUpdate = ({
  handleHideVisibility,
  handlePasswordUpdate,
  userDetails,
  handleChange,
  passwordContainer
}) => {
  return <div>
        <form 
          onSubmit={handlePasswordUpdate}
          id="changePassword"
          >          
          { userDetails.googleUser ?
            // <hr/>
              <p className="googleUserInfo">
                We noticed you logged in using your google account.
               To change your password, use your <b>first name </b>as your 
                  <b> current password.</b>
              </p>
            //  <hr/>
            : null
            }
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
            className="btn white-text custom"
          />
        </div>

      </div>
        </form>
    </div>
};

export default PasswordUpdate;
