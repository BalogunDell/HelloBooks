import axios from 'axios';

import {
  FETCH_USER,
  SAVE_IMAGE,
  EDIT_PROFILE,
  EDIT_IMAGE,
} from '../Actions/actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import * as cloudKeys from '../utils/cloudinaryKeys';
import getUserDetails from '../utils/getUserInfo';


// *********************************************** //
// ******DEFINE ACTION CREATOR TO FETCH USER****** //
// *********************************************** //

/**
 * @export fetchUser
 * @param { integer } userID 
 * @returns { object } returns action type and integer, user id
 */
const fetchUser = (userID) => {
  return {
    type: FETCH_USER,
    userID
  };
};

/**
 * 
 * 
 * @export fetchUserTrigger
 * @returns { object } axios response
 */
const fetchUserTrigger = () => {
  return (dispatch) => {
    return axios.get(`${apiRoutes.userProfile}/${getUserDetails().userId}`,
      {
        headers: { Authorization: getUserDetails().savedToken } })
      .then((response) => {
        dispatch(fetchUser(response.data));
      }).catch((error) => {
        throw (error);
      });
  };
};


// *********************************************** //
// *DEFINE ACTION CREATOR FOR USER EDIT PROFILE**** //
// ************************************************ //

/**
 * @export
 * @param { object } newUserData 
 * @returns { object } action type and newUserData objet
 */
const editProfileAction = (newUserData) => {
  return {
    type: EDIT_PROFILE,
    newUserData
  };
};

/**
 * 
 * @export editProfile function
 * @param { object } newUserData 
 * @returns { object } axios response
 */
const editProfile = (newUserData) => {
  return (dispatch) => {
    return axios.put(`${apiRoutes.userProfile}/${newUserData.id}`,
      newUserData,
      { headers: { Authorization: getUserDetails().savedToken } })
      .then((response) => {
        dispatch(editProfileAction(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
};

// ****************************************************** //
// *DEFINE ACTION CREATOR FOR USER EDIT PROFIL IMAGEE**** //
// ****************************************************** //


/**
 * 
 * @export saveImage
 * @param { object } image 
 * @returns { object } action type and payload (image)
 */
const saveImageToCloud = (image) => {
  return {
    type: SAVE_IMAGE,
    image
  };
};


/**
 * @export saveNewImage
 * @param { object } image 
 * @returns { object } action type and newImage url (from cloudinary)
 */
const saveNewImage = (image) => {
  const formdata = new FormData();
  formdata.append('file', image);
  formdata.append('upload_preset', cloudKeys.cloudinaryPreset);
  return (dispatch) => {
    return axios.post(cloudKeys.cloudinaryUrl, formdata,
      { headers: { 'Content-Type': cloudKeys.requestHeader } })
      .then((response) => {
        dispatch(saveImageToCloud(response.data));
      })
      .catch((error) => {
        throw (error);
      });
  };
};


// ****************************************************** //
// *DEFINE ACTION CREATOR FOR USER EDIT PROFIL IMAGEE**** //
// ****************************************************** //

/**
 * @export
 * @param { object } newImage 
 * @returns { object } action type and newImage url (from cloudinary)
 */
const saveImage = (newImage) => {
  return {
    type: EDIT_IMAGE,
    newImageUrl: newImage
  };
};


/**
 * @export saveNewImageToDB
 * @param { object } newImage 
 * @returns { object } action type and newImage url (from cloudinary)
 */
const saveNewImageToDB = (newImage) => {
  return (dispatch) => {
    return axios.put(`${apiRoutes.userProfile}/${getUserDetails().userId}`,
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
  };
};

export {
  fetchUser,
  fetchUserTrigger,
  editProfileAction,
  editProfile,
  saveImageToCloud,
  saveNewImage,
  saveImage,
  saveNewImageToDB
};
