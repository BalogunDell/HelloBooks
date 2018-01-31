import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';
import { userProfile } from '../utils/apiEndPoints';

import {
  FETCH_USER,
  SAVE_IMAGE,
  EDIT_PROFILE,
  EDIT_IMAGE,
} from '../Actions/actionTypes';

import {
  cloudinaryUrl,
  cloudinaryPreset,
  requestHeader
} from '../utils/cloudinaryKeys';

/**
 * @export fetchUser
 * 
 * @param { integer } userId
 * 
 * @returns { object } returns action type and integer, user id
 */
export const fetchUser = userId => ({
  type: FETCH_USER,
  userId
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
  axios.put(`${userProfile}/${newUserData.id}`,
    newUserData,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(editProfileAction(response.data));
    })
    .catch((error) => {
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
      throw (error);
    });
};


/**
 * @export saveImage
 * 
 * @param { object } newImage 
 * 
 * @returns { object } action type and newImage url (from cloudinary)
 */
export const saveImage = newImage => ({
  type: EDIT_IMAGE,
  newImageUrl: newImage
});


/**
 * @export saveNewImageToDB
 * 
 * @param { object } newImage
 * 
 * @returns { object } action type and newImage url (from cloudinary)
 */
export const saveNewImageToDB = newImage => dispatch => 
  axios.put(`${userProfile}/${getUserDetails().userId}`,
    newImage, {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      const newUrl = response.data.user;
      dispatch(saveImage(newUrl));
    })
    .catch((error) => {
      throw (error);
    });
