import {
  LOGIN_ERROR,
  CREATE_BOOK_ERROR,
  BORROW_BOOK_ERROR
} from '../Actions/actionTypes';

/**
 * @export createCategoryReducer
 * 
 * @param { object } state initial state
 * @param { object } action action performed
 * 
 * @returns { object } type of action and payload
 */
export default function errorReducer(state = '', action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage.message,
        errorStatus: action.errorStatus
      };
    case CREATE_BOOK_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage.message,
        errorStatus: action.errorStatus
      };
    default:
      return state;
  }
}
