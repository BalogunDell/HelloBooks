import axios from 'axios';
/**
 * 
 * @param {object} userObject
 * @returns { object} promise
 */
export function UserRegReq(userObject) {
  const url = 'https://hellobooksapp.herokuapp.com/api/';
  return dispatch => axios.post(url, userObject);
}

