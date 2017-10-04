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
          ...state, 
          fetchedUserBooks: action.fetchedBooks
        }
      case types.CREATE_BOOK: 
        return {
          ...state, createbook: action.bookData
        }
    default:
      return state
  }
}

export default getAllBooks;