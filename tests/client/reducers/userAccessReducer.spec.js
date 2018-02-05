import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import userAccessReducer from '../../../client/src/reducers/userAccessReducer';

// Import actions
import {
  userSignupSuccessAction,
  userLoginSuccess,
  sendEmailAction,
  resetPasswordAction,
  newGoogleAccessAction
} from '../../../client/src/actions/userAccessAction';

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
  trendingBooksMock,
  signinMockData
} from '../mock/mockdata';
import { signup } from '../../../client/src/utils/apiEndPoints';


// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};
describe('User Access Reducer', () => {
  it('should return a new state when user creates an account', () => {
    const newState = userAccessReducer(initialState,
        userSignupSuccessAction(signupResponse));
    expect(newState.userData.responseData.message).to
    .equal( signupResponse.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.user.username).to
    .equal(signupResponse.responseData.user.username);
    expect(newState.userData.responseData.user.userId).to
    .equal(signupResponse.responseData.user.userId);
    expect(newState.userData.responseData.user.userRole).to
    .equal(signupResponse.responseData.user.userRole);
    expect(newState.userData.responseData.user.image).to
    .equal(signupResponse.responseData.user.image);
    expect(newState.userData.responseData.token).to
    .equal(signupResponse.responseData.token);
  });
  
  it('should return a new state when user logs in', () => {
    const newState = userAccessReducer(initialState,
        newGoogleAccessAction(signinMockData));
    expect(newState.userData.responseData.message).to
    .equal( signinMockData.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.user.username).to
    .equal(signinMockData.responseData.user.username);
    expect(newState.userData.responseData.user.userId).to
    .equal(signinMockData.responseData.user.userId);
    expect(newState.userData.responseData.user.userRole).to
    .equal(signinMockData.responseData.user.userRole);
    expect(newState.userData.responseData.user.image).to
    .equal(signinMockData.responseData.user.image);
    expect(newState.userData.responseData.token).to
    .equal(signinMockData.responseData.token);
  });


  it('should return a new state when user logs in using google', () => {
    const newState = userAccessReducer(initialState,
        userLoginSuccess(signinMockData));
    expect(newState.userData.responseData.message).to
    .equal( signinMockData.responseData.message );
    expect(newState.isAuthenticated).to.equal(true);
    expect(newState.userData.responseData.user.username).to
    .equal(signinMockData.responseData.user.username);
    expect(newState.userData.responseData.user.userId).to
    .equal(signinMockData.responseData.user.userId);
    expect(newState.userData.responseData.user.userRole).to
    .equal(signinMockData.responseData.user.userRole);
    expect(newState.userData.responseData.user.image).to
    .equal(signinMockData.responseData.user.image);
    expect(newState.userData.responseData.token).to
    .equal(signinMockData.responseData.token);
  });

  it('should return a new state when an email is sent', () => {
    const newState = userAccessReducer(initialState,
        sendEmailAction(resetPasswordResponse));
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
