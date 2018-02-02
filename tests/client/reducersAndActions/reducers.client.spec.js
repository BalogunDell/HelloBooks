import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import userAccessReducer from '../../../client/src/reducers/userAccessReducer';
import booksReducer from '../../../client/src/reducers/booksReducer';
import userProfile from '../../../client/src/reducers/userProfileReducer';
import categoryReducer from '../../../client/src/reducers/categoryReducer';

// Import actions
import {
  userSignupSuccessAction,
  userLoginSuccess,
  sendEmailAction,
  resetPasswordAction,
  newGoogleAccessAction
} from '../../../client/src/Actions/userAccessAction';

import {
  getAllBooks,
  getBookId,
  borrowBookAction,
  userBooks,
  createBookAction,
  returnBookAction,
  getAdminEditBookId,
  modifyBookAction,
  deleteBookAction,
  getborrowedbooksAction,
  borrowBook,
  adminGetAllBooksAction,
  publishBookAction,
  trendingBooksAction,
  trendingBooks,
} from '../../../client/src/Actions/booksAction';

import {
  fetchUser,
  editProfileAction,
  saveImage,
} from '../../../client/src/Actions/userProfileAction';
import {
  signupResponse,
  resetPasswordResponse,
  mockBooks,
  borrowBookResponse,
  borrowedBook,
  createdBookResponse,
  editBookResponse,
  unpublishedBooks,
  publishedBooks,
  mocktrendingBooks,
  profile,
  updatedProfile,
  saveImagerResponse,
  categories,
  sampleCats,
  trendingBooksMock
} from '../mock/mockdata';

import {
  createCategoryAction,
  getCategoriesAction
} from '../../../client/src/Actions/categoryAction';

// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};
describe('User Access Reducer', () => {
  it('should return a new state when user creates an account', () => {
    const newState = userAccessReducer(initialState, userSignupSuccessAction(signupResponse));
    expect(newState.userData.responseData.message).to.equal( signupResponse.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.username).to.equal(signupResponse.responseData.username);
    expect(newState.userData.responseData.userID).to.equal(signupResponse.responseData.userID);
    expect(newState.userData.responseData.userRole).to.equal(signupResponse.responseData.userRole);
    expect(newState.userData.responseData.image).to.equal(signupResponse.responseData.image);
    expect(newState.userData.responseData.token).to.equal(signupResponse.responseData.token);
  });
  
  it('should return a new state when user logs in', () => {
    const newState = userAccessReducer(initialState, newGoogleAccessAction(signupResponse));
    expect(newState.userData.responseData.message).to.equal( signupResponse.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.username).to.equal(signupResponse.responseData.username);
    expect(newState.userData.responseData.userID).to.equal(signupResponse.responseData.userID);
    expect(newState.userData.responseData.userRole).to.equal(signupResponse.responseData.userRole);
    expect(newState.userData.responseData.image).to.equal(signupResponse.responseData.image);
    expect(newState.userData.responseData.token).to.equal(signupResponse.responseData.token);
  });


  it('should return a new state when user logs in using google button', () => {
    const newState = userAccessReducer(initialState, userLoginSuccess(signupResponse));
    expect(newState.userData.responseData.message).to.equal( signupResponse.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.username).to.equal(signupResponse.responseData.username);
    expect(newState.userData.responseData.userID).to.equal(signupResponse.responseData.userID);
    expect(newState.userData.responseData.userRole).to.equal(signupResponse.responseData.userRole);
    expect(newState.userData.responseData.image).to.equal(signupResponse.responseData.image);
    expect(newState.userData.responseData.token).to.equal(signupResponse.responseData.token);
  });

  it('should return a new state when an email is sent', () => {
    const newState = userAccessReducer(initialState, sendEmailAction(resetPasswordResponse));
    expect(newState.message).to.equal(resetPasswordResponse.message);
    expect(newState.url).to.equal(resetPasswordResponse.url);
  });

  it('should return a new state when password is changed', () => {
    const newState = userAccessReducer(initialState,
      resetPasswordAction({message: 'password changed'}));
    expect(newState.message).to.equal('password changed');
  });

  it('should return the initial state when no action is perforomed', () => {
    const newState = userAccessReducer(initialState, {});
    expect(newState).to.be.empty;
  });
});

