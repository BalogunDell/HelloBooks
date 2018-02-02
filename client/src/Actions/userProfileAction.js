import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';
import { userProfile } from '../utils/apiEndPoints';
import networkErrorReporter from '../utils/networkErrorReporter';

import {
  FETCH_USER,
  SAVE_IMAGE,
  EDIT_PROFILE,
  EDIT_IMAGE,
  EDIT_PASSWORD
} from '../Actions/actionTypes';

import {
  cloudinaryUrl,
  cloudinaryPreset,
  requestHeader
} from '../utils/cloudinaryKeys';

/**
 * @export fetchUser
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
      throw (error);
    });


/**
 * @export editProfileAction
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
      throw (error);
    });

/**
 * @export editPasswordAction
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
 * @param { object } payload  
 * 
 * @returns { object } axios response
 */
export const editPassword = payload => dispatch =>
  axios.put(`${userProfile}/${getUserDetails().userId}/newpassword`,
    payload,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(editPasswordAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      throw (error);
    });

/**
 * 
 * @export saveImage
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
      throw (error);
    });
};


/**
 * @export saveImage
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
      throw (error);
    });
