import { ERROR } from './actionTypes';
/**
 * @export errorAction
 * 
 * @description Defines getCategoriesAction action
 * 
 * @param { boolean } status 
 * 
 * @returns { object } action type and payload
 */
const errorAction = status => ({
  type: ERROR,
  status
});

export default errorAction;

