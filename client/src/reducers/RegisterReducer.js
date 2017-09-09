import * as types from '../Actions/actionTypes';

// reducer for registering users
export default function registerUserReducer(state = {}, action) {
  switch(action.type) {
    case types.ADD_USER:
      return [
        ...state, Object.assign({}, action.userRegObject)
      ]
    default: 
      return state;
  }
}