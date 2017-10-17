import axios from 'axios';

import * as types from '../Actions/actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import { getUserDetails } from '../utils/getUserInfo';


// *********************************************** //
// ******DEFINE ACTION CREATOR TO FETCH USER****** //
// *********************************************** //

/**
 * @export fetchUser
 * @param { integer } userID 
 * @returns { object } returns action type and integer, user id
 */
export function fetchUser(userID) {
  return {
    type: types.FETCH_USER,
    userID
  }
}

/**
 * 
 * 
 * @export fetchUserTrigger
 * @param { integer } userID 
 * @returns { object } axios response
 */
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


// *********************************************** //
// *DEFINE ACTION CREATOR FOR USER EDIT PROFILE**** //
// ************************************************ //

/**
 * @export
 * @param { object } newUserData 
 * @returns { object } action type and newUserData objet
 */
export function editProfileAction(newUserData) {
  return {
    type: types.EDIT_PROFILE,
    newUserData
  }
}

export function editProfile(newUserData) {
  return dispatch => {
    return axios.put(`${apiRoutes.userProfile}/${newUserData.id}`, 
    newUserData,
    { headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
      dispatch(editProfileAction(response.data.data[0]));
      console.log(response.data.data[0]);
    })
    .catch(error => {
      throw (error);
    });
  }
}
