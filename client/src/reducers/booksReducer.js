import * as types from '../Actions/actionTypes';

const getAllBooks = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ALL_BOOKS:
      return {
        ...state, books: action.books
      };
    case types.BORROW_BOOK:
      return {
        ...state,
        bookid: action.bookDetails
      };

    case types.FETCTH_USER_BOOKS:
      return {
        ...state,
        fetchedBooks: action.fetchedBooks
      };
    case types.CREATE_BOOK:
      return {
        ...state, createbook: action.bookData
      };
    case types.RETURN_BOOK:
      return {
        ...state, returnBookData: action.bookid
      };
    case types.GET_BOOK_ID:
      return {
        ...state, currentBookId: action.bookid
      };
    case types.EDIT_BOOK_ID:
      return {
        ...state, editBookID: action.bookid
      };
    case types.MODIFY_BOOK:
      return {
        ...state, modifiedBook: action.bookData
      };
    case types.DELETE_BOOK:
      return {
        ...state, updatedBooks: action.updatedBooks
      };
    case types.GET_BORROWED_BOOKS:
      return {
        ...state, allborrowedbooks: action.borrowedbooks
      };
    case types.ADMIN_GET_ALLBOOKS:
      return {
        ...state, unpublishedbooks: action.unpublishedbooks
      };
    case types.PUBLISH_BOOK:
      return {
        ...state, publishedBook: action.bookData
      };
    default:
      return state;
  }
};

export default getAllBooks;
