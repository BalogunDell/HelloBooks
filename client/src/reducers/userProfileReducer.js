import {
  FETCH_USER,
  EDIT_PROFILE,
  EDIT_IMAGE,
} from '../Actions/actionTypes';

/**
 * 
 * 
 * @export fetchUserReducer
 * 
 * @param { object } state inital state
 * @param { object } action action type and payload
 * 
 * @returns { object } action performed and payload of the action
 */
const fetchUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state, ...action.userId.user
      };
    case EDIT_PROFILE:
      return {
        ...state, ...action.newUserData.user
      };
    case EDIT_IMAGE:
      return {
        ...state, ...action.newImageUrl
      };
    default:
      return state;
  }
};

export default fetchUserReducer;

