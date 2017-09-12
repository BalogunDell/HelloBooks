import { combineReducers } from 'redux';
import userAccess from './userAccessReducer';

const rootReducer = combineReducers({
  userAccess
});

export default rootReducer;