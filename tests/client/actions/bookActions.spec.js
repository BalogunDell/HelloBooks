import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import { expectation } from 'sinon';
import chai from 'chai';
import * as mockData from '../mock/mockdata';
import {
  token,
  mocktrendingBook,
  borrowBookResponse,
  borrowedBook,
  createdBookResponse,
  trendingBooksMock,
  borrowedBookMirror,
  mockBooks
} from '../mock/mockdata'

import {
  userProfile,
  userbooks,
  newCategory,
  categories,
  newPasswordUrl,
  trending,
  googleAccess
} from '../../../client/src/utils/apiEndPoints';
import { cloudinaryUrl } from '../../../client/src/utils/cloudinaryKeys';
import { userData } from '../mock/mockdata';

import getUserInfo from '../../../client/src/utils/getUserInfo';

// Import mock local storage
import mockLocalStorage from '../mock/mockDataStorage';

window.localStorage = mockLocalStorage;
mockLocalStorage.setItem('Token', token)

require('dotenv').config();

const expect = chai.expect;
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';

// Import actions and action types
import {
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
  savePDF,
  savePDFToCloudinary,
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
  trendingBooksAction,
  trendingBooks
} from '../../../client/src/actions/booksAction';

import {
  SAVE_PDF,
  SAVE_IMAGE,
  CREATE_BOOK,
  FETCTH_USER_BOOKS,
  BORROW_BOOK,
  FETCH_USER,
  GET_ALL_BOOKS,
  TRENDING_BOOKS,
  ADMIN_GET_ALLBOOKS,
  GET_BORROWED_BOOKS,
  DELETE_BOOK,
  MODIFY_BOOK,
  EDIT_BOOK_ID,
  GET_BOOK_ID,
  RETURN_BOOK,
} from '../../../client/src/actions/actionTypes'
const middleware = [thunk];
const mockStore = configureMockStore(middleware);



