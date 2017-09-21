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

      case types.FETCTH_USER_BOOKS: 
        return {
          ...state, ...action.fetchedBooks
        }
    default:
      return state
  }
}

export default getAllBooks;