import axios from 'axios';

import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import * as cloudKeys from '../utils/cloudinaryKeys';
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
    })
    .catch(error => {
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

export function savePdf(pdf) {
  return {
    type: types.SAVE_PDF,
    pdf
  }
}

/**
 * 
 * @export savePdfToCloudinary
 * @param { object } pdf 
 * @returns { object } axios responsee
 */
export function savePdfToCloudinary(pdf) {
  
    const formData = new FormData();
    formData.append('file', pdf);
    formData.append('upload_preset', cloudKeys.cloudinaryPreset);
  
    return dispatch => {
      return axios.post(cloudKeys.cloudinaryUrl, formData, { headers: {'Content-Type' : cloudKeys.requestHeader} })
      .then(response => {
        dispatch(savePdf(response.data));
      })
      .catch(error => {
        throw(error);
      })
    }
  }

/**
 * 
 * @export saveImage
 * @param { object } image 
 * @returns { object } action type and payload (image)
 */
export function saveImage(image) {
  return {
    type: types.SAVE_IMAGE,
    image
  }
}

/**
 * 
 * @export saveImageToCloudinary
 * @param { object } image 
 * @returns { object } axios response
 */
export function saveImageToCloudinary(image) {

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudKeys.cloudinaryPreset);

  return dispatch => {
    return axios.post(cloudKeys.cloudinaryUrl, formData, { headers: {'Content-Type': cloudKeys.requestHeader} })
    .then(response => {
      dispatch(saveImage(response.data));
    })
    .catch(error => {
      throw(error);
    })
  }
}

// *********************************************** //
// **DEFINE ACTION CREATOR FOR ADMIN EDIT BOOKS** //
// ********************************************** //

export function getAdminEditBookId(bookid) {
  return {
    type: types.EDIT_BOOK_ID,
    bookid
  }
}

export function modifyBookAction(bookData) {
  return {
    type: types.MODIFY_BOOK,
    bookData
  }
}

export function modifyBook(bookData) {
  const bookId = parseInt(bookData.id);
  return dispatch => {
    return axios.put(`${apiRoutes.books}/${bookId}`,
      bookData,
    { headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
      dispatch(modifyBookAction(response.data.data));
    })
    .catch(error => {
      throw (error);
    })
  }
}

// ************************************************ //
// **DEFINE ACTION CREATOR FOR ADMIN DELETE BOOKS** //
// *********************************************** //

/**
 * 
 * 
 * @export deleteBookAction method
 * @param { integer } bookId 
 * @returns { object } action type and bookid
 */
export function deleteBookAction (updatedBooks) {
  return {
    type: types.DELETE_BOOK,
    updatedBooks
  }
}

/**
 * @export deleteBook method
 * @param { integer } bookId 
 * @returns { object } axios response
 */
export function deleteBook(bookId) {
  return dispatch => {
    return axios.delete(`${apiRoutes.books}/${bookId}`, { 
      headers: {'Authorization': getUserDetails().savedToken}
    })
    .then(response => {
      dispatch(deleteBookAction(response.data.updatedBooks));
    })
    .catch(error => {
      throw (error);
    })
  }
}

// ************************************************ //
// *DEFINE ACTION CREATOR FOR ADMIN BORROWED BOOKS //
// *********************************************** //

/**
 * @export getborrowedbooks method
 * @returns { object } action type and bookid
 */

 export function getborrowedbooksAction(borrowedbooks) {
   return {
     type: types.GET_BORROWED_BOOKS,
     borrowedbooks
   }
 }

 export function getAllBorrowedBooks() {
   return dispatch => {
     return axios.get(`${apiRoutes.books}/borrowedbooks`, {headers: {'Authorization': getUserDetails().savedToken}})
     .then(response => {
       dispatch(getborrowedbooksAction(response.data.books));
     })
     .catch(error => {
       throw (error)
     })
   }
 }

 // ************************************************ //
 // *DEFINE ACTION CREATOR FOR ADMIN GET ALL BOOKS** //
 // ************************************************ //

 /**
  * 
  * @param { object } unpublishedbooks 
  * @returns { objectv } action type
  */
 export function adminGetAllBooksAction(unpublishedbooks) {
   return {
     type: types.ADMIN_GET_ALLBOOKS,
      unpublishedbooks
   }
 }

 /**
  * @returns { object } axios response
  */
 export function adminGetAllBooks() {
   return dispatch => {
     return axios.get(`${apiRoutes.books}/all` , { headers: {'Authorization': getUserDetails().savedToken}})
     .then(response => {
        dispatch(adminGetAllBooksAction(response.data.books));
     })
     .catch(error => {
       throw (error);
     })
   }
 }

 
// *********************************************** //
// *DEFINE ACTION CREATOR FOR ADMIN PUBLISH BOOK* //
// ********************************************** //

/**
 * 
 * @param { integer } bookId 
 * @returns { object } axios response
 */
 export function publishBookAction(bookData) {
  return {
    type: types.PUBLISH_BOOK,
    bookData
  }
 }

 /**
  * 
  * @param { integer } bookData 
  * @returns { object } axios response
  */
 export function publishBook(bookData) {
  return dispatch => {
    return axios.post(`${apiRoutes.books}/${bookData}`, null, {headers: {'Authorization': getUserDetails().savedToken}})
    .then(response => {
      dispatch(publishBookAction(response.data));
    })
    .catch(error => {
      throw (error);
    });
  }
 }
