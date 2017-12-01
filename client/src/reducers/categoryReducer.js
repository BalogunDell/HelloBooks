import * as types from '../Actions/actionTypes';

/**
 * @export createCategoryReducer
 * @param { object } [state={}] initial state
 * @param { object } action action performed
 * @returns { object } type of action and payload
 */
export default function createCategoryReducer(state = {}, action) {
  switch (action.type) {
    case types.CREATE_CATEGORY:
      return {
        ...state, category: action.category
      };
    case types.GET_CATEGORIES:
      return {
        ...state, categories: action.fetchedCategories
      };
    default:
      return state;
  }
}
