import * as types from './actionTypes';
import axios from 'axios';

export function userSignupSuccessAction(userSignupData) {
  return {
    type: types.ADD_USER,
    userSignupData
  }
}

// export function userSignupFailureAction(errors){
//   return {
//     type: types.ADD_USER_ERROR,
//     errors
//   }
// }

// Create a thunk

export function saveNewUser(userSignupData) {
  return function (dispatch) {
    return axios.post('http://localhost:3000/api/users/signup', userSignupData)
    .then(response => {
      localStorage.setItem('Access-Token', response.data.token)
      dispatch(userSignupSuccessAction(response.data))
    })
    .catch((errors) => {
      // dispatch(userSignupFailureAction(errors.response.data.message))
      throw (errors);
      
    })
  }
}


