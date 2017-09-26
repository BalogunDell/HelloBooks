import React from 'react';

export const editPasswordEle = ({userData}) => {
  return(
      <div className="change-password">
          <form action="">

            <div className="row">
              <hr/>
              <h6>Change Password</h6>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input type="text" placeholder="Current password" id="currentPassword" className="validate"/>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input type="text" placeholder="New Password" id="cnewPassword" className="form-control input-sm"/>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input type="text" placeholder="Confirm new password" id="confirmNewPassword" className="form-control input-sm"/>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m12 l6">
                <button type="button" className="btn waves-effect waves-teal">SAVE</button>
              </div>

              <div className="input-field col s12 m12 l6">
                <button type="button" className="btn waves-effect waves-teal red">CANCEL</button>
              </div>
            </div>
          </form> 
  </div>  
  );
}