describe('Book actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create GET_ALL_BOOKS when fetching all books', async (done) => {
    moxios.stubRequest(userbooks, {
    status: 200,
    response: mockData.mocktrendingBooks
  })
      const expectedAction = [{
        type: GET_ALL_BOOKS,
        data: mockData.mocktrendingBooks
      }];

      const store = mockStore({});

       await store.dispatch(loadAllbooks())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.equal(expectedAction[0].type);
          expect(actions[0].books).to.be.an('array');
       });
       done();
  });

  it('should create BORROW_BOOK when a user borrows a book', async (done) => {
    const serverResponse = mockData.borrowBookResponse;

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}/books`, {
      status: 201,
      response: serverResponse
    });

    const expectedAction = {
      type: BORROW_BOOK,
      payload: serverResponse 
    };
    const store = mockStore({});
    await store.dispatch(borrowBook(serverResponse))
      .then(() => {
        
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].payload.bookBorrowed.id).to
          .equal(expectedAction.payload.bookBorrowed.id);
        expect(actions[0].payload.bookBorrowed.returnDate).to
          .equal(expectedAction.payload.bookBorrowed.returnDate);
        expect(actions[0].payload.bookBorrowed.bookId).to
          .equal(expectedAction.payload.bookBorrowed.bookId);
        expect(actions[0].payload.bookBorrowed.userId).to
          .equal(expectedAction.payload.bookBorrowed.userId);
        expect(actions[0].payload.bookBorrowed.returnStatus).to
          .equal(expectedAction.payload.bookBorrowed.returnStatus);
        expect(actions[0].payload.bookBorrowed.book).to
          .equal(expectedAction.payload.bookBorrowed.book);
      });
      done();
  });

  it('should create FETCH_USER_BOOKS when user visits history component',
  async (done) => {
    const serverResponse = mockData.borrowedBook;

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}/books`, {
      status: 200,
      response: serverResponse
    })
    const expectedAction = {
      type: FETCTH_USER_BOOKS,
      fetchedBooks: serverResponse
    };
    const store = mockStore({});
    await store.dispatch(getUserBooks(serverResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].fetchedBooks.response).to
          .equal(expectedAction.fetchedBooks.response);
        expect(actions[0].fetchedBooks.response.id).to
          .equal(expectedAction.fetchedBooks.response.id);
        expect(actions[0].fetchedBooks.response.userId).to
          .equal(expectedAction.fetchedBooks.response.userId);
        expect(actions[0].fetchedBooks.response.bookId).to
          .equal(expectedAction.fetchedBooks.response.bookId);
        expect(actions[0].fetchedBooks.response.dateborrowed).to
          .equal(expectedAction.fetchedBooks.response.dateborrowed);
        expect(actions[0].fetchedBooks.response.expectedreturndate).to
          .equal(expectedAction.fetchedBooks.response.expectedreturndate);
        expect(actions[0].fetchedBooks.response.returnstatus).to
          .equal(expectedAction.fetchedBooks.response.returnstatus);
        expect(actions[0].fetchedBooks.response.book).to
          .equal(expectedAction.fetchedBooks.response.book);
      });
      done();
  });


  it('should create RETURN_BOOK when user returns a book', async (done) => {

    const serverRes = {
      message: "Book has been returned"
    };

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}/books`, {
      status: 201,
      response: serverRes
    });
    

    const expectedAction = {
      type: RETURN_BOOK,
      payload: serverRes
    };
    const store = mockStore({});
    await store.dispatch(returnBook({bookId: 3}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].payload.message).to
          .equal(expectedAction.payload.message);
      });
      done();
  });

  it('should create CREATE_BOOK when admin creates a book', async (done) => {
    
    const serverRes = mockData.createdBookResponse;

    moxios.stubRequest(userbooks, {
      status:201,
      response: serverRes
    });
     
    const expectedAction = {
      type: CREATE_BOOK,
      bookData: serverRes
    };
    const store = mockStore({});
    await store.dispatch(createBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].bookData).to.equal(expectedAction.bookData);
        expect(actions[0].bookData).to.have.property('message');
        expect(actions[0].bookData.message).to
        .equal(expectedAction.bookData.message);
        expect(actions[0].bookData.payload.id).to
        .equal(expectedAction.bookData.payload.id);
        expect(actions[0].bookData.payload.author).to
        .equal(expectedAction.bookData.payload.author);
        expect(actions[0].bookData.payload.title).to
        .equal(expectedAction.bookData.payload.title);
        expect(actions[0].bookData.payload.year).to
        .equal(expectedAction.bookData.payload.year);
        expect(actions[0].bookData.payload.description).to
        .equal(expectedAction.bookData.payload.description);
        expect(actions[0].bookData.payload.image).to
        .equal(expectedAction.bookData.payload.image);
        expect(actions[0].bookData.payload.categoryId).to
        .equal(expectedAction.bookData.payload.categoryId);
        expect(actions[0].bookData.payload.quantity).to
        .equal(expectedAction.bookData.payload.quantity);
        expect(actions[0].bookData.payload.isbn).to
        .equal(expectedAction.bookData.payload.isbn);
      });
      done();
  });

  it('should create DELETE_BOOK when admin deletes a book', async (done) => {
    
    const serverRes = mockData.trendingBooksMock.trendingBooks[0]
    const bookId = 1
    moxios.stubRequest(`${userbooks}/${1}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: DELETE_BOOK,
      updatedBooks: serverRes
    };
    const store = mockStore({});
    await store.dispatch(deleteBook(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].deletedBook).to.equal(expectedAction.updatedBooks);
      });
      done();
  });

  it('should create GET_BORROWED_BOOKS when getAllBorrowedBooks is triggered', 
  async (done) => {
    
    const serverRes = mockData.borrowedBookMirror;
    moxios.stubRequest(`${userbooks}/borrowedbooks`, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: GET_BORROWED_BOOKS,
      borrowedbooks: serverRes
    };
    const store = mockStore({});
    await store.dispatch(getAllBorrowedBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].borrowedbooks).to
        .equal(expectedAction.borrowedbooks.books);
        expect(actions[0].borrowedbooks[0].userId).to
        .equal(expectedAction.borrowedbooks.books[0].userId);
        expect(actions[0].borrowedbooks[0].bookId).to
        .equal(expectedAction.borrowedbooks.books[0].bookId);
        expect(actions[0].borrowedbooks[0].dateborrowed).to
        .equal(expectedAction.borrowedbooks.books[0].dateborrowed);
        expect(actions[0].borrowedbooks[0].expectedreturndate).to
        .equal(expectedAction.borrowedbooks.books[0].expectedreturndate);
        expect(actions[0].borrowedbooks[0].book).to
        .equal(expectedAction.borrowedbooks.books[0].book);
      });
      done();
  });


  it('should create TRENDING_BOOKS when the app loads', async (done) => {
    
    const serverRes = mockData.mockBooks.books;
    moxios.stubRequest(trending, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: TRENDING_BOOKS,
      books: serverRes
    };
    const store = mockStore({});
    await store.dispatch(trendingBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].books[0]).to.equal(expectedAction.books[0]);
        expect(actions[0].books[0].id).to
        .equal(expectedAction.books[0].id);
        expect(actions[0].books[0].author).to
        .equal(expectedAction.books[0].author);
        expect(actions[0].books[0].visibility).to
        .equal(expectedAction.books[0].visibility);
        expect(actions[0].books[0].isbn).to
        .equal(expectedAction.books[0].isbn);
        expect(actions[0].books[0].pages).to
        .equal(expectedAction.books[0].pages);
        expect(actions[0].books[0].year).to
        .equal(expectedAction.books[0].year);
        expect(actions[0].books[0].description).to
        .equal(expectedAction.books[0].description);
        expect(actions[0].books[0].quantity).to
        .equal(expectedAction.books[0].quantity);
        expect(actions[0].books[0].image).to
        .equal(expectedAction.books[0].image);
        expect(actions[0].books[0].pdf).to
        .equal(expectedAction.books[0].pdf);
        expect(actions[0].books[0].categoryId).to
        .equal(expectedAction.books[0].categoryId);
      });
      done();
  });
});



