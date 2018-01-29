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
  ADMIN_GET_ALLBOOKS,
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
        bookId: action.bookDetails
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
        ...state, returnBookData: action.bookId
      };
    case GET_BOOK_ID:
      return {
        ...state, currentBookId: action.bookId
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
    case ADMIN_GET_ALLBOOKS:
      return {
        ...state, unpublishedbooks: action.unpublishedbooks
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
