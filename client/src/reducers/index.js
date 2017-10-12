import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';
import books from './booksReducer';
import userProfile from './userProfileReducer';
import createCategory from './categoryReducer';
import uploadFiles from './uploadReducer';

const rootReducer = combineReducers({
  userAccess,
  userProfile,
  books,
  createCategory,
  uploadFiles
});

export default rootReducer;