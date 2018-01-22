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


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR USER SIGNUP**** //
// *********************************************************** //
/**
 * @desc user signup action creator
 * @export userSignupSuccessAction
 * @param { object } userSignupData
 * @returns { object } action type and payload => userSignupData
 */
const userSignupSuccessAction = (userSignupData) => {
  return {
    type: ADD_USER,
    userSignupData
  };
};

/**
 * @export saveNewUser
 * @param { object } userSignupData
 * @returns { object } action type and payload => userSignupData
 */
const saveNewUser = (userSignupData) => {
  return (dispatch) => {
    return axios.post(signup, userSignupData)
      .then((response) => {
        localStorage.setItem('Access-Token', response.data.responseData.token); // eslint-disable-line
        dispatch(userSignupSuccessAction(response.data.responseData));
      })
      .catch((errors) => {
        throw (errors);
      });
  };
};

// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR USER SIGNIN**** //
// *********************************************************** //
/**
 * @desc user login action creator
 * @export userLoginSuccess
 * @param { object } loginData
 * @returns { object } action type and payload => loginData
 */
const userLoginSuccess = (loginData) => {
  return {
    type: LOGIN,
    loginData
  };
};

/**
 * @export userLogin
 * @param { object } loginData 
 * @returns { object } axios response
 */
const userLogin = (loginData) => {
  return (dispatch) => {
    return axios.post(signin, loginData)
      .then((response) => {
        localStorage.setItem('Access-Token', response.data.responseData.token); // eslint-disable-line
        dispatch(userLoginSuccess(response.data.responseData));
      })
      .catch((error) => {
        throw (error);
      });
  };
};


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR MAIL ACTIONS*** //
// *********************************************************** //
/**
 * @export sendEmailAction
 * @param { object } serverRes 
 * @returns { object } type of action and the 
 * payload sending reset password link
 */
const sendEmailAction = (serverRes) => {
  return {
    type: SEND_EMAIL,
    serverRes
  };
};

/**
 * 
 * @export sendEmail
 * @param { object } userEmail 
 * @returns { object } response reset password link from the server
 */
const sendEmail = (userEmail) => {
  return (dispatch) => {
    return axios.post(`${newPasswordUrl}`, userEmail)
      .then((response) => {
        dispatch(sendEmailAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
};

// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR RESET PASSWORD* //
// *********************************************************** //
/**
 * @export resetPasswordAction
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * @returns { object } type of action and payload
 */
const resetPasswordAction = (newPassword) => {
  return {
    type: RESET_PASS,
    newPassword
  };
};

/**
 * @export resetPassword
 * @param { object } newPassword
 * @param { object } uniqueUrl
 * @returns { object } server response
 */
const resetPassword = (newPassword, uniqueUrl) => {
  return (dispatch) => {
    return axios.put(`${newPasswordUrl}/${uniqueUrl}`, newPassword)
      .then((response) => {
        dispatch(resetPasswordAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
};


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR GOOGLE ACCESS** //
// *********************************************************** //
/**
 * @export newGoogleAccessAction
 * @param { object } googleUserData
 * @returns { object } type of action and payload
 */
const newGoogleAccessAction = (googleUserData) => {
  return {
    type: GOOGLE_ACCESS,
    googleUserData
  };
};

/**
 * @export newGoogleAccess
 * @param { object } googleUserData
 * @returns { object } server response
 */
const newGoogleAccess = (googleUserData) => {
  return (dispatch) => {
    return axios.post(`${googleAccess}`, googleUserData)
      .then((response) => {
        localStorage.setItem('Access-Token', response.data.responseData.token); // eslint-disable-line
        dispatch(newGoogleAccessAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
};

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
