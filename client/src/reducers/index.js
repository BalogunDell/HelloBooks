import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';
import books from './booksReducer';
import userProfile from './userProfileReducer';
import loadedCategories from './categoryReducer';
import uploadFiles from './uploadReducer';
import accessStatus from './errorReducer';

/**
 * @export rootReducer
 * 
 * @description Defines root reducer for store
 * 
 * @returns { object } type of action and payload
 */
const rootReducer = combineReducers({
  userAccess,
  userProfile,
  books,
  loadedCategories,
  uploadFiles,
  accessStatus
});

export default rootReducer;
