import React from 'react';


/**
 *  ProfileInfo -  Renders profile information
 *
 * @param {Object} - userData
 * @param {function} -  showInputHandler
 *
 * @returns {object} action creators
 */
const ProfileInfo = ({userData, showInputHandler}) => {
  return(
    <div className="change-password">
      <div>
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
              <td id="username"> {userData.userName} </td>
            </tr>

            <tr>
              <td id="passwordText">Password:</td>
              <td id="password">***</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  
  );
}

export default ProfileInfo;