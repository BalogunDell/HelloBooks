import * as types from '../Actions/actionTypes'; 

export default function createCategoryReducer(state = {}, action) {
  switch(action.type) {
    case types.CREATE_CATEGORY:
      return {
        ...state, category: action.category
      }
    case types.GET_CATEGORIES:
      return {
        ...state, categories: action.fetchedCategories
      }
    break;

    default: 
      return state;
  };
}