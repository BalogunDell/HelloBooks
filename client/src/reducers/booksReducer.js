import * as types from '../Actions/actionTypes';

const getAllBooks = (state = {}, action) => {
  switch(action.type) {
    case types.GET_ALL_BOOKS: 
      return {
        ...state, 
        books: action.books
      }
      
      case types.BORROW_BOOK: 
        return {
          ...state, 
          bookid: action.bookDetails
        }
    default:
      return state
  }
}

export default getAllBooks;