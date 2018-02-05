import axios from 'axios';
import getUserDetails from '../utils/getUserInfo';
import { actionErrorReporter, networkErrorReporter } from '../utils/errorReporters';
import errorAction from './errorAction';

import {
  GET_ALL_BOOKS,
  BORROW_BOOK,
  FETCTH_USER_BOOKS,
  CREATE_BOOK,
  SAVE_IMAGE,
  SAVE_PDF,
  RETURN_BOOK,
  GET_BOOK_ID,
  EDIT_BOOK_ID,
  MODIFY_BOOK,
  DELETE_BOOK,
  GET_BORROWED_BOOKS,
  TRENDING_BOOKS,
} from './actionTypes';

import {
  userProfile,
  userbooks,
  trending,
} from '../utils/apiEndPoints';

import {
  cloudinaryUrl,
  cloudinaryPreset,
  requestHeader
} from '../utils/cloudinaryKeys';

/**
 * @export getAllBooks
 * 
 * @description Defines getAllBooks action
 * 
 * @param {object} books 
 * 
 * @returns {object} Action type and payload
 */
export const getAllBooks = books => ({
  type: GET_ALL_BOOKS,
  books
});

/**
  * @export loadAllbooks
  * 
  * @description Creates loadAllbooks thunk action
  *
  * @param  {object} recipeDetails the recipe details to be saved
  *
  * @return {object} dispatch object
  */
export const loadAllbooks = () => dispatch =>
  axios.get(userbooks, {
    headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(getAllBooks(response.data));
    }).catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      
      throw (error);
    });

/**
 * @export getBookId
 * 
 * @description Defines getBookId action
 * 
 * @param {object} bookId 
 * 
 * @returns {object} action type and bookId
 */
export const getBookId = bookId => ({
  type: GET_BOOK_ID,
  bookId
});


/**
 * @export borrowBookAction
 * 
 * @description Defines borrowBookAction action
 * 
 * @param {object} payload 
 * 
 * @returns {object} action type and payload
 */
export const borrowBookAction = payload => ({
  type: BORROW_BOOK,
  payload
});


/**
 * @export borrowBook
 * 
 * @description Creates borrowBook action
 * 
 * @param {object} payload 
 * 
 * @returns {object} action type and axios response
 */
