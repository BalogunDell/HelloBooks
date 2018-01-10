import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import userAccessReducer from '../../client/src/reducers/userAccessReducer'

// Import actions
import {
  userSignupSuccessAction
} from '../../client/src/Actions/userAccessAction';

// Import mock data 
import {
  signupResponse
} from './mockdata';

// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};
describe('User Access Reducer', () => {
  it('should test user access reducer', () => {
    const test = userAccessReducer(initialState, userSignupSuccessAction(signupResponse));
    console.log(test);

    // expect(userAccessReducer(initialState, userSignupSuccessAction(signupResponse)))
    // .to.equal(signupResponse);
  });
});