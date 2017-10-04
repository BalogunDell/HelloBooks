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
        dispatch(userBooks(response.data.books))
      })
      .catch(error => {
        throw (error)
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
      console.log(response);
    })
    .catch(error=> {
      console.log(error)
    })
  }
}