describe('Books Reducer', () => {
  it('should return a new state when GET ALL BOOKS action is dispatched', () => {
    const newState = booksReducer(initialState, getAllBooks(mockBooks));
    expect(newState.books[0].id).to.equal(mockBooks.books[0].id);
    expect(newState.books[0].author).to.equal(mockBooks.books[0].author);
    expect(newState.books[0].title).to.equal(mockBooks.books[0].title);
    expect(newState.books[0].isbn).to.equal(mockBooks.books[0].isbn);
    expect(newState.books[0].quantity).to.equal(mockBooks.books[0].quantity);
    expect(newState.books[0].id).to.equal(mockBooks.books[0].id);
    expect(newState.books[0].description).to.equal(mockBooks.books[0].description);
    expect(newState.books[0].pages).to.equal(mockBooks.books[0].pages);
    expect(newState.books[0].year).to.equal(mockBooks.books[0].year);
    expect(newState.books[0].image).to.equal(mockBooks.books[0].image);
    expect(newState.books[0].pdf).to.equal(mockBooks.books[0].pdf);
  });

  it('should return a new state when GET BOOK ID action is dispatched', () => {
    const newState = booksReducer(initialState, getBookId(3));
    expect(newState.currentBookId).to.equal(3);
    
  });

  it('should return a new state when BORROW BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,  
      borrowBookAction(borrowBookResponse));
    expect(newState.fetchedBooks
    ).to.be.an('array');
    expect(newState.fetchedBooks.returnDate).to
      .equal(borrowBookResponse.bookBorrowed.returnDate);
    expect(newState.fetchedBooks[0].userId).to
      .equal(borrowBookResponse.bookBorrowed.userId);
    expect(newState.fetchedBooks[0].bookId).to
      .equal(borrowBookResponse.bookBorrowed.bookId);
    expect(newState.fetchedBooks[0].returnStatus).to
      .equal(borrowBookResponse.bookBorrowed.returnStatus);
  });

  it('should return a new state when FETCH USER BOOKS action is dispatched',
   () => {
    const newState = booksReducer(initialState, userBooks(borrowedBook));
    expect(newState.fetchedBooks).to.equal(borrowedBook.response);
    expect(newState.fetchedBooks.id).to.equal(borrowedBook.response.id);
    expect(newState.fetchedBooks.userId).to
      .equal(borrowedBook.response.userId);
    expect(newState.fetchedBooks.bookId).to
      .equal(borrowedBook.response.bookId);
    expect(newState.fetchedBooks.dateborrowed)
    .to.equal(borrowedBook.response.dateborrowed);
    expect(newState.fetchedBooks.expectedreturndate)
    .to.equal(borrowedBook.response.expectedreturndate);
    expect(newState.fetchedBooks.returnStatus)
    .to.equal(borrowedBook.response.returnStatus);
    expect(newState.fetchedBooks.book).to.equal(borrowedBook.response.book);
  });

  it('should return a new state when CREATE BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,
      createBookAction(createdBookResponse));
    expect(newState.createbook).to.equal(createdBookResponse);
    expect(newState.createbook).to.have.property('message');
    expect(newState.createbook.message)
    .to.equal(createdBookResponse.message);
    expect(newState.createbook).to.have.property('data');
    expect(newState.createbook.data).to.be.an('object');
    expect(newState.createbook.data.visibility)
    .to.equal(createdBookResponse.data.visibility);
    expect(newState.createbook.data.isbn)
    .to.equal(createdBookResponse.data.isbn);
    expect(newState.createbook.data.id)
    .to.equal(createdBookResponse.data.id);
    expect(newState.createbook.data.title)
    .to.equal(createdBookResponse.data.title);
    expect(newState.createbook.data.author)
    .to.equal(createdBookResponse.data.author);
    expect(newState.createbook.data.pages)
    .to.equal(createdBookResponse.data.pages);
    expect(newState.createbook.data.year)
    .to.equal(createdBookResponse.data.year);
    expect(newState.createbook.data.description)
    .to.equal(createdBookResponse.data.description);
    expect(newState.createbook.data.quantity)
    .to.equal(createdBookResponse.data.quantity);
    expect(newState.createbook.data.categoryId)
    .to.equal(createdBookResponse.data.categoryId);
    expect(newState.createbook.data.image)
    .to.equal(createdBookResponse.data.image);
    expect(newState.createbook.data.pdf)
    .to.equal(createdBookResponse.data.pdf);
    expect(newState.createbook.data.updatedAt)
    .to.equal(createdBookResponse.data.updatedAt);
    expect(newState.createbook.data.createdAt)
    .to.equal(createdBookResponse.data.createdAt);
  });

  it('should return a new state when RETURN BOOK action is dispatched', () => {
    const newState = booksReducer(initialState,
      returnBookAction({message: 'Book has been returned'}));
    expect(newState.returnBookData).to.be.an('object');
    expect(newState.returnBookData).to.have.property('message');
    expect(newState.returnBookData.message).to.equal('Book has been returned');
  });

  it('should return a new state when EDIT BOOK action is dispatched', () => {
    const newState = booksReducer(mockBooks, modifyBookAction(publishedBooks));
    expect(newState.books[0].id).to.equal(publishedBooks.id);
    expect(newState.books[0].author).to.equal(publishedBooks.author);
    expect(newState.books[0].pages).to.equal(publishedBooks.pages);
    expect(newState.books[0].title).to.equal(publishedBooks.title);
    expect(newState.books[0].quantity).to.equal(publishedBooks.quantity);
    expect(newState.books[0].visibility).to.equal(publishedBooks.visibility);
    expect(newState.books[0].categoryId).to.equal(publishedBooks.categoryId);
    expect(newState.books[0].description).to.equal(publishedBooks.description);
    expect(newState.books[0].image).to.equal(publishedBooks.image);
    expect(newState.books[0].pdf).to.equal(publishedBooks.pdf);
    expect(newState.books[0].isbn).to.equal(publishedBooks.isbn);
    expect(newState.books[0].updatedAt).to.equal(publishedBooks.updatedAt);
  });

  it('should return a new state when DELETE BOOK action is dispatched', () => {
    const newState = booksReducer(mockBooks, deleteBookAction({updatedBooks: 
      mockBooks.books}));
    expect(newState.books[0]).to.equal(mockBooks.books[0]);
  });
  
  it('should return a new state when admin tries to GET BORROWED BOOKS', () => {
    const newState = booksReducer(initialState,
      getborrowedbooksAction(borrowedBook));
    expect(newState.allborrowedbooks).to.equal(borrowedBook);
    expect(newState.allborrowedbooks.response.id).to.equal(borrowedBook.response.id);
    expect(newState.allborrowedbooks.response.userId).to
      .equal(borrowedBook.response.userId);
    expect(newState.allborrowedbooks.response.bookId).to
      .equal(borrowedBook.response.bookId);
    expect(newState.allborrowedbooks.response.dateborrowed)
    .to.equal(borrowedBook.dateborrowed);
    expect(newState.allborrowedbooks.response.expectedreturndate)
    .to.equal(borrowedBook.response.expectedreturndate);
    expect(newState.allborrowedbooks.response.returnstatus)
    .to.equal(borrowedBook.response.returnstatus);
    expect(newState.allborrowedbooks.response.approvedreturn)
    .to.equal(borrowedBook.response.approvedreturn);
    expect(newState.allborrowedbooks.response.book).to.equal(borrowedBook.response.book);
  });

  it('should return a new state with TRENDING_BOOKS action', () => {
    const newState = booksReducer(initialState,
      trendingBooksAction(trendingBooksMock));
    expect(newState.books[0]).to.have.property('isbn');
    expect(newState.books[0]).to.have.property('id');
    expect(newState.books[0]).to.have.property('title');
    expect(newState.books[0]).to.have.property('author');
    expect(newState.books[0]).to.have.property('pages');
    expect(newState.books[0]).to.have.property('description');
    expect(newState.books[0]).to.have.property('quantity');
    expect(newState.books[0]).to.have.property('categoryId');
    expect(newState.books[0]).to.have.property('image');
    expect(newState.books[0]).to.have.property('updatedAt');
    expect(newState.books[0]).to.have.property('createdAt');
  });

  it('should return the state when no action is passed', () => {
    const newState = booksReducer(initialState, 'default');
    expect(newState).to.be.an('object');
    expect(newState).to.be.empty;
  });
});

