import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import axios from 'axios';


// user signup action creator
export function userSignupSuccessAction(userSignupData) {
  return {
    type: types.ADD_USER,
    userSignupData
  }
}

//  user login action creator
export function userLoginSuccess(loginData) {
  return {
    type: types.LOGIN,
    loginData
  }
}

// Create thunk for signup
export function saveNewUser(userSignupData) {
  return function (dispatch) {
    return axios.post(apiRoutes.signup, userSignupData)
    .then(response => {
      //  check if device supports localstorage
      if(checkStorage) {
        const userDetails = [];
        // Push details into the array
        userDetails.push(response.data.responseData.token, response.data.responseData.userID, response.data.responseData.userRole)
        localStorage.setItem('Access-Token', JSON.stringify(userDetails));
        dispatch(userSignupSuccessAction(response.data.responseData))

      } else  {
        console.log('no storage found')
      }
    })
    .catch((errors) => {
      throw (errors);
      
    })
  }
}


//  Create thunk for signin
export function userLogin(loginData){
  return dispatch => {
    return axios.post(apiRoutes.signin, loginData)
    .then(response => {
      if(checkStorage) {
        const userDetails = [];
        userDetails.push(response.data.responseData.token, response.data.responseData.userID, response.data.responseData.userRole)
        localStorage.setItem('Access-Token', JSON.stringify(userDetails));
        dispatch(userLoginSuccess(response.data.responseData))

      } else  {
        console.log('no storage found')
      }
    })
    .catch(error => {
      throw (error)
    })
  }
}

/**
 * @export sendEmailAction
 * @param { object } serverRes 
 * @returns { object } type of action and the 
 * payload sending reset password link
 */
export function sendEmailAction(serverRes) {
  return {
    type: types.SEND_EMAIL,
    serverRes
  }
}

/**
 * 
 * @export sendEmail
 * @param { object } userEmail 
 * @returns { object } response reset password link from the server
 */
export function sendEmail(userEmail) {
  return dispatch => {
    return axios.post(`${apiRoutes.newPassword}`, userEmail)
    .then((response) => {
      dispatch(sendEmailAction(response.data.message));
    })
    .catch((error) => {
      throw (error);
    });
  }
}

/**
 * @export resetPasswordAction
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * @returns { object } type of action and payload
 */
export function resetPasswordAction(newPassword) {
  return {
    type: types.RESET_PASS,
    newPassword
  }
}

/**
 * @export resetPassword
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * @returns { object } server response
 */
export function resetPassword(newPassword, uniqueUrl) {
  return dispatch => {
    return axios.put(`${apiRoutes.newPassword}/${uniqueUrl}`, newPassword)
    .then((response) => {
      dispatch(resetPasswordAction(response))
    })
    .catch((error) => {
      throw (error);
    })
  }
}



// Helper function to check if localstorage is supported
function checkStorage(){
  localStorage ? true : false
}


