import axios from 'axios';

import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import { getUserDetails } from '../utils/getUserInfo';


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR GET ALL BOOKS** //
// *********************************************************** //

export function getAllBooks(books) {
  return {
    type: types.GET_ALL_BOOKS,
    books
  }
}

// make a request for books
export function loadAllbooks() {
  return (dispatch) => {
    return axios.get(apiRoutes.books).then( response => {
      dispatch(getAllBooks(response.data.books));
    }).catch(error => {
      console.log(error)
    })
  }
}

export function getBookId(bookid) {
  return {
    type: types.GET_BOOK_ID,
    bookid

  }
}

// ********************************************************** //
// *DEFINE ACTION CREATOR AND MAKE API CALL FOR BORROW BOOKS* //
// ********************************************************** //

export function borrowBookAction(bookDetails) {
  return {
    type: types.BORROW_BOOK,
    bookDetails
  }
}


export function borrowBook(bookDetails) {
  return dispatch => {
    return axios.post(`${apiRoutes.userProfile}/${getUserDetails().userId}/books`, 
      bookDetails, {
        headers: {'Authorization': getUserDetails().savedToken}
      })
      .then(response => {
        dispatch(borrowBookAction(response.data))
      })
      .catch(error => {
        throw (error)
      })
  }
}


// ********************************************************** //
// *DEFINE ACTION CREATOR & MAKE API CALL FOR GET USER BOOKS* //
// ********************************************************** //

/***
 * 
 * @param { object } fetchedBooks
 * @returns { object } Action Type and fetched books 
 */
export function userBooks(fetchedBooks) {
  return {
    type: types.FETCTH_USER_BOOKS,
    fetchedBooks
  }
}

export function getUserBooks() {
  return dispatch => {
    return axios.get(`${apiRoutes.userProfile}/${getUserDetails().userId}/books`,  
      {
        headers: {'Authorization': getUserDetails().savedToken}
      }
      ).then(response => {
        dispatch(userBooks(response.data));
      })
      .catch(error => {
        throw (error)
      })
  }
}


// ********************************************************** //
// *DEFINE ACTION CREATOR AND MAKE API CALL FOR RETURN BOOKS* //
// ********************************************************** //

export function returnBookAction(bookid) {
  return{
    type: types.RETURN_BOOK,
    bookid
  }
}

export function returnBook(bookid) {
  return dispatch => {
    return axios.put(`${apiRoutes.userProfile}/${getUserDetails().userId}/books`, 
    bookid,
    {headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
      dispatch(returnBookAction(response.data.message));
      console.log(response.data.message);
    })
    .catch(error => {
      console.log(error);
    })
  }
}

// ********************************************************** //
// **DEFINE ACTION CREATOR & MAKE API CALL FOR CREATE BOOKS** //
// ********************************************************** //

export function createBookAction(bookData) {
  return {
    type: types.CREATE_BOOK,
    bookData
  }
} 

export function createBook(bookData) {
  return dispatch => {
    return axios.post(`${apiRoutes.books}` , bookData, { headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
      dispatch(createBookAction(response.data.message));
    })
    .catch(error=> {
      throw (error);
    })
  }
}

export function saveImage(image) {
  return {
    type: types.SAVE_IMAGE,
    image
  }
}


export function saveImageToCloudinary(image) {

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/djvjxp2am/upload';
  const cloudinaryPreset = 'vlamwg7y';
  const requestHeader = 'application/x-www-form-urlencoded';

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return dispatch => {
    return axios.post(cloudinaryUrl, formData, { headers: {'Content-Type' : requestHeader} })
    .then(response => {
      dispatch(saveImage(response.data));
    })
    .catch(error => {
      throw(error);
    })
  }
}