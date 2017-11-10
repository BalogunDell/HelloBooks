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

export function membershipIconCreator(membershipLevel) {
  if(!membershipLevel) {
    membershipLevel == 'null'
  }
  switch(membershipLevel.toLowerCase()) {
    case 'silver':
      return (
        <span>
          <i className="material-icons green-text">star</i>
          <i className="material-icons green-text">star</i>
        </span>
      )
    case 'bronze':
      return (
        <i className="material-icons black-text">star</i>
      )
    case 'gold': 
      return (
        <span>
          <i className="material-icons yellow-text">star</i>
          <i className="material-icons yellow-text">star</i>
          <i className="material-icons yellow-text">star</i>
        </span>
      )
    default: 
      return 'Not a member'
  }
}