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
              <td>Firstname:</td>
              <td>{userData.firstname} </td>
            </tr>

            <tr>
              <td>Lastname:</td>
              <td> {userData.lastname} </td>
            </tr>

            <tr>
              <td>Email:</td>
              <td> {userData.email} </td>
            </tr>

            <tr>
              <td>Username:</td>
              <td> {userData.username} </td>
            </tr>

            <tr>
              <td>Password:</td>
              <td>***</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>  
  );
}

export default profileInfo;