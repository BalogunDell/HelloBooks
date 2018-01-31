
import {
  LOGIN_ERROR,
  CREATE_BOOK_ERROR,
  BORROW_BOOK_ERROR
} from './actionTypes';
/**
 * @description This function defines the action type and error message
 * 
 * @export loginerrorHandler
 * 
 * @param {object} errorMessage 
 * 
 * @returns {object} Action type and errorMessage
 */

export const loginerrorHandler = (errorMessage, erroStatus) => ({
  type: LOGIN_ERROR,
  errorMessage,
  erroStatus
});

/**
 * @description This function defines the action type and error message
 * 
 * @export createBookError
 * 
 * @param {object} errorMessage 
 * 
 * @param {object} errorStatus 
 * 
 * @returns {object} Action type and errorMessage
 */

export const createBookError = (errorMessage, errorStatus) => ({
  type: CREATE_BOOK_ERROR,
  errorMessage,
  errorStatus
});

/**
 * @description This function defines the action type and error message
 * 
 * @export borrowBookError
 * 
 * @param {object} errorMessage 
 * 
 * @param {boolean} errorStatus
 * 
 * @returns {object} Action type and errorMessage
 */

export const borrowBookError = (errorMessage, errorStatus) => ({
  type: BORROW_BOOK_ERROR,
  errorMessage,
  errorStatus
});
