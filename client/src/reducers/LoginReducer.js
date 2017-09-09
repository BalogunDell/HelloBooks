import * as types from '../Actions/actionTypes';

export default function LoginReducer(state={}, action) {
    switch(action.type) {
      case types.GET_USERS: 
        return [
          ...state, Object.assign({}, action.userLoginDetails)
        ]
      default: 
        return state
    }
}