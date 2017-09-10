import { combineReducers } from 'redux';
import newUserDataState from './RegisterReducer';
import loginUser from './LoginReducer';

const rootReducer = combineReducers({
  newUserDataState,
  loginUser
});

export default rootReducer;