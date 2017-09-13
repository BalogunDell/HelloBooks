import types from '../Actions/actionTypes';

export default function getAllBooks(state = {}, action) {
  switch(action.types) {
    case types.GET_ALL_BOOKS: 
      return {
        ...state, 
        books: action.books
      }
  }
}