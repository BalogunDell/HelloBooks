import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import mockStorage from '../mock/mockDataStorage';
import authenticate from '../../../client/src/components/HOC';
import { 
    Allbooks,
    mapStateToProps,
    mapDispatchToProps,
 } from '../../client/src/components/Userprofile/Allbooks/Allbooks';

 import UserBooks from '../../client/src/components/Userprofile/UserBooks';
 import { mockBooks, borrowedBookSample } from './mocks/mockdata';


jest.mock('react-router-dom');

window.localStorage = mockStorage;

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;


// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //


const event = {
  preventDefault: jest.fn(),
  target: {
      value: 2 
  }
}

const minProps = {
  books: mockBooks.books,
  getBookId: jest.fn(() => Promise.resolve()),
  retrievedBooks: mockBooks,
  currentBookId: 3 ,
  loadAllbooks: jest.fn(() => Promise.resolve()),
  getCurrentBookId: jest.fn(() => Promise.resolve())
}

const wrapper = shallow(<Allbooks {...minProps}/>);

describe('All Books', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Allbooks {...minProps}/>);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('should test getbookId method', () => {
    const getBookIdSpy = jest.spyOn(Allbooks.prototype, 'getBookId');
    shallow(<Allbooks {...minProps} onClick = {getBookIdSpy}/>)
    .instance().getBookId(event);
    expect(getBookIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should test componentDidMount method', () => {
    const componentDidMountSpy = jest.spyOn(Allbooks.prototype, 'componentDidMount');
    shallow(<Allbooks {...minProps} componentDidMount={componentDidMountSpy}/>)
    .instance().componentDidMount;
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should test componentWillReceiveProps method', () => {
      const nextProps = {
          retrievedBooks: []
      }
    const componentWillReceivePropsSpy = jest.spyOn(Allbooks.prototype, 'componentWillReceiveProps');
    shallow(<Allbooks {...minProps} componentWillReceiveProps={componentWillReceivePropsSpy}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should test mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).loadAllbooks).toBeTruthy();
    expect(mapDispatchToProps(dispatch).getCurrentBookId).toBeTruthy();
  });

  it('should test mapStateToProps method', () => {
    const state = {
      books: {
        mockBooks,
        currentBookId: 3
      }
    }
    expect(mapStateToProps(state)).toBeTruthy();
  });
});