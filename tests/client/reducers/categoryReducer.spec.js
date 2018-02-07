import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import categoryReducer from '../../../client/src/reducers/categoryReducer';

// Import actions

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
} from '../../../client/src/actions/categoryAction';

// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};
describe('Category Reducer', () => {
  it('should return a new state when gets a all categories', () => {
    const newState = categoryReducer(initialState,
    getCategoriesAction(categories));
    const categoriesLength = newState.categories.length;
    expect(categoriesLength).to.equal(3);
    expect(newState.categories[0].category).to
      .equal( categories[0].category );
    expect(newState.categories[0].id).to
      .equal( categories[0].id );
   
  });

  it('should return a new state when creates a new category', () => {
    const newState = categoryReducer(initialState,
    getCategoriesAction({category: 'Test'}));
    expect(newState.categories.category).to
      .equal('Test' );
  });

  it('should return the default state if no action is performed', () => {
    const newState = categoryReducer(initialState,
    getCategoriesAction({}));
    expect(newState).to.be.an('object');
    expect(newState.categories).to.empty
  });
});
