import {
  ADD_USER,
  LOGIN,
  SEND_EMAIL,
  GOOGLE_ACCESS,
  RESET_PASS,
} from '../actions/actionTypes';

/**
 * 
 * @export userAccessReducer
 * 
 * @description Defines userAccessReducer
 * 
 * @param { object } state inital state
 * 
 * @param { object } action action type and payload
 * 
 * @returns { object } action performed and payload of the action
 */
export default function userAccessReducer(state = {}, action) {
  
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userData: action.userSignupData,
        isAuthenticated: true
      };
    case LOGIN:
      return {
        ...state,
        userData: action.loginData,
        isAuthenticated: true
      };

    case GOOGLE_ACCESS:
      return {
        userData: action.googleUserData,
        isAuthenticated: true
      };

    case SEND_EMAIL:
      return {
        ...state, ...action.serverResponse
      };
    case RESET_PASS:
      return {
        ...state, ...action.newPassword
      };
    default:
      return state;
  }
}
