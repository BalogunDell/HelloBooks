import * as types from '../Actions/actionTypes'

export default function fetchUserReducer(state={}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state, ...action.userID
      } 
    default: 
      return state
  }
}
