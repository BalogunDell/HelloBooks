import React from 'react';

const profileInfo = ({userData, showInputHandler}) => {
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
              <td id="firstname">{userData.firstname} </td>
            </tr>

            <tr>
              <td id="lastnameText">Lastname:</td>
              <td id="lastname"> {userData.lastname} </td>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>  
  );
}

export default profileInfo;