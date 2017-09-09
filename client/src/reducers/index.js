import { combineReducers } from 'redux';
import registerUser from './RegisterReducer';
import loginUser from './LoginReducer';

const rootReducer = combineReducers({
  registerUser,
  loginUser
});

export default rootReducer;