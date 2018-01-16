import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import chai from 'chai';
import * as mockData from './mocks/mockdata';
import * as apiEndPoints from '../../client/src/utils/apiEndPoints.js';
import * as cloundinaryKey from '../../client/src/utils/cloudinaryKeys';
import getUserInfo from '../../client/src/utils/getUserInfo';

// Import mock local storage
import mockLocalStorage from './mocks/mockDataStorage';
window.localStorage = mockLocalStorage;


const expect = chai.expect;
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';

// Import actions and action types
import * as userAcessActions from '../../client/src/Actions/userAccessAction';
import * as bookActions from '../../client/src/Actions/booksAction';
import * as userProfileAction from '../../client/src/Actions/userProfileAction';
import * as categoryAction from '../../client/src/Actions/categoryAction';
import * as actionTypes from '../../client/src/Actions/actionTypes'

import Home from '../../client/src/components/home/Home';
import Books from '../../client/src/components/books/Books';
import Book from '../../client/src/components/books/book';
import { expectation } from 'sinon';
import { cloudinaryUrl } from '../../client/src/utils/cloudinaryKeys';


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
       await store.dispatch(bookActions.loadAllbooks())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.equal(expectedAction[0].type);
          expect(actions[0].books).to.be.an('array');
       });
       done();
  });

  it('should create ADD_USER when a user signs up', async (done) => {
    const signupResponse = mockData.signupResponse
    moxios.stubRequest(apiEndPoints.signup, {
      status: 201,
      response: signupResponse
    });

    const expectedAction = {
      type: actionTypes.ADD_USER,
      userSignupData:signupResponse
    };

    // Dispatch
    await store.dispatch(userAcessActions.saveNewUser(signupResponse))
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
    moxios.stubRequest(apiEndPoints.signin, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: actionTypes.LOGIN,
      loginData:signinResponse
    };

    // Dispatch
    await store.dispatch(userAcessActions.userLogin(signinResponse))
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
    moxios.stubRequest(apiEndPoints.newPassword, {
      status: 200, 
      response: resetPasswordResponse
    });

    const expectedAction = {
      type: actionTypes.SEND_EMAIL,
      serverRes: resetPasswordResponse
    };

    // Dispatch
    await store.dispatch(userAcessActions.sendEmail(resetPasswordResponse))
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
    moxios.stubRequest(`${apiEndPoints.newPassword}/${uniqueUrl}`,
    {
      status: 201,
      response: serverRes
    });

    const expectedAction = {
      type: actionTypes.RESET_PASS,
      newPassword: serverRes
    };

    // Dispatch
    await store.dispatch(userAcessActions.resetPassword(serverRes, uniqueUrl))
      .then(() => {
        const actions = store.getActions(); 
        expect(actions[4].type).to.equal(expectedAction.type);
        expect(actions[4].newPassword).to.equal(expectedAction.newPassword);
    })
      done();
  });

  it('should create a EDIT_IMAGE when users edit profile image', async (done) => {
    const serverRes = mockData.profile;
    moxios.stubRequest(`${apiEndPoints.userProfile}/${getUserInfo().userId}`, {
      status: 201,
      response: serverRes
    }); 
    
    // Expected response
    const expectedAction = {
      type: actionTypes.EDIT_IMAGE,
      newImageUrl: serverRes
    }
    await store.dispatch(userProfileAction.saveNewImageToDB(serverRes))
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

    moxios.stubRequest(`${apiEndPoints.userProfile}/${getUserInfo().userId}`, {
      status: 200,
      response:fetchedUser
    });

    const expectedAction = {
      type: actionTypes.FETCH_USER,
      userID: fetchedUser
    };

    await store.dispatch(userProfileAction.fetchUserTrigger())
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

    moxios.stubRequest(`${apiEndPoints.userProfile}/${getUserInfo().userId}/books`, {
      status: 201,
      response: serverResponse
    });

    const expectedAction = {
      type: actionTypes.BORROW_BOOK,
      bookDetails: serverResponse 
    };

    await store.dispatch(bookActions.borrowBook(serverResponse))
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

    moxios.stubRequest(`${apiEndPoints.userProfile}/${getUserInfo().userId}/books`, {
      status: 200,
      response: serverResponse
    })
    const expectedAction = {
      type: actionTypes.FETCTH_USER_BOOKS,
      fetchedBooks: serverResponse
    };

    await store.dispatch(bookActions.getUserBooks(serverResponse))
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

    moxios.stubRequest(`${apiEndPoints.userProfile}/${getUserInfo().userId}/books`, {
      status: 201,
      response: serverRes
    });
    

    const expectedAction = {
      type: actionTypes.RETURN_BOOK,
      bookid: serverRes
    };

    await store.dispatch(bookActions.returnBook(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[9].type).to.equal(expectedAction.type);
        expect(actions[9].bookid).to.equal(expectedAction.bookid.message);
      });
      done();
  });

  it('should create CREATE_BOOK when admin creates a book', async (done) => {
    
    const serverRes = mockData.createdBookResponse;

    moxios.stubRequest(apiEndPoints.books, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.CREATE_BOOK,
      bookData: serverRes
    };
    
    await store.dispatch(bookActions.createBook(serverRes))
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

    moxios.stubRequest(apiEndPoints.newCategory, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY,
      bookData: serverRes
    };
    
    await store.dispatch(categoryAction.createCategory({category: 'Programming'}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[11].type).to.equal('CREATE_CATEGORY');
        expect(actions[11].category).to.equal('Category created');
      });
      done();
  });


  it('should create GET_CATEGORIES when admin tries to create a book', async (done) => {
    
    const serverRes = mockData.sampleCats

    moxios.stubRequest(apiEndPoints.categories, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.GET_CATEGORIES,
      fetchedCategories: serverRes
    };
    
    await store.dispatch(categoryAction.getCategories(serverRes))
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
    moxios.stubRequest(`${apiEndPoints.books}/${bookid}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.MODIFY_BOOK,
      bookData: serverRes
    };
    
    await store.dispatch(bookActions.modifyBook({serverRes}))
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
    moxios.stubRequest(`${apiEndPoints.userProfile}/${serverRes.id}`, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: actionTypes.EDIT_PROFILE,
      newUserData: serverRes
    };
    
    await store.dispatch(userProfileAction.editProfile(serverRes))
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

  // it('should create DELETE_BOOK when admin deletes a book', async (done) => {
    
  //   const serverRes = mockData.mocktrendingBook;
  //   const bookId = 1
  //   moxios.stubRequest(`${apiEndPoints.books}/${bookId}`, {
  //     status: 201,
  //     response: serverRes
  //   });
     
  //   const expectedAction = {
  //     type: actionTypes.DELETE_BOOK,
  //     updatedBooks: serverRes
  //   };
  //   // console.log(serverRes);
  //   await store.dispatch(bookActions.deleteBook(serverRes))
  //     .then(() => {
  //       const actions = store.getActions();
  //       console.log(actions[15]);
  //       expect(actions[13].type).to.equal(expectedAction.type);
  //       expect(actions[13].bookData[0]).to.equal(expectedAction.bookData.data[0]);
  //       expect(actions[13].bookData[0]).to.be.an('object');
  //       expect(actions[13].bookData[0]).to.have.property('visibility');
  //       expect(actions[13].bookData[0]).to.have.property('isbn');
  //       expect(actions[13].bookData[0]).to.have.property('id');
  //       expect(actions[13].bookData[0]).to.have.property('title');
  //       expect(actions[13].bookData[0]).to.have.property('author');
  //       expect(actions[13].bookData[0]).to.have.property('pages');
  //       expect(actions[13].bookData[0]).to.have.property('year');
  //       expect(actions[13].bookData[0]).to.have.property('description');
  //       expect(actions[13].bookData[0]).to.have.property('quantity');
  //       expect(actions[13].bookData[0]).to.have.property('categoryid');
  //       expect(actions[13].bookData[0]).to.have.property('image');
  //       expect(actions[13].bookData[0]).to.have.property('pdf');
  //       expect(actions[13].bookData[0]).to.have.property('updatedAt');
  //       expect(actions[13].bookData[0]).to.have.property('createdAt');
  //     });
  //     done();
  // });
});


// describe('Cloudinary Actions', () => {
//   it('should save pdf to cloudinary', async (done) => {
//     const serverRes = mockData.saveImagerResponse;
//     moxios.stubRequest(cloundinaryKey.cloudinaryUrl, {
//       status: 201,
//       response: serverRes
//     });

//     const expectedAction = {
//       type: actionTypes.SAVE_PDF,
//       pdf:serverRes
//     };

//     await store.dispatch(bookActions.savePdfToCloudinary(serverRes))
//     .then(() => {
//       console.log(store.actions[13]);
//     });
//   });
// });


// **************************** //
// *****ACTION WRAPPER TEST**** //
// **************************** //
describe('Signup Action', () => {
  it('should create an action for signup', () => {
    const userSignupData = "Test this";
    const expectedAction =  { 
      type: actionTypes.ADD_USER,
      userSignupData
    }
    expect(userAcessActions.userSignupSuccessAction(userSignupData));
  });
});

describe('Signin Action', () => {
  it('should create an action for signin', () => {

    const userSigninData = mockData.signinMockData;
    const expectedAction =  { 
      type: actionTypes.LOGIN,
      loginData: userSigninData
    }
    // Call action
    const action = userAcessActions.userLoginSuccess(userSigninData);

    // assertions
    expect(action.type).to.equal(expectedAction.type);
    expect(action.loginData).to.equal(expectedAction.loginData);
    expect(action.loginData).to.have.property('responseData');
    expect(action.loginData.responseData).to.have.property('username');
    expect(action.loginData.responseData).to.have.property('message');
    expect(action.loginData.responseData).to.have.property('token');
    expect(action.loginData.responseData).to.have.property('userID');
    expect(action.loginData.responseData).to.have.property('userRole');
    expect(action.loginData.responseData).to.have.property('image');
  });
});

describe('Send Email Action', () => {
  it('should create a SEND_EMAIL when sending an email', () => {

    const serverRes = mockData.resetPasswordResponse;
    const expectedAction = {
      type: actionTypes.SEND_EMAIL,
      serverRes
    };
    // Call action
    const action = userAcessActions.sendEmailAction(serverRes);

    // assertions
    expect(action.type).to.equal(expectedAction.type);
    expect(action.serverRes).to.equal(expectedAction.serverRes);
    expect(action.serverRes).to.have.property('message');
    expect(action.serverRes).to.have.property('url');
  });
});

describe('Change Password Action', () => {
  it('should create a RESET_PASS when changing password', () => {

    const serverRes = {
      message: "Your password has been successfully updated"
    };

    const expectedAction = {
      type: actionTypes.RESET_PASS,
      newPassword: serverRes
    };

    const action = userAcessActions.resetPasswordAction(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.newPassword).to.equal(expectedAction.newPassword);
    expect(action.newPassword).to.have.property('message');
  });
});

describe('Fetch User Action', () => {
  it('should create FETCH_USER action when a user signs in', () => {
    const userID = 3;

    // Define expected action
    const expectedAction = {
      type: actionTypes.FETCH_USER,
      userID
    };

    // Call action
    const action = userProfileAction.fetchUser(userID);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.userID).to.equal(expectedAction.userID);
  });
});

describe('Edit User Action', () => {
  it('should create EDIT_USER action when a user edits his/her profile', () => {
    const newUserData = mockData.newUserData;

    const expectedAction = {
      type: actionTypes.EDIT_PROFILE,
      newUserData
    };

    const action = userProfileAction.editProfileAction(newUserData);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.newUserData).to.have.property('firstname');
    expect(action.newUserData).to.have.property('lastname');
    expect(action.newUserData).to.have.property('username');
  });
});

describe('Save Image Action', () => {
  it('should create EDIT_IMAGE when a user edit his/her profile', () => {
    const userImage = 'testimage.png';

    const expectedAction = {
      type: actionTypes.EDIT_IMAGE,
      newImageUrl: userImage
    };

    const action = userProfileAction.saveImage(userImage);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.newImageUrl).to.equal(expectedAction.newImageUrl);
  });
});

describe('Get book by id', () => {
  it('should create GET_BOOK_ID when a book is clicked', () => {
    const bookid = 3
    const expectedAction = {
      type: actionTypes.GET_BOOK_ID,
      bookid
    };

    const action = bookActions.getBookId(bookid);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookid).to.equal(expectedAction.bookid);
  });
});

describe('Borrow book', () => {
  it('should create BORROW_BOOK when user borrows a book', () => {
    const bookdetails = mockData.borrowBookResponse
    const expectedAction = {
      type: actionTypes.BORROW_BOOK,
      bookDetails: bookdetails
    };

    const action = bookActions.borrowBookAction(bookdetails);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookDetails).to.equal(expectedAction.bookDetails);
    expect(action.bookDetails).to.have.property('message');
    expect(action.bookDetails.message).to.equal(expectedAction.bookDetails.message);
    expect(action.bookDetails).to.have.property('returnDate');
    expect(action.bookDetails.returnDate).to.equal(expectedAction.bookDetails.returnDate)
  });
});

describe('Fetch User Books', () => {
  it('should create FETCTH_USER_BOOKS when user visits history page', () => {
    const serverResponse = mockData.borrowedBook;
    const expectedAction = {
      type: actionTypes.FETCTH_USER_BOOKS,
      fetchedBooks: serverResponse
    };
    const action = bookActions.userBooks(serverResponse);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.fetchedBooks).to.equal(expectedAction.fetchedBooks);
    expect(action.fetchedBooks).to.have.property('id');
    expect(action.fetchedBooks).to.have.property('userid');
    expect(action.fetchedBooks).to.have.property('bookid');
    expect(action.fetchedBooks).to.have.property('dateborrowed');
    expect(action.fetchedBooks).to.have.property('expectedreturndate');
    expect(action.fetchedBooks).to.have.property('returnstatus');
    expect(action.fetchedBooks).to.have.property('approvedreturn');
    expect(action.fetchedBooks).to.have.property('book');
    expect(action.fetchedBooks.id).to.equal(expectedAction.fetchedBooks.id);
    expect(action.fetchedBooks.userid).to.equal(expectedAction.fetchedBooks.userid);
    expect(action.fetchedBooks.bookid).to.equal(expectedAction.fetchedBooks.bookid);
    expect(action.fetchedBooks.dateborrowed).to.equal(expectedAction.fetchedBooks.dateborrowed);
    expect(action.fetchedBooks.expectedreturndate).to.equal(expectedAction.fetchedBooks.expectedreturndate);
    expect(action.fetchedBooks.returnstatus).to.equal(expectedAction.fetchedBooks.returnstatus);
    expect(action.fetchedBooks.approvedreturn).to.equal(expectedAction.fetchedBooks.approvedreturn);
    expect(action.fetchedBooks.book).to.equal(expectedAction.fetchedBooks.book);
    
  });
});

describe('Return Book Action', () => {
  it('should create RETURN_BOOK when a user returns a book', () => {
    const serverRes = {
      message: "Book has been returned"
    };

    const expectedAction = {
      type: actionTypes.RETURN_BOOK,
      bookid: serverRes
    };

    const action = bookActions.returnBookAction(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookid).to.equal(expectedAction.bookid);
    expect(action.bookid).to.have.property('message');
    expect(action.bookid.message).to.equal(expectedAction.bookid.message);
  });
});

describe('Create Book Action', () => {
  it('should create a CREATE_BOOK', () =>  {
    const serverRes = mockData.createdBookResponse;

    const expectedAction = {
      type: actionTypes.CREATE_BOOK,
      bookData: serverRes
    };

    const action = bookActions.createBookAction(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookData).to.equal(expectedAction.bookData);
    expect(action.bookData).to.have.property('message');
    expect(action.bookData.message).to.equal(expectedAction.bookData.message);
    expect(action.bookData).to.have.property('data');
    expect(action.bookData.data).to.be.an('object');
    expect(action.bookData.data).to.have.property('visibility');
    expect(action.bookData.data).to.have.property('isbn');
    expect(action.bookData.data).to.have.property('id');
    expect(action.bookData.data).to.have.property('title');
    expect(action.bookData.data).to.have.property('author');
    expect(action.bookData.data).to.have.property('pages');
    expect(action.bookData.data).to.have.property('year');
    expect(action.bookData.data).to.have.property('description');
    expect(action.bookData.data).to.have.property('quantity');
    expect(action.bookData.data).to.have.property('categoryid');
    expect(action.bookData.data).to.have.property('image');
    expect(action.bookData.data).to.have.property('pdf');
    expect(action.bookData.data).to.have.property('updatedAt');
    expect(action.bookData.data).to.have.property('createdAt');

  });
});

describe('Create Book Action', () => {
  it('should create a CREATE_CATEGORY', () =>  {
    const serverRes ='Programming';

    const expectedAction = {
      type: actionTypes.CREATE_CATEGORY,
      category: serverRes
    };
    const action = categoryAction.createCategoryAction({category: 'Programming'});
    expect(action.type).to.equal(expectedAction.type);
    expect(action.category.category).to.equal(expectedAction.category)

  });
});

describe('Create Book Action', () => {
  it('should create a CREATE_CATEGORY', () =>  {
    const serverRes = mockData.categories

    const expectedAction = {
      type: actionTypes.GET_CATEGORIES,
      fetchedCategories: serverRes
    };
    const action = categoryAction.getCategoriesAction(serverRes);
    expect(action.type).to.equal('ET_CATEGORY');
    expect(action.fetchedCategories).to.equal(serverRes);
    expect(action.fetchedCategories[0].id).to.equal(serverRes[0].id);
  });
});


describe('Save PDF Action', () => {
  it('should create a SAVE_PDF', () =>  {
    const serverRes = 'stringFromCloudinary';

    const expectedAction = {
      type: actionTypes.SAVE_PDF,
      pdf: serverRes
    };

    const action = bookActions.savePdf(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.pdf).to.equal(expectedAction.pdf);

  });
});


describe('Save Image Action', () => {
  it('should create a SAVE_IMAGE', () =>  {
    const serverRes = 'stringFromCloudinary';

    const expectedAction = {
      type: actionTypes.SAVE_IMAGE,
      image: serverRes
    };

    const action = bookActions.saveImage(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.image).to.equal(expectedAction.image);

  });
});

describe('Get Book Id', () => {
  it('should create a EDIT_BOOK_ID when admin edits a book', () =>  {
    const serverRes = 2;

    const expectedAction = {
      type: actionTypes.EDIT_BOOK_ID,
      bookid: serverRes
    };

    const action = bookActions.getAdminEditBookId(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookid).to.equal(expectedAction.bookid);

  });
});

describe('Modify a Book', () => {
  it('should create a MODIFY_BOOK after admin edits a book', () =>  {
    const serverRes = mockData.editBookResponse;

    const expectedAction = {
      type: actionTypes.MODIFY_BOOK,
      bookData: serverRes
    };

    const action = bookActions.modifyBookAction(serverRes);
    expect(action.type).to.equal(expectedAction.type);
    expect(action.bookData).to.equal(expectedAction.bookData);
    expect(action.bookData).to.have.property('message');
    expect(action.bookData.message).to.equal(expectedAction.bookData.message);
    expect(action.bookData).to.have.property('data');
    expect(action.bookData.data).to.be.an('object');
    expect(action.bookData.data).to.have.property('visibility');
    expect(action.bookData.data).to.have.property('isbn');
    expect(action.bookData.data).to.have.property('id');
    expect(action.bookData.data).to.have.property('title');
    expect(action.bookData.data).to.have.property('author');
    expect(action.bookData.data).to.have.property('pages');
    expect(action.bookData.data).to.have.property('year');
    expect(action.bookData.data).to.have.property('description');
    expect(action.bookData.data).to.have.property('quantity');
    expect(action.bookData.data).to.have.property('categoryid');
    expect(action.bookData.data).to.have.property('image');
    expect(action.bookData.data).to.have.property('pdf');
    expect(action.bookData.data).to.have.property('updatedAt');
    expect(action.bookData.data).to.have.property('createdAt');

  });
});





