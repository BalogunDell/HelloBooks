import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import {
  Dashboard,
  dispatchToProps,
  stateToProps
} from '../../client/src/components/userprofile/admin/Dashboard';

import { mockBooks } from './mocks/mockdata';
jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //


const event = {
  preventDefault: jest.fn(),
}

describe('Dashboard Component', () => {

  const minProps = {
    selectDefaultValue: 'All Books',
    books: [],
    borrowedbooksCount: {},
    allbooks: mockBooks,
    getAllBooks: jest.fn(() => Promise.resolve())
  };

  const wrapper = shallow(<Dashboard {...minProps}/>);

  it('should render without crashing', () => {
    expect(wrapper.find('.admindashboard').length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should ensure mapDispatchToProps calls appropriate method', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).getAllBooks).toBeTruthy();
  });

  it('should ensure stateToProps returns prop from redux store', () => {

    const state = {
      books: mockBooks.books
    }
    expect(stateToProps(state).allbooks).toExist;
  });
});