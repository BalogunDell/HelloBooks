import React from 'react';
import checkmark from '../../assets/images/checkmark.gif';


export function successMessage(message){
  return (
    <div className="successMessage">
    <center>
      <div>
          <h5>{message}</h5> 
        <img src={checkmark} alt=""/>
      </div>
    </center>
  </div>
  )
}


export function failureMessage(message) {
  return (
  <div className="failureMessage">
    <center>
      <div>
        <h6>{message}</h6>
        {/* <img src="/images/checkmark.gif" alt=""/> */}
        <i className="material-icons">cancel</i>
      </div>
    </center>
  </div>
  )
}