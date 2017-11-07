import * as types from '../Actions/actionTypes';

// reducer for registering users
export default function userAccessReducer(state = {}, action) {
  switch(action.type) {
    case types.ADD_USER:
      return {
        ...state, 
        userData: action.userSignupData,
        isAuthenticated: true
      }
    
    case types.LOGIN:
      return {
        ...state, 
        userData: action.loginData,
        isAuthenticated:true
      }
    case types.SEND_EMAIL: 
      return {
        ...state, ...action.serverResponse
      }
    case types.RESET_PASS: 
      return {
        ...state, ...action.newPassword
      }
    default: 
      return state;
  }
}