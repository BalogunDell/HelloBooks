import * as types from './actionTypes';
import axios from 'axios';

export function getAllBooks(books) {
  return {
    type: types.GET_ALL_BOOKS,
    books
  }
}

// make a request for books

export function loadAllbooks() {
  return (dispatch) => {
    return axios.get('http://localhost:3000/api/books').then( response => {
      dispatch(getAllBooks(response.data.books));
    }).catch(error => {
      console.log(error)
    })
  }
}