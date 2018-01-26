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
  fetchUserTrigger,
  editProfile,
  saveNewImageToDB,
} from '../../client/src/Actions/userProfileAction';
import {
  createCategory,
  getCategories
} from '../../client/src/Actions/categoryAction';
import * as actionTypes from '../../client/src/Actions/actionTypes'

import { expectation } from 'sinon';
import { cloudinaryUrl } from '../../client/src/utils/cloudinaryKeys';
import { userData } from './mocks/mockdata';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);



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
    const store = mockStore({});
    await store.dispatch(saveNewUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].userSignupData).to.have.property('message');
        expect(actions[0].userSignupData).to.have.property('username');
        expect(actions[0].userSignupData).to.have.property('userID');
        expect(actions[0].userSignupData).to.have.property('token');
        expect(actions[0].userSignupData).to.have.property('userID');
        expect(actions[0].userSignupData).to.have.property('userRole');
        expect(actions[0].userSignupData).to.have.property('image');
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

    const store = mockStore({});
    // Dispatch
    await store.dispatch(userLogin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].loginData).to.have.property('message');
        expect(actions[0].loginData).to.have.property('username');
        expect(actions[0].loginData).to.have.property('userID');
        expect(actions[0].loginData).to.have.property('token');
        expect(actions[0].loginData).to.have.property('userID');
        expect(actions[0].loginData).to.have.property('userRole');
        expect(actions[0].loginData).to.have.property('image');
      });
      done();
  });

  it('should create GET_ALL_BOOKS when fetching all books', async (done) => {
    moxios.stubRequest(userbooks, {
    status: 200,
    response: mockData.mocktrendingBooks
  })
      const expectedAction = [{
        type: actionTypes.GET_ALL_BOOKS,
        data: mockData.mocktrendingBook
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


  let uniqueUrl='';
  it('should create a SEND_EMAIL when user wants to reset password', async (done) => {
    const resetPasswordResponse = mockData.resetPasswordResponse;

    moxios.stubRequest(newPasswordUrl, {
      status: 200, 
      response: resetPasswordResponse
    });

    const expectedAction = {
      type: actionTypes.SEND_EMAIL,
      serverRes: resetPasswordResponse
    };

    const store = mockStore({});
    await store.dispatch(sendEmail({email: 'delighteddellW@gmail'}))
      .then(() => {
        const actions = store.getActions();
        uniqueUrl = actions[0].serverResponse.url;
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].serverResponse.message).to.equal(expectedAction.serverRes.message);
        expect(actions[0].serverResponse.url).to.equal(expectedAction.serverRes.url);
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

    const store = mockStore({});
    await store.dispatch(resetPassword(serverRes, uniqueUrl))
      .then(() => {
        const actions = store.getActions(); 
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].newPassword).to.equal(expectedAction.newPassword);
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
    const store = mockStore({});
    await store.dispatch(saveNewImageToDB(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].newImageUrl).to.equal(expectedAction.newImageUrl.user);
        expect(actions[0].newImageUrl.image).to.equal(expectedAction.newImageUrl.user.image);
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
    const store = mockStore({});
    await store.dispatch(fetchUserTrigger())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].userID).to.equal(expectedAction.userID);
        expect(actions[0].userID.firstname).to.equal(expectedAction.userID.firstname);
        expect(actions[0].userID.lastname).to.equal(expectedAction.userID.lastname);
        expect(actions[0].userID.email).to.equal(expectedAction.userID.email);
        expect(actions[0].userID.username).to.equal(expectedAction.userID.username);
        expect(actions[0].userID.image).to.equal(expectedAction.userID.image);
        expect(actions[0].userID.firstname).to.equal(expectedAction.userID.firstname);
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
    const store = mockStore({});
    await store.dispatch(borrowBook(serverResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].bookDetails).to.equal(expectedAction.bookDetails);
        expect(actions[0].bookDetails).to.have.property('message');
        expect(actions[0].bookDetails.message).to.equal(expectedAction.bookDetails.message);
        expect(actions[0].bookDetails).to.have.property('returnDate');
        expect(actions[0].bookDetails.returnDate).to.equal(expectedAction.bookDetails.returnDate);
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
    const store = mockStore({});
    await store.dispatch(getUserBooks(serverResponse))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].fetchedBooks).to.equal(expectedAction.fetchedBooks);
        expect(actions[0].fetchedBooks).to.have.property('id');
        expect(actions[0].fetchedBooks).to.have.property('userid');
        expect(actions[0].fetchedBooks).to.have.property('bookid');
        expect(actions[0].fetchedBooks).to.have.property('dateborrowed');
        expect(actions[0].fetchedBooks).to.have.property('expectedreturndate');
        expect(actions[0].fetchedBooks).to.have.property('returnstatus');
        expect(actions[0].fetchedBooks).to.have.property('approvedreturn');
        expect(actions[0].fetchedBooks).to.have.property('book');
        expect(actions[0].fetchedBooks.id).to.equal(expectedAction.fetchedBooks.id);
        expect(actions[0].fetchedBooks.userid).to.equal(expectedAction.fetchedBooks.userid);
        expect(actions[0].fetchedBooks.bookid).to.equal(expectedAction.fetchedBooks.bookid);
        expect(actions[0].fetchedBooks.dateborrowed).to.equal(expectedAction.fetchedBooks.dateborrowed);
        expect(actions[0].fetchedBooks.expectedreturndate).to.equal(expectedAction.fetchedBooks.expectedreturndate);
        expect(actions[0].fetchedBooks.returnstatus).to.equal(expectedAction.fetchedBooks.returnstatus);
        expect(actions[0].fetchedBooks.approvedreturn).to.equal(expectedAction.fetchedBooks.approvedreturn);
        expect(actions[0].fetchedBooks.book).to.equal(expectedAction.fetchedBooks.book);
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
    const store = mockStore({});
    await store.dispatch(returnBook({bookid: 3}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].bookid).to.equal(expectedAction.bookid.message);
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
      type: actionTypes.CREATE_BOOK,
      bookData: serverRes
    };
    const store = mockStore({});
    await store.dispatch(createBook())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].bookData).to.equal(expectedAction.bookData);
        expect(actions[0].bookData).to.have.property('message');
        expect(actions[0].bookData.message).to.equal(expectedAction.bookData.message);
        expect(actions[0].bookData).to.have.property('data');
        expect(actions[0].bookData.data).to.be.an('object');
        expect(actions[0].bookData.data).to.have.property('visibility');
        expect(actions[0].bookData.data).to.have.property('isbn');
        expect(actions[0].bookData.data).to.have.property('id');
        expect(actions[0].bookData.data).to.have.property('title');
        expect(actions[0].bookData.data).to.have.property('author');
        expect(actions[0].bookData.data).to.have.property('pages');
        expect(actions[0].bookData.data).to.have.property('year');
        expect(actions[0].bookData.data).to.have.property('description');
        expect(actions[0].bookData.data).to.have.property('quantity');
        expect(actions[0].bookData.data).to.have.property('categoryid');
        expect(actions[0].bookData.data).to.have.property('image');
        expect(actions[0].bookData.data).to.have.property('pdf');
        expect(actions[0].bookData.data).to.have.property('updatedAt');
        expect(actions[0].bookData.data).to.have.property('createdAt');
      });
      done();
  });


  it('should create CREATE_CATEGORY when admin creates a book', async (done) => {
    
    const serverRes = 'Category created'

    moxios.stubRequest(newCategory, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY,
      bookData: serverRes
    };
    const store = mockStore({});
    await store.dispatch(createCategory({category: 'Programming'}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal('CREATE_CATEGORY');
        expect(actions[0].category).to.equal('Category created');
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
    const store = mockStore({});
    await store.dispatch(getCategories())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal('ET_CATEGORY');
        expect(actions[0].fetchedCategories)
          .to.equal(expectedAction.fetchedCategories.categories);
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
    const store = mockStore({});
    await store.dispatch(editProfile(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].newUserData.id).to.equal(expectedAction.newUserData.id);
        expect(actions[0].newUserData.firstname).to.equal(expectedAction.newUserData.firstname);
        expect(actions[0].newUserData.lastname).to.equal(expectedAction.newUserData.lastname);
        expect(actions[0].newUserData.username).to.equal(expectedAction.newUserData.username);
        expect(actions[0].newUserData.email).to.equal(expectedAction.newUserData.email);
        expect(actions[0].newUserData.membership).to.equal(expectedAction.newUserData.membership);
        expect(actions[0].newUserData.role).to.equal(expectedAction.newUserData.role);
        expect(actions[0].newUserData.image).to.equal(expectedAction.newUserData.image);
        expect(actions[0].newUserData.passurl).to.equal(expectedAction.newUserData.passurl);
        expect(actions[0].newUserData.password).to.equal(expectedAction.newUserData.password);
        expect(actions[0].newUserData.createdAt).to.equal(expectedAction.newUserData.createdAt);
        expect(actions[0].newUserData.updatedAt).to.equal(expectedAction.newUserData.updatedAt);
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
      type: actionTypes.DELETE_BOOK,
      updatedBooks: serverRes
    };
    const store = mockStore({});
    await store.dispatch(deleteBook(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].updatedBooks).to.equal(expectedAction.updatedBooks);
        expect(actions[0].updatedBooks).to.be.an('object');
        expect(actions[0].updatedBooks).to.have.property('visibility');
        expect(actions[0].updatedBooks).to.have.property('isbn');
        expect(actions[0].updatedBooks).to.have.property('id');
        expect(actions[0].updatedBooks).to.have.property('title');
        expect(actions[0].updatedBooks).to.have.property('author');
        expect(actions[0].updatedBooks).to.have.property('pages');
        expect(actions[0].updatedBooks).to.have.property('year');
        expect(actions[0].updatedBooks).to.have.property('description');
        expect(actions[0].updatedBooks).to.have.property('quantity');
        expect(actions[0].updatedBooks).to.have.property('categoryid');
        expect(actions[0].updatedBooks).to.have.property('image');
        expect(actions[0].updatedBooks).to.have.property('pdf');
        expect(actions[0].updatedBooks).to.have.property('updatedAt');
        expect(actions[0].updatedBooks).to.have.property('createdAt');
        expect(actions[0].updatedBooks.visibility).to.equal(expectedAction.updatedBooks.visibility);
        expect(actions[0].updatedBooks.isbn).to.equal(expectedAction.updatedBooks.isbn);
        expect(actions[0].updatedBooks.visibility).to.equal(expectedAction.updatedBooks.visibility);
        expect(actions[0].updatedBooks.id).to.equal(expectedAction.updatedBooks.id);
        expect(actions[0].updatedBooks.title).to.equal(expectedAction.updatedBooks.title);
        expect(actions[0].updatedBooks.author).to.equal(expectedAction.updatedBooks.author);
        expect(actions[0].updatedBooks.pages).to.equal(expectedAction.updatedBooks.pages);
        expect(actions[0].updatedBooks.year).to.equal(expectedAction.updatedBooks.year);
        expect(actions[0].updatedBooks.description).to.equal(expectedAction.updatedBooks.description);
        expect(actions[0].updatedBooks.quantity).to.equal(expectedAction.updatedBooks.quantity);
        expect(actions[0].updatedBooks.categoryid).to.equal(expectedAction.updatedBooks.categoryid);
        expect(actions[0].updatedBooks.image).to.equal(expectedAction.updatedBooks.image);
        expect(actions[0].updatedBooks.pdf).to.equal(expectedAction.updatedBooks.pdf);
        expect(actions[0].updatedBooks.updatedAt).to.equal(expectedAction.updatedBooks.updatedAt);
        expect(actions[0].updatedBooks.createdAt).to.equal(expectedAction.updatedBooks.createdAt);
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
    const store = mockStore({});
    await store.dispatch(getAllBorrowedBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].borrowedbooks).to.equal(expectedAction.borrowedbooks.books);
        expect(actions[0].borrowedbooks).to.equal(expectedAction.borrowedbooks.books);
        expect(actions[0].borrowedbooks[0]).to.equal(expectedAction.borrowedbooks.books[0]);
        expect(actions[0].borrowedbooks[0]).to.have.property('id');
        expect(actions[0].borrowedbooks[0]).to.have.property('userid');
        expect(actions[0].borrowedbooks[0]).to.have.property('bookid');
        expect(actions[0].borrowedbooks[0]).to.have.property('dateborrowed');
        expect(actions[0].borrowedbooks[0]).to.have.property('expectedreturndate');
        expect(actions[0].borrowedbooks[0]).to.have.property('returnstatus');
        expect(actions[0].borrowedbooks[0]).to.have.property('approvedreturn');
        expect(actions[0].borrowedbooks[0]).to.have.property('book');
        expect(actions[0].borrowedbooks[0].book).to.equal(expectedAction.borrowedbooks.books[0].book);
        expect(actions[0].borrowedbooks[0].book).to.be.an('object');
        expect(actions[0].borrowedbooks[0].book).to.have.property('visibility');
        expect(actions[0].borrowedbooks[0].book).to.have.property('isbn');
        expect(actions[0].borrowedbooks[0].book).to.have.property('id');
        expect(actions[0].borrowedbooks[0].book).to.have.property('title');
        expect(actions[0].borrowedbooks[0].book).to.have.property('author');
        expect(actions[0].borrowedbooks[0].book).to.have.property('pages');
        expect(actions[0].borrowedbooks[0].book).to.have.property('year');
        expect(actions[0].borrowedbooks[0].book).to.have.property('description');
        expect(actions[0].borrowedbooks[0].book).to.have.property('quantity');
        expect(actions[0].borrowedbooks[0].book).to.have.property('categoryid');
        expect(actions[0].borrowedbooks[0].book).to.have.property('image');
        expect(actions[0].borrowedbooks[0].book).to.have.property('pdf');
        expect(actions[0].borrowedbooks[0].book).to.have.property('updatedAt');
        expect(actions[0].borrowedbooks[0].book).to.have.property('createdAt');
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
    const store = mockStore({});
    await store.dispatch(adminGetAllBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].unpublishedbooks[0]).to.equal(expectedAction.unpublishedbooks.books[0]);
        expect(actions[0].unpublishedbooks[0].id).to.equal(expectedAction.unpublishedbooks.books[0].id);
        expect(actions[0].unpublishedbooks[0].author).to.equal(expectedAction.unpublishedbooks.books[0].author);
        expect(actions[0].unpublishedbooks[0].visibility).to.equal(expectedAction.unpublishedbooks.books[0].visibility);
        expect(actions[0].unpublishedbooks[0].isbn).to.equal(expectedAction.unpublishedbooks.books[0].isbn);
        expect(actions[0].unpublishedbooks[0].pages).to.equal(expectedAction.unpublishedbooks.books[0].pages);
        expect(actions[0].unpublishedbooks[0].year).to.equal(expectedAction.unpublishedbooks.books[0].year);
        expect(actions[0].unpublishedbooks[0].description).to.equal(expectedAction.unpublishedbooks.books[0].description);
        expect(actions[0].unpublishedbooks[0].quantity).to.equal(expectedAction.unpublishedbooks.books[0].quantity);
        expect(actions[0].unpublishedbooks[0].image).to.equal(expectedAction.unpublishedbooks.books[0].image);
        expect(actions[0].unpublishedbooks[0].pdf).to.equal(expectedAction.unpublishedbooks.books[0].pdf);
        expect(actions[0].unpublishedbooks[0].categoryid).to.equal(expectedAction.unpublishedbooks.books[0].categoryid);
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
    const store = mockStore({});
    await store.dispatch(publishBook(bookData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].bookData).to.equal(expectedAction.bookData);
        expect(actions[0].bookData.id).to.equal(expectedAction.bookData.id);
        expect(actions[0].bookData.author).to.equal(expectedAction.bookData.author);
        expect(actions[0].bookData.visibility).to.equal(expectedAction.bookData.visibility);
        expect(actions[0].bookData.isbn).to.equal(expectedAction.bookData.isbn);
        expect(actions[0].bookData.pages).to.equal(expectedAction.bookData.pages);
        expect(actions[0].bookData.year).to.equal(expectedAction.bookData.year);
        expect(actions[0].bookData.description).to.equal(expectedAction.bookData.description);
        expect(actions[0].bookData.quantity).to.equal(expectedAction.bookData.quantity);
        expect(actions[0].bookData.image).to.equal(expectedAction.bookData.image);
        expect(actions[0].bookData.pdf).to.equal(expectedAction.bookData.pdf);
        expect(actions[0].bookData.categoryid).to.equal(expectedAction.bookData.categoryid);
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
    const store = mockStore({});
    await store.dispatch(trendingBooks())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].books[0]).to.equal(expectedAction.books[0]);
        expect(actions[0].books[0].id).to.equal(expectedAction.books[0].id);
        expect(actions[0].books[0].author).to.equal(expectedAction.books[0].author);
        expect(actions[0].books[0].visibility).to.equal(expectedAction.books[0].visibility);
        expect(actions[0].books[0].isbn).to.equal(expectedAction.books[0].isbn);
        expect(actions[0].books[0].pages).to.equal(expectedAction.books[0].pages);
        expect(actions[0].books[0].year).to.equal(expectedAction.books[0].year);
        expect(actions[0].books[0].description).to.equal(expectedAction.books[0].description);
        expect(actions[0].books[0].quantity).to.equal(expectedAction.books[0].quantity);
        expect(actions[0].books[0].image).to.equal(expectedAction.books[0].image);
        expect(actions[0].books[0].pdf).to.equal(expectedAction.books[0].pdf);
        expect(actions[0].books[0].categoryid).to.equal(expectedAction.books[0].categoryid);
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

    const store = mockStore({});
    await store.dispatch(newGoogleAccess(mockData.userData))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].googleUserData.responseData).to.have.property('message');
        expect(actions[0].googleUserData.responseData).to.have.property('username');
        expect(actions[0].googleUserData.responseData).to.have.property('userID');
        expect(actions[0].googleUserData.responseData).to.have.property('token');
        expect(actions[0].googleUserData.responseData).to.have.property('userID');
        expect(actions[0].googleUserData.responseData).to.have.property('userRole');
        expect(actions[0].googleUserData.responseData).to.have.property('image');
      });
      done();
  });

});



