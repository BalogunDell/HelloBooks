import * as types from '../Actions/actionTypes';
import axios from 'axios';

export function userLogin(userLoginDetails) {
  return {
    type: types.GET_USERS,
    userLoginDetails
  }
}

// export default function loadUsers() {
//   return function dispatch() {
//     return axios.get('https://hellobooksapp.herokuapp.com/api/users').then(users => {
//       console.log(users)
//     }).catch(error => {
//       console.log(error);
//     })
//   }
// }