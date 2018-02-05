import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import chai from 'chai';
import * as mockData from '../mock/mockdata';
import { token, signinMockData } from '../mock/mockdata';
import {
  signup,
  signin,
  newPasswordUrl,
  googleAccess
} from '../../../client/src/utils/apiEndPoints';

import getUserInfo from '../../../client/src/utils/getUserInfo';

// Import mock local storage
import mockLocalStorage from '../mock/mockDataStorage';
window.localStorage = mockLocalStorage;
mockLocalStorage.setItem('Token', token)
mockLocalStorage.setItem('Token', mockData.token)
require('dotenv').config();

const expect = chai.expect;
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';

// Import actions and action types
import {
  saveNewUser,
  userLogin,
  sendEmailAction,
  sendEmail,
  resetPassword,
  newGoogleAccess

} from '../../../client/src/actions/userAccessAction';

import {
  LOGIN,
  ADD_USER,
  RESET_PASS,
  SEND_EMAIL,
  GOOGLE_ACCESS,
  ERROR

} from '../../../client/src/actions/actionTypes'

import errorAction from '../../../client/src/actions/errorAction'
import { expectation } from 'sinon';
import { userData, googlesigninMock } from '../mock/mockdata';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);



describe('User Access actions', () => {
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
      type: ADD_USER || ERROR,
      userSignupData:signupResponse || {status: false}
    };
    const store = mockStore({});
    await store.dispatch(saveNewUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].userSignupData.message).to
        .equal('User created');
        expect(actions[0].userSignupData.username).to
        .equal(expectedAction.userSignupData.responseData.username);
        expect(actions[0].userSignupData.userId).to
        .equal(expectedAction.userSignupData.responseData.userId);
        expect(actions[0].userSignupData.token).to
        .equal(expectedAction.userSignupData.responseData.token);
        expect(actions[0].userSignupData.userRole).to
        .equal(expectedAction.userSignupData.responseData.userRole);
        expect(actions[0].userSignupData.image).to
        .equal(expectedAction.userSignupData.responseData.image);
      });
      done();
  });


  it('should create LOGIN when a user signs in', async (done) => {
    const signinResponse = mockData.signinMockData
    moxios.stubRequest(signin, {
      status: 200,
      response: signinResponse
    });

    const expectedAction = {
      type: LOGIN,
      response:signinResponse
    };

    const store = mockStore({});
    // Dispatch
    await store.dispatch(userLogin())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].loginData.message).to
      .equal(expectedAction.response.responseData.message );
      expect(actions[0].loginData.user.username).to
      .equal(expectedAction.response.responseData.user.username);
      expect(actions[0].loginData.user.userId).to
      .equal(expectedAction.response.responseData.user.userId);
      expect(actions[0].loginData.user.userRole).to
      .equal(expectedAction.response.responseData.user.userRole);
      expect(actions[0].loginData.token).to
      .equal(expectedAction.response.responseData.token);
      });
      done();
  });

  let uniqueUrl='';
  it('should create a SEND_EMAIL when user wants to reset password', 
  async (done) => {
    const resetPasswordResponse = mockData.resetPasswordResponse;

    moxios.stubRequest(newPasswordUrl, {
      status: 200, 
      response: resetPasswordResponse
    });

    const expectedAction = {
      type: SEND_EMAIL,
      serverRes: resetPasswordResponse
    };

    const store = mockStore({});
    await store.dispatch(sendEmail({email: 'delighteddellW@gmail'}))
      .then(() => {
        const actions = store.getActions();
        uniqueUrl = actions[0].serverResponse.url;
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].serverResponse.message).to
        .equal(expectedAction.serverRes.message);
        expect(actions[0].serverResponse.url).to
        .equal(expectedAction.serverRes.url);
      });
      done();
  });


  it('should create RESET_PASSWORD when user resets password using unique url', 
  async (done) => {
    const serverRes = {
         message: "Your password has been successfully updated"
        };

    // Simulate and intercept call to endpoint
    moxios.stubRequest(`${newPasswordUrl}/${uniqueUrl}`,
    {
      status: 201,
      response: serverRes
    });

    const expectedAction = {
      type: RESET_PASS,
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

  it('should create GOOGLE_ACCESS when a user signs in', async (done) => {
    const signinResponse = mockData.googlesigninMock
    moxios.stubRequest(googleAccess, {
      status: 200,
      response: googlesigninMock
    });

    const expectedAction = {
      type: GOOGLE_ACCESS,
      googleUserData: googlesigninMock
    };

    const store = mockStore({});
    await store.dispatch(newGoogleAccess(googlesigninMock))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].googleUserData.responseData.message).to
      .equal( expectedAction.googleUserData.responseData.message );
      expect(actions[0].googleUserData.responseData.user.username).to
      .equal(expectedAction.googleUserData.responseData.user.username);
      expect(actions[0].googleUserData.responseData.user.userId).to
      .equal(expectedAction.googleUserData.responseData.user.userId);
      expect(actions[0].googleUserData.responseData.user.userRole).to
      .equal(expectedAction.googleUserData.responseData.user.userRole);
      expect(actions[0].googleUserData.responseData.token).to
      .equal(expectedAction.googleUserData.responseData.token);
      expect(actions[0].googleUserData.responseData.user.googleUser).to
      .equal(expectedAction.googleUserData.responseData.user.googleUser);
      });
      done();
  });
});



