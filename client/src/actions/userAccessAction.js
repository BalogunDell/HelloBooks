import axios from 'axios';
import { actionErrorReporter, networkErrorReporter } from '../utils/errorReporters';
import errorAction from '../actions/errorAction';
import {
  ADD_USER,
  LOGIN,
  GOOGLE_ACCESS,
  RESET_PASS,
  SEND_EMAIL,
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
 * @description Defines userSignupSuccessAction action
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
 * @description Creates saveNewUser thunk action
 * 
 * @param { object } userSignupData
 * 
 * @returns { object } action type and payload
 */
const saveNewUser = userSignupData => dispatch =>
  axios.post(signup, userSignupData)
    .then((response) => {
      dispatch(errorAction(false));
      localStorage.setItem('Token', response.data.responseData.token);
      dispatch(userSignupSuccessAction(response.data.responseData));
    })
    .catch((error) => {
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });

/**
 * @export userLoginSuccess
 * 
 * @description Defines userLoginSuccess action
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
 * @description Creates userLogin thunk action
 * 
 * @param { object } loginData
 * 
 * @returns { object } axios response
 */
const userLogin = loginData => dispatch =>
  axios.post(signin, loginData)
    .then((response) => {
      dispatch(errorAction(false));
      localStorage.setItem('Token', response.data.responseData.token);
      dispatch(userLoginSuccess(response.data.responseData));
    })
    .catch((error) => {
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });

/**
 * @export sendEmailAction
 * 
 * @description Defines sendEmailAction action
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
 * @description Creates sendEmailAction action
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
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });


/**
 * @export resetPasswordAction
 * 
 * @description Defines resetPasswordAction action
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
 * @description Creates resetPassword thunk action
 * 
 * @param { object } newPassword
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
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });

/**
 * @export newGoogleAccessAction
 * 
 * @description Defines newGoogleAccessAction action
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
 * @description Defines newGoogleAccess thunk action
 * 
 * @param { object } googleUserData
 * 
 * @returns { object } server response
 */
const newGoogleAccess = googleUserData => dispatch =>
  axios.post(`${googleAccess}`, googleUserData)
    .then((response) => {
      localStorage.setItem('Token', response.data.responseData.token);
      dispatch(newGoogleAccessAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      actionErrorReporter(error);
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