describe('User Profile Reducer', () => {
  it('should return a new state when FETCT_USER is triggered', () => {
    const newState = userProfile(initialState, fetchUser(profile.payload));
    expect(newState.id).to.equal(profile.payload.userData.id);
    expect(newState.firstname).to.equal(profile.payload.userData.firstname);
    expect(newState.lastname).to.equal(profile.payload.userData.lastname);
    expect(newState.username).to.equal(profile.payload.userData.username);
    expect(newState.email).to.equal(profile.payload.userData.email);
    expect(newState.password).to.equal(profile.payload.userData.password);
    expect(newState.passurl).to.equal(profile.payload.userData.passurl);
    expect(newState.image).to.equal(profile.payload.userData.image);
    expect(newState.createdAt).to.equal(profile.payload.userData.createdAt);
    expect(newState.updatedAt).to.equal(profile.payload.userData.updatedAt);
    expect(newState.membership).to.equal(profile.payload.userData.membership);
    expect(newState.role).to.equal(profile.payload.userData.role);
  });

  it('should return a new state when EDIT PROFILE is triggered', () => {
    const newState = userProfile(profile.user,
      editProfileAction(updatedProfile));
    expect(newState.id).to.equal(updatedProfile.user.id);
    expect(newState.firstname).to.equal(updatedProfile.user.firstname);
    expect(newState.lastname).to.equal(updatedProfile.user.lastname);
    expect(newState.username).to.equal(updatedProfile.user.username);
    expect(newState.email).to.equal(updatedProfile.user.email);
    expect(newState.password).to.equal(updatedProfile.user.password);
    expect(newState.passurl).to.equal(updatedProfile.user.passurl);
    expect(newState.image).to.equal(updatedProfile.user.image);
    expect(newState.createdAt).to.equal(updatedProfile.user.createdAt);
    expect(newState.updatedAt).to.equal(updatedProfile.user.updatedAt);
    expect(newState.membership).to.equal(updatedProfile.user.membership);
    expect(newState.role).to.equal(updatedProfile.user.role);
  });

  it('should return a new state when SAVE_IMAGE is triggered', () => {
    const newState = userProfile(initialState, saveImage(saveImagerResponse));
    expect(newState.public_id).to.equal(saveImagerResponse.public_id);
    expect(newState.version).to.equal(saveImagerResponse.version);
    expect(newState.signature).to.equal(saveImagerResponse.signature);
    expect(newState.width).to.equal(saveImagerResponse.width);
    expect(newState.height).to.equal(saveImagerResponse.height);
    expect(newState.format).to.equal(saveImagerResponse.format);
    expect(newState.resource_type).to.equal(saveImagerResponse.resource_type);
    expect(newState.created_at).to.equal(saveImagerResponse.created_at);
    expect(newState.tags).to.equal(saveImagerResponse.tags);
    expect(newState.bytes).to.equal(saveImagerResponse.bytes);
    expect(newState.type).to.equal(saveImagerResponse.type);
    expect(newState.etag).to.equal(saveImagerResponse.etag);
    expect(newState.placeholder).to.equal(saveImagerResponse.placeholder);
    expect(newState.url).to.equal(saveImagerResponse.url);
    expect(newState.secure_url).to.equal(saveImagerResponse.secure_url);
    expect(newState.original_filename).to
    .equal(saveImagerResponse.original_filename);
  });

  it('should return the state when no action is passed', () => {
    const newState = userProfile(initialState, 'default');
    expect(newState).to.be.an('object');
    expect(newState).to.be.empty;
  });
});
