import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import chai from 'chai';
import * as mockData from '../mock/mockdata';
import { token } from '../mock/mockdata';
import {
  userProfile,
  userbooks,
} from '../../../client/src/utils/apiEndPoints';

import getUserInfo from '../../../client/src/utils/getUserInfo';

// Import mock local storage
import mockLocalStorage from '../mock/mockDataStorage';
window.localStorage = mockLocalStorage;
mockLocalStorage.setItem('Token', mockData.token)

require('dotenv').config();

const expect = chai.expect;
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';


import {
  fetchUserTrigger,
  editProfile,
  saveNewImageToDB,
} from '../../../client/src/actions/userProfileAction';
import {
  createCategory,
  getCategories
} from '../../../client/src/actions/categoryAction';
import {
  SAVE_PDF,
  SAVE_IMAGE,
  FETCH_USER,
  EDIT_PASSWORD,
  EDIT_IMAGE,
  EDIT_PROFILE,
} from '../../../client/src/actions/actionTypes'

import { expectation } from 'sinon';
import { cloudinaryUrl } from '../../../client/src/utils/cloudinaryKeys';
import { userData } from '../mock/mockdata';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);



describe('User Profile actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });


  it('should create a EDIT_IMAGE when users edit profile image', 
  async (done) => {
    const serverRes = mockData.updatedProfile;
    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}`, {
      status: 201,
      response: serverRes
    }); 
    
    // Expected response
    const expectedAction = {
      type: EDIT_IMAGE,
      newUserData: serverRes
    }
    const store = mockStore({});
    await store.dispatch(saveNewImageToDB(serverRes))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].newUserData).to
        .equal(expectedAction.newUserData.user);
        expect(actions[0].newUserData.image).to
        .equal(expectedAction.newUserData.user.image);
      });
      done();
  });

  it('should create FETCH_USER when a user logs in', async (done) => {
    const fetchedUser = mockData.userProfile.user;

    moxios.stubRequest(`${userProfile}/${getUserInfo().userId}`, {
      status: 200,
      response:fetchedUser
    });

    const expectedAction = {
      type: FETCH_USER,
      payload: fetchedUser
    };
    const store = mockStore({});
    await store.dispatch(fetchUserTrigger())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(expectedAction.type);
        expect(actions[0].payload.firstName).to
          .equal(expectedAction.payload.firstName);
        expect(actions[0].payload.lastName).to
          .equal(expectedAction.payload.lastName);
        expect(actions[0].payload.email).to
          .equal(expectedAction.payload.email);
        expect(actions[0].payload.username).to
          .equal(expectedAction.payload.username);
        expect(actions[0].payload.imageUrl).to
          .equal(expectedAction.payload.imageUrl);
        expect(actions[0].payload.firstName).to
          .equal(expectedAction.payload.firstName);
      });
      done();
  });
});



