import {
  GET_ALL_BOOKS,
  BORROW_BOOK,
  FETCTH_USER_BOOKS,
  CREATE_BOOK,
  RETURN_BOOK,
  GET_BOOK_ID,
  MODIFY_BOOK,
  DELETE_BOOK,
  GET_BORROWED_BOOKS,
  TRENDING_BOOKS,
} from '../actions/actionTypes';

/**
 * @export getAllBooks
 * 
 * @description Defines getAllBooks reducer
 * 
 * @param { object } state inital state
 * @param { object } action action type and payload
 * 
 * @returns { object } action performed and payload of the action
 */
const getAllBooks = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state, books: action.books.books
      };
    case BORROW_BOOK:
      return {
        ...state,
        fetchedBooks: [action.payload.bookBorrowed]
      };

    case FETCTH_USER_BOOKS:
      return {
        ...state,
        fetchedBooks: action.fetchedBooks.response
      };
    case CREATE_BOOK:
      return {
        ...state, createbook: action.bookData
      };
    case RETURN_BOOK: {
      return {
        ...state, returnBookData: action.payload.message
      };
    }
    case GET_BOOK_ID:
      return {
        ...state, currentBookId: action.bookId
      };
    case MODIFY_BOOK: {
      const newBookArray = [];
      if (state.books === undefined) {
        return state;
      }
      state.books.map((book) => {
        if (book.id === action.bookData.id) {
          newBookArray.push(action.bookData);
        } else {
          newBookArray.push(book);
        }
      });
      return {
        ...state, books: newBookArray };
    }
    case DELETE_BOOK: {
      const remainingBooks = state.books.filter((book) => {
        return book.id !== parseInt(action.deletedBook.bookId, 10);
      });
      return {
        ...state, books: remainingBooks
      };
    }
    case GET_BORROWED_BOOKS:
      return {
        ...state, allborrowedbooks: action.borrowedbooks
      };

    case TRENDING_BOOKS:
      return {
        ...state, books: action.books.trendingBooks
      };
    default:
      return state;
  }
};

export default getAllBooks;
