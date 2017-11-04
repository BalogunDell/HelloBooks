import * as types from '../Actions/actionTypes'

export default function fetchUserReducer(state={}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state, ...action.userID
      }
    case types.EDIT_PROFILE: 
      return {
        ...state, ...action.newUserData
      }
    case types.EDIT_IMAGE:
      return {
        ...state, ...action.newImageUrl
      }
    default: 
      return state
  }
}
