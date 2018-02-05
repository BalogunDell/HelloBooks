import React from 'react';
import PasswordUpdate from './PasswordUpdate';


/**
 *  @description ProfileInfo -  Renders profile information
 *
 * @param {Object} userData
 * @param {function} showInputHandler
 * @param {function} handleHideVisibility
 * @param {function} handleShowVisibility
 * @param {function} showPasswordUpdateInput
 * @param {function} handleChange
 * @param {function} handlePasswordUpdate
 * @param {function} passwordContainer
 * @param {function} cancelEdit
 *
 * @returns {object} action creators
 */
const ProfileInfo = ({
  userData,
  showInputHandler,
  handleHideVisibility,
  handleShowVisibility,
  showPasswordUpdateInput,
  handleChange,
  handlePasswordUpdate,
  passwordContainer,
  cancelEdit
}) => {
  return(
    <div className="change-password">
      <div>
        {
          showPasswordUpdateInput
          ?
            <PasswordUpdate
              handleChange={handleChange}
              handleHideVisibility={handleHideVisibility}
              handlePasswordUpdate={handlePasswordUpdate}
              userDetails={userData}
              passwordContainer={passwordContainer}
              cancelEdit = {cancelEdit}
          />
        :
        <table>
          <thead>
            <tr>
              <td><b>Profile Details</b></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="firstnameText">Firstname:</td>
              <td id="firstname">{userData.firstName} </td>
            </tr>

            <tr>
              <td id="lastnameText">Lastname:</td>
              <td id="lastname"> {userData.lastName} </td>
            </tr>

            <tr>
              <td id="emailText">Email:</td>
              <td id="email"> {userData.email} </td>
            </tr>

            <tr>
              <td id="usernameText">Username:</td>
              <td id="username"> {userData.username} </td>
            </tr>

            <tr>
              <td id="passwordText">Password:</td>
              <td id="password">***</td>
              <td>
                  <a 
                    onClick={handleShowVisibility}>
                    <i
                      className="material-icons"
                      style={{cursor: 'pointer',
                        background: '0F488A'}}>edit
                    </i>
                  </a>
                </td>

            </tr>
          </tbody>
        </table>
        }
      </div>
    </div>  
  );
}

export default ProfileInfo;