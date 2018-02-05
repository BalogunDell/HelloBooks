import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';
import { actionErrorReporter } from '../utils/errorReporters';
import errorAction from './errorAction';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
} from './actionTypes';

import {
  newCategory,
  categories,
} from '../utils/apiEndPoints';

/**
 * @export getCategoriesAction
 * 
 * @description Defines getCategoriesAction action
 * 
 * @param { object } fetchedCategories 
 * 
 * @returns { object } action type and payload
 */
const getCategoriesAction = fetchedCategories => ({
  type: GET_CATEGORIES,
  fetchedCategories
});

/**
 * @export getCategories
 * 
 * @description Creates getCategories thunk action
 * 
 * @returns { object } axios response
 */
const getCategories = () => dispatch =>
  axios.get(categories, {
    headers: { Authorization: getUserDetails().savedToken }
  })
    .then((response) => {
      dispatch(getCategoriesAction(response.data.categories));
    })
    .catch((error) => {
      actionErrorReporter(error);
      throw (error);
    });


/**
 * @export createCategoryAction
 * 
 * @description Defines createCategoryAction action
 * 
 * @param { object } category
 * 
 * @returns { object } action type and payload => category
 */
const createCategoryAction = category => ({
  type: CREATE_CATEGORY,
  category
});

/**
 * @export createCategory
 * 
 * @description Creates createCategory thunk action
 * 
 * @param { object } category 
 * 
 * @returns { object } axios response
 */
const createCategory = category => dispatch =>
  axios.post(newCategory,
    category,
    {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(createCategoryAction(response.data));
    })
    .catch((error) => {
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });


export {
  createCategoryAction,
  createCategory,
  getCategoriesAction,
  getCategories
};

