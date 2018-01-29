import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';

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
      throw (error);
    });


/**
 * @export createCategoryAction
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
      throw (error);
    });


export {
  createCategoryAction,
  createCategory,
  getCategoriesAction,
  getCategories
};

