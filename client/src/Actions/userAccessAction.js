import axios from 'axios';
import {
  ADD_USER,
  LOGIN,
  GOOGLE_ACCESS,
  RESET_PASS,
  SEND_EMAIL
} from './actionTypes';
import {
  signup,
  signin,
  newPasswordUrl,
  googleAccess
} from '../utils/apiEndPoints';

/**
 * @export userSignupSuccessAction
 * 
 * @param { object } userSignupData
 * 
 * @returns { object } action type and payload => userSignupData
 */
const userSignupSuccessAction = userSignupData => ({
  type: ADD_USER,
  userSignupData
});

/**
 * @export saveNewUser
 * 
 * @param { object } userSignupData
 * 
 * @returns { object } action type and payload
 */
const saveNewUser = userSignupData => dispatch =>
  axios.post(signup, userSignupData)
    .then((response) => {
      localStorage.setItem('Access-Token', response.data.responseData.token);
      dispatch(userSignupSuccessAction(response.data.responseData));
    })
    .catch((errors) => {
      throw (errors);
    });

/**
 * @export userLoginSuccess
 * 
 * @param { object } loginData
 * 
 * @returns { object } action type and payload
 */
const userLoginSuccess = loginData => ({
  type: LOGIN,
  loginData
});

/**
 * @export userLogin
 * 
 * @param { object } loginData
 * 
 * @returns { object } axios response
 */
const userLogin = loginData => dispatch =>
  axios.post(signin, loginData)
    .then((response) => {
      localStorage.setItem('Access-Token', response.data.responseData.token);
      dispatch(userLoginSuccess(response.data.responseData));
    })
    .catch((error) => {
      throw (error);
    });

/**
 * @export sendEmailAction
 * 
 * @param { object } serverResponse 
 * 
 * @returns { object } type of action and the payload
 */
const sendEmailAction = serverResponse => ({
  type: SEND_EMAIL,
  serverResponse
});

/**
 * 
 * @export sendEmail
 * 
 * @param { object } userEmail 
 * 
 * @returns { object } response reset password link from the server
 */
const sendEmail = userEmail => dispatch =>
  axios.post(`${newPasswordUrl}`, userEmail)
    .then((response) => {
      dispatch(sendEmailAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });


/**
 * @export resetPasswordAction
 * 
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * 
 * @returns { object } type of action and payload
 */
const resetPasswordAction = newPassword => ({
  type: RESET_PASS,
  newPassword
});

/**
 * @export resetPassword
 * 
 * @param { object } newPassword
 * 
 * @param { object } uniqueUrl
 * 
 * @returns { object } server response
 */
const resetPassword = (newPassword, uniqueUrl) => dispatch =>
  axios.put(`${newPasswordUrl}/${uniqueUrl}`, newPassword)
    .then((response) => {
      dispatch(resetPasswordAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });

/**
 * @export newGoogleAccessAction
 * 
 * @param { object } googleUserData
 * 
 * @returns { object } type of action and payload
 */
const newGoogleAccessAction = googleUserData => ({
  type: GOOGLE_ACCESS,
  googleUserData
});

/**
 * @export newGoogleAccess
 * 
 * @param { object } googleUserData
 * 
 * @returns { object } server response
 */
const newGoogleAccess = googleUserData => dispatch =>
  axios.post(`${googleAccess}`, googleUserData)
    .then((response) => {
      localStorage.setItem('Access-Token', response.data.responseData.token);
      dispatch(newGoogleAccessAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });

export {
  userSignupSuccessAction,
  saveNewUser,
  userLoginSuccess,
  userLogin,
  sendEmailAction,
  sendEmail,
  resetPasswordAction,
  resetPassword,
  newGoogleAccessAction,
  newGoogleAccess
};