export const borrowBook = payload => dispatch =>
  axios.post(`${userProfile}/${getUserDetails().userId}/books`,
    payload, {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(borrowBookAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export userBooks
 * 
 * @description Defines userBooks action
 * 
 * @param {object} fetchedBooks
 * 
 * @returns {object} Action Type and fetched books 
 */
export const userBooks = fetchedBooks => ({
  type: FETCTH_USER_BOOKS,
  fetchedBooks
});

/**
 * @export getUserBooks
 * 
 * @description Creates getUserBooks thunk action
 * 
 * @param {object} getUserBooks
 * 
 * @returns {object} axios response
 */
export const getUserBooks = () => dispatch =>
  axios.get(`${userProfile}/${getUserDetails().userId}/books`,
    {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(userBooks(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export returnBookAction
 * 
 * @description Defines returnBookAction action
 * 
 * @param {object} payload
 * 
 * @returns {object} Action Type and bookId 
 */
export const returnBookAction = payload => ({
  type: RETURN_BOOK,
  payload
});

/**
 * @export returnBook
 * 
 * @description Creates returnBook thunk action
 * 
 * @param {object} bookId
 * 
 * @returns {object} axios response 
 */
export const returnBook = bookId => dispatch =>
  axios.put(`${userProfile}/${getUserDetails().userId}/books`,
    bookId,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(returnBookAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });


/**
 * @export createBookAction
 * 
 * @description Defines createBookAction
 * 
 * @param {object} bookData
 * 
 * @returns {object} action type and payload => bookdata
 */
export const createBookAction = bookData => ({
  type: CREATE_BOOK,
  bookData

});

/**
 * @export createBook
 * 
 * @description Creates createBook thunk action
 * 
 * @param {object} bookData
 * 
 * @returns {object} axios response
 */
export const createBook = bookData => dispatch =>
  axios.post(`${userbooks}`,
    bookData, {
      headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(createBookAction(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export savePDF
 * 
 * @description Defines savePDF action
 * 
 * @param { object } PDF
 * 
 * @returns { object } t
 */
export const savePDF = PDF => ({
  type: SAVE_PDF,
  PDF
});

/**
 * @export savePDFToCloudinary
 * 
 * @description Creates savePDFToCloudinary thunk action
 * 
 * @param { object } PDF  File to save oo devlopr fa
 * 
 * @returns { object } axios responsee
 */

export const savePDFToCloudinary = (PDF) => {
  const formData = new FormData();
  formData.append('file', PDF);
  formData.append('upload_preset', cloudinaryPreset);
  return dispatch => axios.post(cloudinaryUrl,
    formData, {
      headers: { 'Content-Type': requestHeader } })
    .then((response) => {
      dispatch(savePDF(response.data));
    })
    .catch((error) => {
      networkErrorReporter(error);
      actionErrorReporter(error);
      throw (error);
    });
};

/**
 * 
 * @export saveImage
 * 
 * @description Creates saveImage action with type and image as payload
 * 
 * @param { object } image 
 * 
 * @returns { object } action type and payload (image)
 */
export const saveImage = image => ({
  type: SAVE_IMAGE,
  image
});

/**
 * 
 * @export saveImageToCloudinary
 * 
 * @description Creates saveImage thunk action
 * 
 * @param { object } image 
 * 
 * @returns { object } axios response
 */
export const saveImageToCloudinary = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return dispatch =>
    axios.post('https://api.cloudinary.com/v1_1/djvjxp2am/upload',
      formData, {
        headers: { 'Content-Type': requestHeader } })
      .then((response) => {
        dispatch(saveImage(response.data));
      })
      .catch((error) => {
        actionErrorReporter(error);
        networkErrorReporter(error);
        throw (error);
      });
};


/**
 * 
 * @export getAdminEditBookId
 * 
 * @description Defines getAdminEditBookId action
 * 
 * @param { object } bookId
 * 
 * @returns { object } action type and payload => bookId
 */
export const getAdminEditBookId = bookId => ({
  type: EDIT_BOOK_ID,
  bookId
});

/**
 * 
 * @export modifyBookAction
 * 
 * @description Defines modifyBookAction action
 * 
 * @param { object } bookData
 *  
 * @returns { object } action type and bookData as payload
 */
export const modifyBookAction = bookData => ({
  type: MODIFY_BOOK,
  bookData
});

/**
 * 
 * @export modifyBook
 * 
 * @description Creates modifyBook thunk action
 * 
 * @param { object } bookData 
 * 
 * @returns { object } action type and payload => bookData
 */
export const modifyBook = (bookData) => {
  const bookId = parseInt(bookData.id, 10);
  return dispatch => axios.put(`${userbooks}/${bookId}`,
    bookData,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(modifyBookAction(response.data.payload));
    })
    .catch((error) => {
      networkErrorReporter(error);
      if (error.response.status === 401 || 403) {
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw error;
    });
};

/**
 * 
 * @export deleteBookAction
 * 
 * @description Defines deleteBookAction action type and deletedBook
 * 
 * @param { integer } deletedBook
 * 
 * @returns { object } action type and deletedBook
 */
export const deleteBookAction = deletedBook => ({
  type: DELETE_BOOK,
  deletedBook
});

/**
 * @export deleteBook
 * 
 * @description Creates deleteBook thunk action
 * 
 * @param { integer } bookId
 * 
 * @returns { object } axios response
 */
export const deleteBook = bookId => dispatch =>
  axios.delete(`${userbooks}/${bookId}`, {
    headers: { Authorization: getUserDetails().savedToken }
  })
    .then((response) => {
      dispatch(deleteBookAction(response.data));
    })
    .catch((error) => {
      if (error.response.status === 401 || 403) {
        networkErrorReporter(error);
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export getborrowedbooksAction
 * 
 * @description Defines getborrowedbooksAction action
 * 
 * @param { object } borrowedbooks
 * 
 * @returns { object } action type and borrowedbooks
 */
export const getborrowedbooksAction = borrowedbooks => ({
  type: GET_BORROWED_BOOKS,
  borrowedbooks
});

/**
 * @export getAllBorrowedBooks
 * 
 * @description Creates getAllBorrowedBooks thunk action
 * 
 * @returns { object } action type and borrowedbooks
 */
export const getAllBorrowedBooks = () => dispatch =>
  axios.get(`${userbooks}/borrowedbooks`, {
    headers: { Authorization: getUserDetails().savedToken }
  })
    .then((response) => {
      dispatch(getborrowedbooksAction(response.data.books));
    })
    .catch((error) => {
      if (error.response.status === 401 || 403) {
        networkErrorReporter(error);
        dispatch(errorAction(true));
        error.logout = true;
      } else {
        actionErrorReporter(error);
      }
      throw (error);
    });

/**
 * @export trendingBooksAction
 * 
 * @description Defines trendingBooksAction action
 * 
 * @param { object } books
 * 
 * @returns { object } action type and payload
 */
export const trendingBooksAction = books => ({
  type: TRENDING_BOOKS,
  books
});

/**
  * 
  * @export trendingBooks
  *
  * @description Creates trendingBooks thunk action
  * 
  * @param { books } books
  *
  * @returns { object } axios response
  */
export const trendingBooks = () => dispatch => axios.get(trending)
  .then((response) => {
    dispatch(trendingBooksAction(response.data));
  })
  .catch((error) => {
    networkErrorReporter(error);
    actionErrorReporter(error);
    throw (error);
  });

