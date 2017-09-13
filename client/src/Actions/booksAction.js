import types from './actionTypes';
import axios from 'axios';

export function getAllBooks(books) {
  type: types.GET_ALL_BOOKS,
  books
}

// make a request for books

export function loadAllbooks() {
  return (dispatch) => {
    return axios.get()
  }
}