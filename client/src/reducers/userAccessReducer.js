import * as types from '../Actions/actionTypes';

// reducer for registering users
/**
 * 
 * 
 * @export userAccessReducer
 * @param { object } [state={}] inital state
 * @param { object } action action type and payload
 * @returns { object } action performed and payload of the action
 */
export default function userAccessReducer(state = {}, action) {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        userData: action.userSignupData,
        isAuthenticated: true
      };
    
    case types.LOGIN:
      return {
        ...state,
        userData: action.loginData,
        isAuthenticated: true
      };

    case types.GOOGLE_ACCESS:
      return {
        userData: action.googleUserData,
        isAuthenticated: true
      };

    case types.SEND_EMAIL:
      return {
        ...state, ...action.serverRes
      };
    case types.RESET_PASS:
      return {
        ...state, ...action.newPassword
      };
    default:
      return state;
  }
}
