import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import chai from 'chai';
import * as mockData from './mocks/mockdata';
import {
  signup,
  signin,
  userProfile,
  userbooks,
  newCategory,
  categories,
  newPasswordUrl,
  trending,
  googleAccess
} from '../../client/src/utils/apiEndPoints.js';

import getUserInfo from '../../client/src/utils/getUserInfo';

// Import mock local storage
import mockLocalStorage from './mocks/mockDataStorage';
window.localStorage = mockLocalStorage;

require('dotenv').config();

const expect = chai.expect;
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';

// Import actions and action types
import {
  userSignupSuccessAction,
  saveNewUser,
  userLoginSuccess,
  userLogin,
  sendEmailAction,
  sendEmail,
  resetPasswordAction,
  resetPassword,
  newGoogleAccessAction,
  newGoogleAccess
} from '../../client/src/Actions/userAccessAction';
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
} from '../../client/src/Actions/booksAction';
import {
  userSignupSuccessAction,
  saveNewUser,
  userLoginSuccess,
  userLogin,
  sendEmailAction,
  sendEmail,
  resetPasswordAction,
  resetPassword,
  newGoogleAccessAction,
  newGoogleAccess
} from '../../client/src/Actions/userProfileAction';
import {
  createCategory,
  getCategories
} from '../../client/src/Actions/categoryAction';
import * as actionTypes from '../../client/src/Actions/actionTypes'

import Home from '../../client/src/components/home/Home';
import Books from '../../client/src/components/books/Books';
import Book from '../../client/src/components/books/book';
import { expectation } from 'sinon';
import { cloudinaryUrl } from '../../client/src/utils/cloudinaryKeys';
import { userData } from './mocks/mockdata';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});


