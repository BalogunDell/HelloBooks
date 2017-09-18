import axios from 'axios';

import * as types from '../Actions/actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import { getUserDetails } from '../utils/getUserInfo';


export function fetchUser(userID) {
  return {
    type: types.FETCH_USER,
    userID
  }
}

export function fetchUserTrigger(userID) {
  return dispatch => {
    return axios.get(`${apiRoutes.userProfile}/${getUserDetails().userId}`, {headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
        dispatch(fetchUser(response.data))
    }).catch(error => {
      throw (error)
    })
  }
}
