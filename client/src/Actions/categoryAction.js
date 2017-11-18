import axios from 'axios';

import * as types from './actionTypes';
import * as apiRoutes from '../utils/apiEndPoints';
import getUserDetails from '../utils/getUserInfo';


// ***************************************************************** //
// **DEFINE ACTION CREATOR AND MAKE API CALL FOR CREATE CATEGORIES** //
// ***************************************************************** //

export function createCategoryAction(category) {
  return {
    type: types.CREATE_CATEGORY,
    category
  }
}

export function createCategory(category) {
  return dispatch => {
    return axios.post(apiRoutes.newCategory, 
      category, 
      {
        headers: {'Authorization': getUserDetails().savedToken}
      })
      .then(response => {
        dispatch(createCategoryAction(response.data));
      })
      .catch(error => {
        throw (error);
      })
  }
}

// ***************************************************************** //
// **DEFINE ACTION CREATOR AND MAKE API CALL FOR FETCH CATEGORIES** //
// ***************************************************************** //

export function getCategoriesAction(fetchedCategories) {
  return {
    type: types.GET_CATEGORIES,
    fetchedCategories
  }
}

export function getCategories() {
  return dispatch => {
    return axios.get(apiRoutes.categories, 
      {
        headers: {'Authorization': getUserDetails().savedToken}
      })
      .then(response => {
        dispatch(getCategoriesAction(response.data.categories))
      })
      .catch(error => {
        throw (error);
      })
  }
}