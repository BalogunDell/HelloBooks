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
  signup,
  signin,
  userProfile,
  userbooks,
  newCategory,
  categories,
  newPasswordUrl,
  trending,
  googleAccess
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

// Import actions and action types
import {
  fetchUserTrigger,
  saveNewImageToDB,
} from '../../../client/src/actions/userProfileAction';
import {
  createCategory,
  getCategories
} from '../../../client/src/actions/categoryAction';
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,

} from '../../../client/src/actions/actionTypes'

import { expectation } from 'sinon';
import { userData } from '../mock/mockdata';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);



describe('Category actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create CREATE_CATEGORY when admin creates a book', 
  async (done) => {
    
    const serverRes = 'Category created'

    moxios.stubRequest(newCategory, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: CREATE_CATEGORY,
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


  it('should create GET_CATEGORIES when admin tries to create a book', 
  async (done) => {
    
    const serverRes = mockData.sampleCats

    moxios.stubRequest(categories, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: GET_CATEGORIES,
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


  it('should create CREATE_CATEGORY when admin creates a book', 
  async (done) => {
    
    const serverRes = 'Category created'

    moxios.stubRequest(newCategory, {
      status: 201,
      response: serverRes
    });
     
    const expectedAction = {
      type: CREATE_CATEGORY,
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


  it('should create GET_CATEGORIES when admin tries to create a book', 
  async (done) => {
    
    const serverRes = mockData.sampleCats

    moxios.stubRequest(categories, {
      status: 200,
      response: serverRes
    });
     
    const expectedAction = {
      type: GET_CATEGORIES,
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
});