// ************************ //
// *****THUNK TEST**** //
// ************************ //
describe('THUNK FUNCTIONS', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  let uniqueUrl = '';
  it('should create GET_ALL_BOOKS when fetching all books', async (done) => {
    moxios.stubRequest('/api/v1/books', {
    status: 200,
    response: mockData.mocktrendingBook
  })
      
      const expectedAction = [{
        type: actionTypes.GET_ALL_BOOKS,
        data: mockData.mocktrendingBook
      }];
       await store.dispatch(loadAllbooks())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.equal(expectedAction[0].type);
          expect(actions[0].books).to.be.an('array');
       });
       done();
  });

  it('should create ADD_USER when a user signs up', async (done) => {
    const signupResponse = mockData.signupResponse
    moxios.stubRequest(signup, {
      status: 201,
      response: signupResponse
    });

    const expectedAction = {
      type: actionTypes.ADD_USER,
      userSignupData:signupResponse
    };

    // Dispatch
    await store.dispatch(saveNewUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[1].type).to.equal(expectedAction.type);
        expect(actions[1].userSignupData).to.have.property('message');
        expect(actions[1].userSignupData).to.have.property('username');
        expect(actions[1].userSignupData).to.have.property('userID');
        expect(actions[1].userSignupData).to.have.property('token');
        expect(actions[1].userSignupData).to.have.property('userID');
        expect(actions[1].userSignupData).to.have.property('userRole');
        expect(actions[1].userSignupData).to.have.property('image');
      });
      done();
  });

  it('should create LOGIN when a user signs in', async (done) => {
    const signinResponse = mockData.signupResponse
    moxios.stubRequest(signin, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: actionTypes.LOGIN,
      abbey:signinResponse
    };

    const thisstore = mockStore({});
    // Dispatch
    await store.dispatch(userLogin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[2].type).to.equal(expectedAction.type);
        expect(actions[2].loginData).to.have.property('message');
        expect(actions[2].loginData).to.have.property('username');
        expect(actions[2].loginData).to.have.property('userID');
        expect(actions[2].loginData).to.have.property('token');
        expect(actions[2].loginData).to.have.property('userID');
        expect(actions[2].loginData).to.have.property('userRole');
        expect(actions[2].loginData).to.have.property('image');
      });
      done();
  });

  it('should create a SEND_EMAIL when user wants to reset password', async (done) => {
    const resetPasswordResponse = mockData.resetPasswordResponse;

    // Simulate and intercept call to endpoint
    moxios.stubRequest(newPasswordUrl, {
      status: 200, 
      response: resetPasswordResponse
    });

    const expectedAction = {
      type: actionTypes.SEND_EMAIL,
      serverRes: resetPasswordResponse
    };

    // Dispatch
    await store.dispatch(sendEmail({email: 'delighteddellW@gmail'}))
      .then(() => {
        const actions = store.getActions();
        uniqueUrl = actions[3].serverRes.url;
        expect(actions[3].type).to.equal(expectedAction.type);
        expect(actions[3].serverRes.message).to.equal(expectedAction.serverRes.message);
        expect(actions[3].serverRes.url).to.equal(expectedAction.serverRes.url);
      });
      done();
  });

  it('should create RESET_PASSWORD when user resets password using unique url', async (done) => {
    const serverRes = { message: "Your password has been successfully updated" };

    // Simulate and intercept call to endpoint
    moxios.stubRequest(`${newPasswordUrl}/${uniqueUrl}`,
    {
      status: 201,
      response: serverRes
    });

    const expectedAction = {
      type: actionTypes.RESET_PASS,
      newPassword: serverRes
    };

    // Dispatch
    await store.dispatch(resetPassword(serverRes, uniqueUrl))
      .then(() => {
        const actions = store.getActions(); 
        expect(actions[4].type).to.equal(expectedAction.type);
        expect(actions[4].newPassword).to.equal(expectedAction.newPassword);
    })
      done();
  });

  it('should create a EDIT_IMAGE when users edit profile image', async (done) => {
    const serverRes = mockData.profile;
    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}`, {
      status: 201,
      response: serverRes
    }); 
    
    // Expected response
    const expectedAction = {
      type: actionTypes.EDIT_IMAGE,
      newImageUrl: serverRes
    }
    await store.dispatch(saveNewImageToDB(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[5].type).to.equal(expectedAction.type);
        expect(actions[5].newImageUrl).to.equal(expectedAction.newImageUrl.user);
        expect(actions[5].newImageUrl.image).to.equal(expectedAction.newImageUrl.user.image);
      });
      done();
  });

  it('should create FETCH_USER when a user logs in', async (done) => {
    const fetchedUser = mockData.profile.user;

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}`, {
      status: 200,
      response:fetchedUser
    });

    const expectedAction = {
      type: actionTypes.FETCH_USER,
      userID: fetchedUser
    };

    await store.dispatch(fetchUserTrigger())
      .then(() => {
        const actions = store.getActions();
        expect(actions[6].type).to.equal(expectedAction.type);
        expect(actions[6].userID).to.equal(expectedAction.userID);
        expect(actions[6].userID.firstname).to.equal(expectedAction.userID.firstname);
        expect(actions[6].userID.lastname).to.equal(expectedAction.userID.lastname);
        expect(actions[6].userID.email).to.equal(expectedAction.userID.email);
        expect(actions[6].userID.username).to.equal(expectedAction.userID.username);
        expect(actions[6].userID.image).to.equal(expectedAction.userID.image);
        expect(actions[6].userID.firstname).to.equal(expectedAction.userID.firstname);
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
      type: actionTypes.BORROW_BOOK,
      bookDetails: serverResponse 
    };

    await store.dispatch(borrowBook(serverResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[7].type).to.equal(expectedAction.type);
        expect(actions[7].bookDetails).to.equal(expectedAction.bookDetails);
        expect(actions[7].bookDetails).to.have.property('message');
        expect(actions[7].bookDetails.message).to.equal(expectedAction.bookDetails.message);
        expect(actions[7].bookDetails).to.have.property('returnDate');
        expect(actions[7].bookDetails.returnDate).to.equal(expectedAction.bookDetails.returnDate);
      });
      done();
  });

  it('should create FETCH_USER_BOOKS when user visits history component', async (done) => {
    const serverResponse = mockData.borrowedBook;

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}/books`, {
      status: 200,
      response: serverResponse
    })
    const expectedAction = {
      type: actionTypes.FETCTH_USER_BOOKS,
      fetchedBooks: serverResponse
    };

    await store.dispatch(getUserBooks(serverResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[8].type).to.equal(expectedAction.type);
        expect(actions[8].fetchedBooks).to.equal(expectedAction.fetchedBooks);
        expect(actions[8].fetchedBooks).to.have.property('id');
        expect(actions[8].fetchedBooks).to.have.property('userid');
        expect(actions[8].fetchedBooks).to.have.property('bookid');
        expect(actions[8].fetchedBooks).to.have.property('dateborrowed');
        expect(actions[8].fetchedBooks).to.have.property('expectedreturndate');
        expect(actions[8].fetchedBooks).to.have.property('returnstatus');
        expect(actions[8].fetchedBooks).to.have.property('approvedreturn');
        expect(actions[8].fetchedBooks).to.have.property('book');
        expect(actions[8].fetchedBooks.id).to.equal(expectedAction.fetchedBooks.id);
        expect(actions[8].fetchedBooks.userid).to.equal(expectedAction.fetchedBooks.userid);
        expect(actions[8].fetchedBooks.bookid).to.equal(expectedAction.fetchedBooks.bookid);
        expect(actions[8].fetchedBooks.dateborrowed).to.equal(expectedAction.fetchedBooks.dateborrowed);
        expect(actions[8].fetchedBooks.expectedreturndate).to.equal(expectedAction.fetchedBooks.expectedreturndate);
        expect(actions[8].fetchedBooks.returnstatus).to.equal(expectedAction.fetchedBooks.returnstatus);
        expect(actions[8].fetchedBooks.approvedreturn).to.equal(expectedAction.fetchedBooks.approvedreturn);
        expect(actions[8].fetchedBooks.book).to.equal(expectedAction.fetchedBooks.book);
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
      type: actionTypes.RETURN_BOOK,
      bookid: serverRes
    };

    await store.dispatch(returnBook({bookid: 3}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[9].type).to.equal(expectedAction.type);
        expect(actions[9].bookid).to.equal(expectedAction.bookid.message);
      });
      done();
  });

  it('should create CREATE_BOOK when admin creates a book', async (done) => {
    
    const serverRes = mockData.createdBookResponse;

    moxios.stubRequest(userbooks, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.CREATE_BOOK,
      bookData: serverRes
    };
    
    await store.dispatch(createBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[10].type).to.equal(expectedAction.type);
        expect(actions[10].bookData).to.equal(expectedAction.bookData);
        expect(actions[10].bookData).to.have.property('message');
        expect(actions[10].bookData.message).to.equal(expectedAction.bookData.message);
        expect(actions[10].bookData).to.have.property('data');
        expect(actions[10].bookData.data).to.be.an('object');
        expect(actions[10].bookData.data).to.have.property('visibility');
        expect(actions[10].bookData.data).to.have.property('isbn');
        expect(actions[10].bookData.data).to.have.property('id');
        expect(actions[10].bookData.data).to.have.property('title');
        expect(actions[10].bookData.data).to.have.property('author');
        expect(actions[10].bookData.data).to.have.property('pages');
        expect(actions[10].bookData.data).to.have.property('year');
        expect(actions[10].bookData.data).to.have.property('description');
        expect(actions[10].bookData.data).to.have.property('quantity');
        expect(actions[10].bookData.data).to.have.property('categoryid');
        expect(actions[10].bookData.data).to.have.property('image');
        expect(actions[10].bookData.data).to.have.property('pdf');
        expect(actions[10].bookData.data).to.have.property('updatedAt');
        expect(actions[10].bookData.data).to.have.property('createdAt');
      });
      done();
  });

  it('should create CREATE_CATEGORY when admin creates a book', async (done) => {
    
    const serverRes = 'Category created'

    moxios.stubRequest(newCategoryUrl, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY,
      bookData: serverRes
    };
    
    await store.dispatch(createCategory({category: 'Programming'}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[11].type).to.equal('CREATE_CATEGORY');
        expect(actions[11].category).to.equal('Category created');
      });
      done();
  });


  it('should create GET_CATEGORIES when admin tries to create a book', async (done) => {
    
    const serverRes = mockData.sampleCats

    moxios.stubRequest(categories, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.GET_CATEGORIES,
      fetchedCategories: serverRes
    };
    
    await store.dispatch(getCategories())
      .then(() => {
        const actions = store.getActions();
        expect(actions[12].type).to.equal('ET_CATEGORY');
        expect(actions[12].fetchedCategories).to.equal(expectedAction.fetchedCategories.categories);
      });
      done();
  });


  it('should create MODIFY_BOOK when admin edits a book', async (done) => {
    
    const serverRes = mockData.publishedBooksSample2;
    const bookid = parseInt(mockData.publishedBooksSample2.data.id, 10);
    moxios.stubRequest(`${userbooks}/${bookid}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.MODIFY_BOOK,
      bookData: serverRes
    };
    
    await store.dispatch(modifyBook({serverRes}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[13].type).to.equal(expectedAction.type);
        expect(actions[13].bookData[0]).to.equal(expectedAction.bookData.data[0]);
        expect(actions[13].bookData[0]).to.be.an('object');
        expect(actions[13].bookData[0]).to.have.property('visibility');
        expect(actions[13].bookData[0]).to.have.property('isbn');
        expect(actions[13].bookData[0]).to.have.property('id');
        expect(actions[13].bookData[0]).to.have.property('title');
        expect(actions[13].bookData[0]).to.have.property('author');
        expect(actions[13].bookData[0]).to.have.property('pages');
        expect(actions[13].bookData[0]).to.have.property('year');
        expect(actions[13].bookData[0]).to.have.property('description');
        expect(actions[13].bookData[0]).to.have.property('quantity');
        expect(actions[13].bookData[0]).to.have.property('categoryid');
        expect(actions[13].bookData[0]).to.have.property('image');
        expect(actions[13].bookData[0]).to.have.property('pdf');
        expect(actions[13].bookData[0]).to.have.property('updatedAt');
        expect(actions[13].bookData[0]).to.have.property('createdAt');
      });
      done();
  });

  it('should create EDIT PROFILE when user edits his profile', async (done) => {
    
    const serverRes = mockData.updatedProfile.user;
    moxios.stubRequest(`${userProfile}/${serverRes.id}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.EDIT_PROFILE,
      newUserData: serverRes
    };
    
    await store.dispatch(editProfile(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[14].type).to.equal(expectedAction.type);
        expect(actions[14].newUserData.id).to.equal(expectedAction.newUserData.id);
        expect(actions[14].newUserData.firstname).to.equal(expectedAction.newUserData.firstname);
        expect(actions[14].newUserData.lastname).to.equal(expectedAction.newUserData.lastname);
        expect(actions[14].newUserData.username).to.equal(expectedAction.newUserData.username);
        expect(actions[14].newUserData.email).to.equal(expectedAction.newUserData.email);
        expect(actions[14].newUserData.membership).to.equal(expectedAction.newUserData.membership);
        expect(actions[14].newUserData.role).to.equal(expectedAction.newUserData.role);
        expect(actions[14].newUserData.image).to.equal(expectedAction.newUserData.image);
        expect(actions[14].newUserData.passurl).to.equal(expectedAction.newUserData.passurl);
        expect(actions[14].newUserData.password).to.equal(expectedAction.newUserData.password);
        expect(actions[14].newUserData.createdAt).to.equal(expectedAction.newUserData.createdAt);
        expect(actions[14].newUserData.updatedAt).to.equal(expectedAction.newUserData.updatedAt);
      });
      done();
  });

  it('should create DELETE_BOOK when admin deletes a book', async (done) => {
    
    const serverRes = mockData.mocktrendingBook;
    const bookId = 1
    moxios.stubRequest(`${userbooks}/${1}`, {
      status: 201,
      response: mockData.mocktrendingBook
    });
     
    const expectedAction = {
      type: actionTypes.DELETE_BOOK,
      updatedBooks: mockData.mocktrendingBook[0]
    };

    await store.dispatch(deleteBook(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[15].type).to.equal(expectedAction.type);
        expect(actions[15].updatedBooks[0]).to.equal(expectedAction.updatedBooks);
        expect(actions[15].updatedBooks[0]).to.be.an('object');
        expect(actions[15].updatedBooks[0]).to.have.property('visibility');
        expect(actions[15].updatedBooks[0]).to.have.property('isbn');
        expect(actions[15].updatedBooks[0]).to.have.property('id');
        expect(actions[15].updatedBooks[0]).to.have.property('title');
        expect(actions[15].updatedBooks[0]).to.have.property('author');
        expect(actions[15].updatedBooks[0]).to.have.property('pages');
        expect(actions[15].updatedBooks[0]).to.have.property('year');
        expect(actions[15].updatedBooks[0]).to.have.property('description');
        expect(actions[15].updatedBooks[0]).to.have.property('quantity');
        expect(actions[15].updatedBooks[0]).to.have.property('categoryid');
        expect(actions[15].updatedBooks[0]).to.have.property('image');
        expect(actions[15].updatedBooks[0]).to.have.property('pdf');
        expect(actions[15].updatedBooks[0]).to.have.property('updatedAt');
        expect(actions[15].updatedBooks[0]).to.have.property('createdAt');
      });
      done();
  });

  it('should create GET_BORROWED_BOOKS when getAllBorrowedBooks is triggered', async (done) => {
    
    const serverRes = mockData.borrowedBookMirror;
    moxios.stubRequest(`${userbooks}/borrowedbooks`, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.GET_BORROWED_BOOKS,
      borrowedbooks: serverRes
    };

    await store.dispatch(getAllBorrowedBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[16].type).to.equal(expectedAction.type);
        expect(actions[16].borrowedbooks).to.equal(expectedAction.borrowedbooks.books);
        expect(actions[16].borrowedbooks).to.equal(expectedAction.borrowedbooks.books);
        expect(actions[16].borrowedbooks[0]).to.equal(expectedAction.borrowedbooks.books[0]);
        expect(actions[16].borrowedbooks[0]).to.have.property('id');
        expect(actions[16].borrowedbooks[0]).to.have.property('userid');
        expect(actions[16].borrowedbooks[0]).to.have.property('bookid');
        expect(actions[16].borrowedbooks[0]).to.have.property('dateborrowed');
        expect(actions[16].borrowedbooks[0]).to.have.property('expectedreturndate');
        expect(actions[16].borrowedbooks[0]).to.have.property('returnstatus');
        expect(actions[16].borrowedbooks[0]).to.have.property('approvedreturn');
        expect(actions[16].borrowedbooks[0]).to.have.property('book');
        expect(actions[16].borrowedbooks[0].book).to.equal(expectedAction.borrowedbooks.books[0].book);
        expect(actions[16].borrowedbooks[0].book).to.be.an('object');
        expect(actions[16].borrowedbooks[0].book).to.have.property('visibility');
        expect(actions[16].borrowedbooks[0].book).to.have.property('isbn');
        expect(actions[16].borrowedbooks[0].book).to.have.property('id');
        expect(actions[16].borrowedbooks[0].book).to.have.property('title');
        expect(actions[16].borrowedbooks[0].book).to.have.property('author');
        expect(actions[16].borrowedbooks[0].book).to.have.property('pages');
        expect(actions[16].borrowedbooks[0].book).to.have.property('year');
        expect(actions[16].borrowedbooks[0].book).to.have.property('description');
        expect(actions[16].borrowedbooks[0].book).to.have.property('quantity');
        expect(actions[16].borrowedbooks[0].book).to.have.property('categoryid');
        expect(actions[16].borrowedbooks[0].book).to.have.property('image');
        expect(actions[16].borrowedbooks[0].book).to.have.property('pdf');
        expect(actions[16].borrowedbooks[0].book).to.have.property('updatedAt');
        expect(actions[16].borrowedbooks[0].book).to.have.property('createdAt');
      });
      done();
  });

  it('should create ADMIN_GET_ALLBOOKS on a successful fetch of all unpublished library books', async (done) => {
    
    const serverRes = mockData.mockBooks;
    moxios.stubRequest(`${userbooks}/all`, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.ADMIN_GET_ALLBOOKS,
      unpublishedbooks: serverRes
    };

    await store.dispatch(adminGetAllBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[17].type).to.equal(expectedAction.type);
        expect(actions[17].unpublishedbooks[0]).to.equal(expectedAction.unpublishedbooks.books[0]);
        expect(actions[17].unpublishedbooks[0].id).to.equal(expectedAction.unpublishedbooks.books[0].id);
        expect(actions[17].unpublishedbooks[0].author).to.equal(expectedAction.unpublishedbooks.books[0].author);
        expect(actions[17].unpublishedbooks[0].visibility).to.equal(expectedAction.unpublishedbooks.books[0].visibility);
        expect(actions[17].unpublishedbooks[0].isbn).to.equal(expectedAction.unpublishedbooks.books[0].isbn);
        expect(actions[17].unpublishedbooks[0].pages).to.equal(expectedAction.unpublishedbooks.books[0].pages);
        expect(actions[17].unpublishedbooks[0].year).to.equal(expectedAction.unpublishedbooks.books[0].year);
        expect(actions[17].unpublishedbooks[0].description).to.equal(expectedAction.unpublishedbooks.books[0].description);
        expect(actions[17].unpublishedbooks[0].quantity).to.equal(expectedAction.unpublishedbooks.books[0].quantity);
        expect(actions[17].unpublishedbooks[0].image).to.equal(expectedAction.unpublishedbooks.books[0].image);
        expect(actions[17].unpublishedbooks[0].pdf).to.equal(expectedAction.unpublishedbooks.books[0].pdf);
        expect(actions[17].unpublishedbooks[0].categoryid).to.equal(expectedAction.unpublishedbooks.books[0].categoryid);
      });
      done();
  });


  it('should create PUBLISH_BOOK on a successful fetch of all published library books', async (done) => {
    
    const serverRes = mockData.mockBooks.books[0];
    const bookData = 1
    moxios.stubRequest(`${userbooks}/${bookData}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.PUBLISH_BOOK,
      bookData: serverRes
    };

    await store.dispatch(publishBook(bookData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[18].type).to.equal(expectedAction.type);
        expect(actions[18].bookData).to.equal(expectedAction.bookData);
        expect(actions[18].bookData.id).to.equal(expectedAction.bookData.id);
        expect(actions[18].bookData.author).to.equal(expectedAction.bookData.author);
        expect(actions[18].bookData.visibility).to.equal(expectedAction.bookData.visibility);
        expect(actions[18].bookData.isbn).to.equal(expectedAction.bookData.isbn);
        expect(actions[18].bookData.pages).to.equal(expectedAction.bookData.pages);
        expect(actions[18].bookData.year).to.equal(expectedAction.bookData.year);
        expect(actions[18].bookData.description).to.equal(expectedAction.bookData.description);
        expect(actions[18].bookData.quantity).to.equal(expectedAction.bookData.quantity);
        expect(actions[18].bookData.image).to.equal(expectedAction.bookData.image);
        expect(actions[18].bookData.pdf).to.equal(expectedAction.bookData.pdf);
        expect(actions[18].bookData.categoryid).to.equal(expectedAction.bookData.categoryid);
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
      type: actionTypes.TRENDING_BOOKS,
      books: serverRes
    };

    await store.dispatch(trendingBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[19].type).to.equal(expectedAction.type);
        expect(actions[19].books[0]).to.equal(expectedAction.books[0]);
        expect(actions[19].books[0].id).to.equal(expectedAction.books[0].id);
        expect(actions[19].books[0].author).to.equal(expectedAction.books[0].author);
        expect(actions[19].books[0].visibility).to.equal(expectedAction.books[0].visibility);
        expect(actions[19].books[0].isbn).to.equal(expectedAction.books[0].isbn);
        expect(actions[19].books[0].pages).to.equal(expectedAction.books[0].pages);
        expect(actions[19].books[0].year).to.equal(expectedAction.books[0].year);
        expect(actions[19].books[0].description).to.equal(expectedAction.books[0].description);
        expect(actions[19].books[0].quantity).to.equal(expectedAction.books[0].quantity);
        expect(actions[19].books[0].image).to.equal(expectedAction.books[0].image);
        expect(actions[19].books[0].pdf).to.equal(expectedAction.books[0].pdf);
        expect(actions[19].books[0].categoryid).to.equal(expectedAction.books[0].categoryid);
      });
      done();
  });

  it('should create GOOGLE_ACCESS when a user signs in', async (done) => {
    const signinResponse = mockData.signupResponse
    moxios.stubRequest(googleAccess, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: actionTypes.GOOGLE_ACCESS,
      googleUserData: signinResponse
    };

    const thisstore = mockStore({});
    // Dispatch
    await store.dispatch(newGoogleAccess(mockData.userData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[20].type).to.equal(expectedAction.type);
        expect(actions[20].googleUserData.responseData).to.have.property('message');
        expect(actions[20].googleUserData.responseData).to.have.property('username');
        expect(actions[20].googleUserData.responseData).to.have.property('userID');
        expect(actions[20].googleUserData.responseData).to.have.property('token');
        expect(actions[20].googleUserData.responseData).to.have.property('userID');
        expect(actions[20].googleUserData.responseData).to.have.property('userRole');
        expect(actions[20].googleUserData.responseData).to.have.property('image');
      });
      done();
  });
});



