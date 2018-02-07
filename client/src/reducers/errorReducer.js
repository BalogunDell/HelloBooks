import { ERROR } from '../actions/actionTypes';
/**
   * @export createCategoryReducer
   * 
   * @description Defines createCategoryReducer
   * 
   * @param { error } state initial state
   * @param { object } action action performed
   * 
   * @returns { object } type of action and payload
   */
const errorReducer = (state = { error: false }, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state, error: action.status
      };
    default:
      return state;
  }
};

export default errorReducer;
