import * as types from '../Actions/actionTypes';

// reducer for registering users
export default function userSignupReducer(state = {}, action) {
  switch(action.type) {
    case types.ADD_USER:
      return {
        ...state, 
        signupData: action.userSignupData
      }
    default: 
      return state;
  }
}