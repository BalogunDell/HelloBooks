import {
  GET_ALL_BOOKS,
  BORROW_BOOK,
  FETCTH_USER_BOOKS,
  CREATE_BOOK,
  RETURN_BOOK,
  GET_BOOK_ID,
  EDIT_BOOK_ID,
  MODIFY_BOOK,
  DELETE_BOOK,
  GET_BORROWED_BOOKS,
  ADMIN_GET_ALLBOOKS,
  PUBLISH_BOOK,
  TRENDING_BOOKS,
} from '../Actions/actionTypes';

const getAllBooks = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_BOOKS:
      return {
        ...state, books: action.books.books
      };
    case BORROW_BOOK:
      return {
        ...state,
        bookid: action.bookDetails
      };

    case FETCTH_USER_BOOKS:
      return {
        ...state,
        fetchedBooks: action.fetchedBooks
      };
    case CREATE_BOOK:
      return {
        ...state, createbook: action.bookData
      };
    case RETURN_BOOK:
      return {
        ...state, returnBookData: action.bookid
      };
    case GET_BOOK_ID:
      return {
        ...state, currentBookId: action.bookid
      };
    case EDIT_BOOK_ID:
      return {
        ...state, editBookID: action.bookid
      };
    case MODIFY_BOOK: {
      const newBookArray = [];
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
    case DELETE_BOOK:
      return {
        ...state, updatedBooks: action.updatedBooks.updatedBooks
      };
    case GET_BORROWED_BOOKS:
      return {
        ...state, allborrowedbooks: action.borrowedbooks
      };
    case ADMIN_GET_ALLBOOKS:
      return {
        ...state, unpublishedbooks: action.unpublishedbooks
      };
    case PUBLISH_BOOK:
      return {
        ...state, publishedBook: action.bookData
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
