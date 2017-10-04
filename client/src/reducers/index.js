import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';
import books from './booksReducer';
import userProfile from './userProfileReducer';
import createCategory from './categoryReducer';

const rootReducer = combineReducers({
  userAccess,
  userProfile,
  books,
  createCategory
});

export default rootReducer;