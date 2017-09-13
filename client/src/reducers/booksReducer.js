import * as types from '../Actions/actionTypes';

export default function getAllBooks(state = {}, action) {
  switch(action.type) {
    case types.GET_ALL_BOOKS: 
      return {
        ...state, 
        books: action.books
      }
    
    default:
    return state
  }
}