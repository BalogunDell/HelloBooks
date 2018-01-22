import React from 'react';


const successMessage = (message) => {
  return (
    <div className="successMessage">
    <center>
      <div>
          <h5>{message}</h5> 
      </div>
    </center>
  </div>
  )
}


const failureMessage = (message) => {
  return (
  <div className="failureMessage">
    <center>
      <div>
        <h6>{message}</h6>
        <i className="material-icons">cancel</i>
      </div>
    </center>
  </div>
  )
}

const membershipIconCreator = (membershipLevel) => {
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

export {
  successMessage,
  failureMessage,
  membershipIconCreator
}