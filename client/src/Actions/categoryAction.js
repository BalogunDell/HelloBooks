import axios from 'axios';
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
} from './actionTypes';
import {
  newCategory,
  categories,
} from '../utils/apiEndPoints';
import getUserDetails from '../utils/getUserInfo';


// ***************************************************************** //
// **DEFINE ACTION CREATOR AND MAKE API CALL FOR FETCH CATEGORIES** //
// ***************************************************************** //

/**
 * @export getCategoriesAction
 * @param { object } fetchedCategories 
 * @returns { object } action type and payload => fetchedCategories
 */
const getCategoriesAction = (fetchedCategories) => {
  return {
    type: GET_CATEGORIES,
    fetchedCategories
  };
};

/**
 * @export getCategories
 * @returns { object } axios response
 */
const getCategories = () => {
  return (dispatch) => {
    return axios.get(categories,
      {
        headers: { Authorization: getUserDetails().savedToken }
      })
      .then((response) => {
        dispatch(getCategoriesAction(response.data.categories));
      })
      .catch((error) => {
        throw (error);
      });
  };
};

// ***************************************************************** //
// **DEFINE ACTION CREATOR AND MAKE API CALL FOR CREATE CATEGORIES** //
// ***************************************************************** //

/**
 * @export createCategoryAction
 * @param { object } category 
 * @returns { object } action type and payload => category
 */
const createCategoryAction = (category) => {
  return {
    type: CREATE_CATEGORY,
    category
  };
};

/**
 * @export createCategory
 * @param { object } category 
 * @returns { object } axios response
 */
const createCategory = (category) => {
  return (dispatch) => {
    return axios.post(newCategory,
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
  };
};


export {
  createCategoryAction,
  createCategory,
  getCategoriesAction,
  getCategories
};

