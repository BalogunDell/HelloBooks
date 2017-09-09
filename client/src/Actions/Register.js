import axios from 'axios';
/**
 * 
 * @param {object} userObject
 * @returns { object} promise
 */
export function UserRegReq(userObject) {
  return dispatch => axios.post('/users', userObject);
}

