import axios from 'axios';
import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR USER SIGNUP**** //
// *********************************************************** //
/**
 * @desc user signup action creator
 * @export userSignupSuccessAction
 * @param { object } userSignupData
 * @returns { object } action type and payload => userSignupData
 */
export function userSignupSuccessAction(userSignupData) {
  return {
    type: types.ADD_USER,
    userSignupData
  };
}

/**
 * @export saveNewUser
 * @param { object } userSignupData
 * @returns { object } action type and payload => userSignupData
 */
export function saveNewUser(userSignupData) {
  return (dispatch) => {
    return axios.post(apiRoutes.signup, userSignupData)
      .then((response) => {
      //  check if device supports localstorage
        const userDetails = [];
        // Push details into the array
        userDetails.push(response.data.responseData.token,
          response.data.responseData.userID,
          response.data.responseData.userRole);
        localStorage.setItem('Access-Token', JSON.stringify(userDetails)); //eslint-disable-line
        dispatch(userSignupSuccessAction(response.data.responseData));
      })
      .catch((errors) => {
        throw (errors);
      });
  };
}

// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR USER SIGNIN**** //
// *********************************************************** //
/**
 * @desc user login action creator
 * @export userLoginSuccess
 * @param { object } loginData
 * @returns { object } action type and payload => loginData
 */
export function userLoginSuccess(loginData) {
  return {
    type: types.LOGIN,
    loginData
  };
}

/**
 * @export userLogin
 * @param { object } loginData 
 * @returns { object } axios response
 */
export function userLogin(loginData) {
  return (dispatch) => {
    return axios.post(apiRoutes.signin, loginData)
      .then((response) => {
        const userDetails = [];
        userDetails.push(response.data.responseData.token,
          response.data.responseData.userID,
          response.data.responseData.userRole);
        localStorage.setItem('Access-Token', JSON.stringify(userDetails)); // eslint-disable-line
        dispatch(userLoginSuccess(response.data.responseData));
      })
      .catch((error) => {
        throw (error);
      });
  };
}


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR MAIL ACTIONS*** //
// *********************************************************** //
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
  };
}

/**
 * 
 * @export sendEmail
 * @param { object } userEmail 
 * @returns { object } response reset password link from the server
 */
export function sendEmail(userEmail) {
  return (dispatch) => {
    return axios.post(`${apiRoutes.newPassword}`, userEmail)
      .then((response) => {
        dispatch(sendEmailAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}

// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR RESET PASSWORD* //
// *********************************************************** //
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
  };
}

/**
 * @export resetPassword
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * @returns { object } server response
 */
export function resetPassword(newPassword, uniqueUrl) {
  return (dispatch) => {
    return axios.put(`${apiRoutes.newPassword}/${uniqueUrl}`, newPassword)
      .then((response) => {
        dispatch(resetPasswordAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
}

