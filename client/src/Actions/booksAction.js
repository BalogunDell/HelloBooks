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


// *********************************************************** //
// DEFINE ACTION CREATOR AND MAKE API CALL FOR GET ALL BOOKS** //
// *********************************************************** //

/**
 * @export getAllBooks
 * @param { object } books 
 * @returns { object } action type and payload
 */
const getAllBooks = (books) => {
  return {
    type: GET_ALL_BOOKS,
    books
  };
};

/**
 * @export loadAllbooks
 * @returns { object } axios response
 */
const loadAllbooks = () => (dispatch) => {
  return axios.get(userbooks).then((response) => {
    dispatch(getAllBooks(response.data));
  }).catch(() => {
  });
};

/**
 * @export getBookId
 * @param { object } bookid 
 * @returns { object } action type and payload
 */
const getBookId = (bookid) => {
  return {
    type: GET_BOOK_ID,
    bookid

  };
};

// ********************************************************** //
// *DEFINE ACTION CREATOR AND MAKE API CALL FOR BORROW BOOKS* //
// ********************************************************** //

/**
 * @export borrowBookAction
 * @param { object } bookDetails 
 * @returns { object } action type and payload
 */
const borrowBookAction = (bookDetails) => {
  return {
    type: BORROW_BOOK,
    bookDetails
  };
};


/**
 * @export borrowBook
 * @param { object } bookDetails 
 * @returns { object } action type and axios response
 */
