import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import userProfile from '../../../client/src/reducers/userProfileReducer';

// Import actions

import {
  fetchUser,
  editProfileAction,
  saveImage,
} from '../../../client/src/actions/userProfileAction';
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


// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};

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
