import axios from 'axios';

import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import { getUserDetails } from '../utils/getUserInfo';


export function getAllBooks(books) {
  return {
    type: types.GET_ALL_BOOKS,
    books
  }
}

export function borrowBookAction(bookDetails) {
  return {
    type: types.BORROW_BOOK,
    bookDetails
  }
}


// Make request to borrow book 

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