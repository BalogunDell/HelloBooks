import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';
import books from './booksReducer';
import userProfile from './userProfileReducer';

const rootReducer = combineReducers({
  userAccess,
  books,
  userProfile
});

export default rootReducer;