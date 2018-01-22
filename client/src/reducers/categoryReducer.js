import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
} from '../Actions/actionTypes';

/**
 * @export createCategoryReducer
 * @param { object } [state={}] initial state
 * @param { object } action action performed
 * @returns { object } type of action and payload
 */
export default function createCategoryReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state, category: action.category
      };
    case GET_CATEGORIES:
      return {
        ...state, categories: action.fetchedCategories
      };
    default:
      return state;
  }
}
