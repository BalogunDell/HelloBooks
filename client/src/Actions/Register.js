import axios from 'axios';
/**
 * 
 * @param {object} userObject
 * @returns { promise } 
 */
export function UserRegReq(userObject) {
  const url = 'https://hellobooksapp.herokuapp.com/api/users/signup';
  return dispatch => {
    return axios.post(url, userObject);
  }
}

