import * as types from '../Actions/actionTypes';

/**
 * 
 * 
 * @export fetchUserReducer
 * @param { object } [state={}] inital state
 * @param { object } action action type and payload
 * @returns { object } action performed and payload of the action
 */
export default function fetchUserReducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state, ...action.userID
      };
    case types.EDIT_PROFILE:
      return {
        ...state, ...action.newUserData
      };
    case types.EDIT_IMAGE:
      return {
        ...state, ...action.newImageUrl
      };
    default:
      return state;
  }
}