const borrowBook = (bookDetails) => {
  return dispatch => axios.post(`${userProfile}/${getUserDetails().userId}/books`,
    bookDetails, {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(borrowBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};


// ********************************************************** //
// *DEFINE ACTION CREATOR & MAKE API CALL FOR GET USER BOOKS* //
// ********************************************************** //

/**
 * @param { object } fetchedBooks
 * @returns { object } Action Type and fetched books 
 */
const userBooks = (fetchedBooks) => {
  return {
    type: FETCTH_USER_BOOKS,
    fetchedBooks
  };
};

/**
 * @param { object } getUserBooks
 * @returns { object } axios response
 */
const getUserBooks = () => {
  return dispatch => axios.get(`${userProfile}/${getUserDetails().userId}/books`,
    {
      headers: { Authorization: getUserDetails().savedToken }
    })
    .then((response) => {
      dispatch(userBooks(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};


// ********************************************************** //
// *DEFINE ACTION CREATOR AND MAKE API CALL FOR RETURN BOOKS* //
// ********************************************************** //

/**
 * @param { object } bookid
 * @returns { object } Action Type and bookid 
 */
const returnBookAction = (bookid) => {
  return {
    type: RETURN_BOOK,
    bookid
  };
};

/**
 * @param { object } bookid
 * @returns { object } axios response 
 */
const returnBook = (bookid) => {
  return dispatch => axios.put(`${userProfile}/${getUserDetails().userId}/books`,
    bookid,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(returnBookAction(response.data.message));
    })
    .catch((error) => {
      throw (error);
    });
};

// ********************************************************** //
// **DEFINE ACTION CREATOR & MAKE API CALL FOR CREATE BOOKS** //
// ********************************************************** //

/**
 * @param { object } bookData
 * @returns { object } action type and payload => bookdata
 */
const createBookAction = (bookData) => {
  return {
    type: CREATE_BOOK,
    bookData
  };
};

/**
 * @param { object } bookData
 * @returns { object } axios response
 */
const createBook = (bookData) => {
  return dispatch => axios.post(`${books}`,
    bookData, {
      headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(createBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};

/**
 * @param { object } pdf
 * @returns { object } action type and payload => pdf
 */
const savePdf = (pdf) => {
  return {
    type: SAVE_PDF,
    pdf
  };
};

/**
 * 
 * @export savePdfToCloudinary
 * @param { object } pdf 
 * @returns { object } axios responsee
 */
const savePdfToCloudinary = (pdf) => {
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
 * @param { object } image 
 * @returns { object } action type and payload (image)
 */
const saveImage = (image) => {
  return {
    type: SAVE_IMAGE,
    image
  };
};

/**
 * 
 * @export saveImageToCloudinary
 * @param { object } image 
 * @returns { object } axios response
 */
const saveImageToCloudinary = (image) => {
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

// *********************************************** //
// **DEFINE ACTION CREATOR FOR ADMIN EDIT BOOKS** //
// ********************************************** //

/**
 * 
 * @export saveImageToCloudinary
 * @param { object } bookid 
 * @returns { object } action type and payload => bookid
 */
const getAdminEditBookId = (bookid) => {
  return {
    type: EDIT_BOOK_ID,
    bookid
  };
};

/**
 * 
 * @export modifyBookAction
 * @param { object } bookData 
 * @returns { object } action type and payload => bookData
 */
const modifyBookAction = (bookData) => {
  return {
    type: MODIFY_BOOK,
    bookData
  };
};

/**
 * 
 * @export modifyBook
 * @param { object } bookData 
 * @returns { object } action type and payload => bookData
 */
const modifyBook = (bookData) => {
  const bookId = parseInt(bookData.id, 10);
  return dispatch => axios.put(`${userbooks}/${bookId}`,
    bookData,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(modifyBookAction(response.data.data));
    })
    .catch((error) => {
      throw (error);
    });
};

// ************************************************ //
// **DEFINE ACTION CREATOR FOR ADMIN DELETE BOOKS** //
// *********************************************** //

/**
 * 
 * 
 * @export deleteBookAction method
 * @param { integer } updatedBooks 
 * @returns { object } action type and bookid
 */
const deleteBookAction = (updatedBooks) => {
  return {
    type: DELETE_BOOK,
    updatedBooks
  };
};

/**
 * @export deleteBook method
 * @param { integer } bookId 
 * @returns { object } axios response
 */
const deleteBook = (bookId) => {
  return dispatch => axios.delete(`${books}/${bookId}`, {
    headers: { Authorization: getUserDetails().savedToken }
  })
    .then((response) => {
      dispatch(deleteBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};

// ************************************************ //
// *DEFINE ACTION CREATOR FOR ADMIN BORROWED BOOKS //
// *********************************************** //

/**
 * @export getborrowedbooksAction method
 * @param { object } borrowedbooks
 * @returns { object } action type and borrowedbooks
 */
const getborrowedbooksAction = (borrowedbooks) => {
  return {
    type: GET_BORROWED_BOOKS,
    borrowedbooks
  };
};

/**
 * @export getAllBorrowedBooks method
 * @returns { object } action type and borrowedbooks
 */
const getAllBorrowedBooks = () => {
  return dispatch => axios.get(`${userbooks}/borrowedbooks`,
    { headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(getborrowedbooksAction(response.data.books));
    })
    .catch((error) => {
      throw (error);
    });
};

// ************************************************ //
// *DEFINE ACTION CREATOR FOR ADMIN GET ALL BOOKS** //
// ************************************************ //

/**
  * 
  * @param { object } unpublishedbooks 
  * @returns { objectv } action type and payload => unpublishedbooks
  */
const adminGetAllBooksAction = (unpublishedbooks) =>  {
  return {
    type: ADMIN_GET_ALLBOOKS,
    unpublishedbooks
  };
};

/**
  * @returns { object } axios response
  */
const adminGetAllBooks = () => {
  return dispatch => axios.get(`${userbooks}/all`, {
    headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(adminGetAllBooksAction(response.data.books));
    })
    .catch((error) => {
      throw (error);
    });
};

// *********************************************** //
// *DEFINE ACTION CREATOR FOR ADMIN PUBLISH BOOK* //
// ********************************************** //

/**
 * 
 * @param { integer } bookData 
 * @returns { object } axios response
 */
const publishBookAction = (bookData) => {
  return {
    type: PUBLISH_BOOK,
    bookData
  };
};

/**
  * 
  * @param { integer } bookData 
  * @returns { object } axios response
  */
const publishBook = (bookData) => {
  return dispatch => axios.post(`${userbooks}/${bookData}`, null, {
    headers: { Authorization: getUserDetails().savedToken } })
    .then((response) => {
      dispatch(publishBookAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};


// *********************************************** //
// ****DEFINE ACTION CREATOR FOR TRENDING BOOK**** //
// ********************************************** //

/**
 * 
 * @param { object } books 
 * @returns { object } axios response
 */
const trendingBooksAction = (books) => {
  return {
    type: TRENDING_BOOKS,
    books
  };
};

/**
  * 
  * @param { books } books
  * @returns { object } axios response
  */
const trendingBooks = () => {
  return dispatch => axios.get(trending)
    .then((response) => {
      dispatch(trendingBooksAction(response.data));
    })
    .catch((error) => {
      throw (error);
    });
};

export {
  getAllBooks,
  loadAllbooks,
  getBookId,
  borrowBookAction,
  borrowBook,
  userBooks,
  getUserBooks,
  returnBookAction,
  returnBook,
  createBookAction,
  createBook,
  savePdf,
  savePdfToCloudinary,
  saveImage,
  saveImageToCloudinary,
  getAdminEditBookId,
  modifyBookAction,
  modifyBook,
  deleteBookAction,
  deleteBook,
  getborrowedbooksAction,
  getAllBorrowedBooks,
  adminGetAllBooksAction,
  adminGetAllBooks,
  publishBookAction,
  publishBook,
  trendingBooksAction,
  trendingBooks
};

