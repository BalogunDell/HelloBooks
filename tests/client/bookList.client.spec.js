import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import {
  BooksList,
  stateToProps,
  dispatchToProps 
} from '../../client/src/components/userprofile/adminSubComponents/booksList';

import { mockBooks, categories } from './mocks/mockdata';

import mockLocalStorage from './mocks/mockDataStorage'
import { prototype } from 'mocha';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

window.localStorage = mockLocalStorage;
// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //


const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test',
    dataset: {}
  },
  persist: () => {}
}

const props = {
  allbooks: [],
  filterable: [],
  fetchedborrowedbooks: [],
  borrowedBooksFilterable: [],
  dataReady: false,
  deleteErrorStatus: false,
  deleteErrorSuccess: false,
  loader: false,
  disabled: false,
  errorMessage: '',
  successMessage: '',
  bookId: 0,
  bookIndex: 0,
  bookCountStatus: false,
  noBooks:'There are no books in the library',
  selectedValue: '',
  all: false,
  pending: false,
  returned: false,
  borrowed: false,
  mostRead: false,
  published: false,
  unpublished: false,
  showAll: true,
  booksReturnedCount: 0,
  pendingReturnCount: 0,
  handleBookEdit: jest.fn(),
  handleBookDelete: jest.fn(),
  handleDeleteCancel: jest.fn(),
  deleteBookTrigger: jest.fn(() => Promise.resolve()),
  handleSelectChange: jest.fn(() => Promise.resolve()),
  getAllBooks: jest.fn(() => Promise.resolve()),
  getAdminEditBookId: jest.fn(() => Promise.resolve()),
  deleteBook: jest.fn(() => Promise.resolve()),
  getAllBorrowedBooks: jest.fn(() => Promise.resolve())
}

const wrapper = shallow(<BooksList {...props}/>);
describe('Book list', () => {
  it('renders the book list without failing', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('.selectFilter').length).toBe(1);
    expect(wrapper.find('option').length).toBe(3)
  });

  it('ensure that it has the method: handleBookEdit', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleBookEdit');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().handleBookEdit(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: handleBookDelete', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleBookDelete');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().handleBookDelete(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: handleDeleteCancel', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleDeleteCancel');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().handleDeleteCancel(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: deleteBookTrigger', () => {
    const spy = jest.spyOn(BooksList.prototype, 'deleteBookTrigger');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().deleteBookTrigger(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: handleSelectChange', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleSelectChange');
    shallow(<BooksList {...props} onChange = {spy}/>)
    .instance().handleSelectChange(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: componentDidMount', () => {
    const spy = jest.spyOn(BooksList.prototype, 'componentDidMount');
    shallow(<BooksList {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: componentWillReceiveProps', () => {
    const spy = jest.spyOn(BooksList.prototype, 'componentWillReceiveProps');
    const nextProps = {
      loadAllbooks: mockBooks.books
    }
    shallow(<BooksList {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the method: deleteBook from dispatchToProps', () => {
   const dispatch = jest.fn();
   expect(dispatchToProps(dispatch).deleteBook).toBeTruthy();
  });

  it('ensure that it has the method: getAllBooks from dispatchToProps', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).getAllBooks).toBeTruthy();
   });

   it('ensure that it has the method: getAdminEditBookId from dispatchToProps', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).getAdminEditBookId).toBeTruthy();
   });

   it('ensure that it has the method: getAllBorrowedBooks from dispatchToProps', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).getAllBorrowedBooks).toBeTruthy();
   });

   it('ensure that it has the properties from stateToProps', () => {
    const state = {
      books: mockBooks.books,
    };
    expect(dispatchToProps(state).loadAllbooks).toExist;
   });
});
