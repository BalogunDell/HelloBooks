import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';
import books from './booksReducer';

const rootReducer = combineReducers({
  userAccess,
  books
});

export default rootReducer;