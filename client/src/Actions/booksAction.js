import axios from 'axios';

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
  ADMIN_GET_ALLBOOKS,
  PUBLISH_BOOK,
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
import getUserDetails from '../utils/getUserInfo';


/**
 * @export getAllBooks
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
  * @description Request to the API to load all books
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
    }).catch(() => {
    });
/**
 * @export getBookId
 * 
 * @param {object} bookid 
 * 
 * @returns {object} action type and booido
 */
export const getBookId = bookid => ({
  type: GET_BOOK_ID,
  bookid
});


/**
 * @export borrowBookAction
 * 
 * @param {object} bookDetails 
 * 
 * @returns {object} action type and payload
 */
export const borrowBookAction = bookDetails => ({
  type: BORROW_BOOK,
  bookDetails
});


/**
 * @export borrowBook
 * 
 * @param {object} bookDetails 
 * 
 * @returns {object} action type and axios response
 */
export const borrowBook = bookDetails => dispatch =>
  axios.post(`${userProfile}/${getUserDetails().userId}/books`,
    bookDetails, {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(borrowBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });

/**
 * @export userBooks
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
      throw (error);
    });

/**
 *  @export returnBookAction
 * 
 * @param {object} bookid
 * 
 * @returns {object} Action Type and bookid 
 */
export const returnBookAction = bookid => ({
  type: RETURN_BOOK,
  bookid
});

/**
 * @export returnBook
 * 
 * @param {object} bookid
 * 
 * @returns {object} axios response 
 */
export const returnBook = bookid => dispatch =>
  axios.put(`${userProfile}/${getUserDetails().userId}/books`,
    bookid,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(returnBookAction(response.data.message));
    })
    .catch((error) => {
      throw (error);
    });


/**
 * @export createBookAction
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
 * @param {object} bookData
 * 
 * @returns {object} axios response
 */
export const createBook = bookData => dispatch => axios.post(`${userbooks}`,
  bookData, {
    headers: { Authorization: getUserDetails().savedToken } })
  .then((response) => {
    dispatch(createBookAction(response.data));
  })
  .catch((error) => {
    throw (error);
  });

/**
 * @export savePdf
 * 
 * @param { object } pdf
 * 
 * @returns { object } t
 */
export const savePdf = pdf => ({
  type: SAVE_PDF,
  pdf
});

/**
 * @export savePdfToCloudinary
 * 
 * @param { object } pdf  File to save oo devlopr fa
 * 
 * @returns { object } axios responsee
 */

export const savePdfToCloudinary = (pdf) => {
  const formData = new FormData();
  formData.append('file', pdf);
  formData.append('upload_preset', cloudinaryPreset);
  return dispatch => axios.post(cloudinaryUrl,
    formData, {
      headers: { 'Content-Type': requestHeader } })
    .then((response) => {
      dispatch(savePdf(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};

/**
 * 
 * @export saveImage
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
 * @param { object } image 
 * 
 * @returns { object } axios response
 */
export const saveImageToCloudinary = (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', cloudinaryPreset);

  return dispatch => axios.post('https://api.cloudinary.com/v1_1/djvjxp2am/upload',
    formData, {
      headers: { 'Content-Type': requestHeader } })
    .then((response) => {
      dispatch(saveImage(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};


/**
 * 
 * @export getAdminEditBookId
 * 
 * @param { object } bookid
 * 
 * @returns { object } action type and payload => bookid
 */
export const getAdminEditBookId = bookid => ({
  type: EDIT_BOOK_ID,
  bookid
});

/**
 * 
 * @export modifyBookAction
 * 
 * @param { object } bookData
 *  
 * @returns { object } action type and payload => bookData
 */
export const modifyBookAction = bookData => ({
  type: MODIFY_BOOK,
  bookData
});

/**
 * 
 * @export modifyBook
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
      throw (error);
    });
};

/**
 * 
 * @export deleteBookAction
 * 
 * @param { integer } updatedBooks
 * 
 * @returns { object } action type and bookid
 */
export const deleteBookAction = updatedBooks => ({
  type: DELETE_BOOK,
  updatedBooks
});

/**
 * @export deleteBook
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
      throw (error);
    });

/**
 * @export getborrowedbooksAction
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
 * @export getAllBorrowedBooks method
 * 
 * @returns { object } action type and borrowedbooks
 */
export const getAllBorrowedBooks = () => dispatch =>
  axios.get(`${userbooks}/borrowedbooks`,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(getborrowedbooksAction(response.data.books));
    })
    .catch((error) => {
      throw (error);
    });

/**
  * @export adminGetAllBooksAction
  
  * @param { object } unpublishedbooks
  *
  * @returns { objectv } action type and payload => unpublishedbooks
  */
export const adminGetAllBooksAction = unpublishedbooks => ({
  type: ADMIN_GET_ALLBOOKS,
  unpublishedbooks
});

/**
  * @export adminGetAllBooks
  
  * @param { object } dispatch
  *
  * @returns { objectv } action type and payload => unpublishedbooks
  */
export const adminGetAllBooks = () => dispatch =>
  axios.get(`${userbooks}/all`, {
    headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(adminGetAllBooksAction(response.data.books));
    })
    .catch((error) => {
      throw (error);
    });


/**
 * 
 * @param { integer } bookData 
 * 
 * @returns { object } axios response
 * 
 */
export const publishBookAction = bookData => ({
  type: PUBLISH_BOOK,
  bookData
});

/**
  * 
  *@export { object }
  *
  * @param { integer } bookData
  *
  * @returns { object } axios response
  *
  */
export const publishBook = bookData => dispatch =>
  axios.post(`${userbooks}/${bookData}`, null, {
    headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(publishBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });


/**
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
  * @param { books } books
  *
  * @returns { object } axios response
  */
export const trendingBooks = () => dispatch => axios.get(trending)
  .then((response) => {
    dispatch(trendingBooksAction(response.data));
  })
  .catch((error) => {
    throw (error);
  });

