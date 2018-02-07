import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';
import { userProfile } from '../utils/apiEndPoints';
import { actionErrorReporter, networkErrorReporter } from '../utils/errorReporters';
import errorAction from './errorAction';
import {
  FETCH_USER,
  SAVE_IMAGE,
  EDIT_PROFILE,
  EDIT_IMAGE,
  EDIT_PASSWORD
} from '../actions/actionTypes';

import {
  cloudinaryUrl,
  cloudinaryPreset,
  requestHeader
} from '../utils/cloudinaryKeys';

/**
 * @export fetchUser
 * 
 * @description Defines fetchUser action
 * 
 * @param { integer } payload
 * 
 * @returns { object } returns action type and integer, user id
 */
export const fetchUser = payload => ({
  type: FETCH_USER,
  payload
});

/**
 * @export fetchUserTrigger
 * 
 * @description Creates fetchUserTrigger thunk action
 * 
 * @returns { object } axios response
 */
export const fetchUserTrigger = () => dispatch =>
  axios.get(`${userProfile}/${getUserDetails().userId}`,
    {
      headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(fetchUser(response.data));
    }).catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });


/**
 * @export editProfileAction
 * 
 * @description Defines editProfileAction action
 * 
 * @param { object } newUserData 
 * 
 * @returns { object } action type and newUserData objet
 */
export const editProfileAction = newUserData => ({
  type: EDIT_PROFILE,
  newUserData
});

/**
 * 
 * @export editProfile function
 * 
 * @description Creates editProfile thunk action
 * 
 * @param { object } newUserData 
 * 
 * @returns { object } axios response
 */
export const editProfile = newUserData => dispatch =>
  axios.put(`${userProfile}/${getUserDetails().userId}`,
    newUserData,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(editProfileAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export editPasswordAction
 * 
 * @description Defines editPasswordAction action
 * 
 * @param { object } payload 
 * 
 * @returns { object } action type and newUserData objet
 */
export const editPasswordAction = payload => ({
  type: EDIT_PASSWORD,
  payload
});


  /**
 * 
 * @export editPassword function
 * 
 * @description Defines editPassword thunk action
 * 
 * @param { object } payload  
 * 
 * @returns { object } axios response
 */
export const editPassword = payload => dispatch =>
  axios.put(`${userProfile}/${getUserDetails().userId}/password`,
    payload,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(editPasswordAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * 
 * @export saveImage
 * 
 * @description Defines saveImage action
 * 
 * @param { object } image 
 * 
 * @returns { object } action type and payload (image)
 */
export const saveImageToCloud = image => ({
  type: SAVE_IMAGE,
  image
});


/**
 * @export saveNewImage
 * 
 * @description Creates saveNewImage action
 * 
 * @param { object } image 
 * 
 * @returns { object } action type and newImage url (from cloudinary)
 */
export const saveNewImage = (image) => {
  const formdata = new FormData();
  formdata.append('file', image);
  formdata.append('upload_preset', cloudinaryPreset);
  return dispatch => axios.post(cloudinaryUrl, formdata,
    { headers: { 'Content-Type': requestHeader } })
    .then((response) => {
      dispatch(saveImageToCloud(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });
};


/**
 * @export saveImage
 * 
 * @description Defines saveImage action
 * 
 * @param { object } newUserData 
 * 
 * @returns { object } action type and newImage url (from cloudinary)
 */
export const saveImage = newUserData => ({
  type: EDIT_IMAGE,
  newUserData
});


/**
 * @export saveNewImageToDB
 * 
 * @description Defines saveNewImageToDB thunk action
 * 
 * @param { object } newUserData
 * 
 * @returns { object } action type and newImage url (from cloudinary)
 */
export const saveNewImageToDB = newUserData => dispatch => 
  axios.put(`${userProfile}/${getUserDetails().userId}`,
    newUserData, {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      const newUrl = response.data.user;
      dispatch(saveImage(newUrl));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });
