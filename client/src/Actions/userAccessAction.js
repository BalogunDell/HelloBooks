import * as types from './actionTypes';
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
    return axios.post('http://localhost:3000/api/users/signup', userSignupData)
    .then(response => {
      localStorage.setItem('Access-Token', response.data.token)
      dispatch(userSignupSuccessAction(response.data.response))
    })
    .catch((errors) => {
      // dispatch(userSignupFailureAction(errors.response.data.message))
      throw (errors);
      
    })
  }
}


//  Create thunk for signin

export function userLogin(loginData){
  return dispatch => {
    return axios.post('http://localhost:3000/api/users/signin', loginData)
    .then(response => {
      
      if(checkStorage) {
        localStorage.setItem('Access-Token', response.data.response.data.token);
        const userData = response.data.response.data.userID
        console.log(userData)
        dispatch(userLoginSuccess(response.data))
      } else  {
        console.log('no storage found')
      }
      
    })
    .catch(error => {
      throw (error);
    })

  }
}



// Helper function to check if localstorage is supported

function checkStorage(){
  localStorage ? true : false
}


