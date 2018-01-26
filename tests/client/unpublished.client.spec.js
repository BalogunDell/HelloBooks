import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import {
  UnPublishedBooks,
  mapStateToProps,
  mapDispatchToProps 
} from '../../client/src/components/Userprofile/AdminSubComponents/UnPublishedBooks';

import { mockBooks, categories, publishedBooksSample } from './mocks/mockdata';

import mockLocalStorage from './mocks/mockDataStorage'
import { prototype } from 'mocha';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

window.localStorage = mockLocalStorage;

const props = {
  unpublishedBooksArray: [],
  filterable: [],
  bookIndex: 0,
  bookId: 0,
  loader: false,
  errorStatus: false,
  errorMessage: '',
  successStatus: false,
  successMessage: false,
  modalHeader: 'Publishing this book will make it available to all users, do you want to continue?',
  bookCountStatus: false,
  adminGetAllBooks: jest.fn(() => Promise.resolve()),
  publishBook: jest.fn(() => Promise.resolve()),
  publishBookHander: jest.fn(() => Promise.resolve()),
  cancelPublish: jest.fn(),
  handlePublish: jest.fn(),
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 2,
    dataset: 1
  },
  persist: () => {}
}

describe('Unpublished Book Component', () => {
  const wrapper = shallow(<UnPublishedBooks {...props}/>);
  it('should render without crashing', () => {
    expect(wrapper.find('.books-holder-title').length).toBe(1);
    expect(wrapper.find('div').length).toBe(7);
  });

  it('should test the method: handlePublish', () => {
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'handlePublish');
    shallow(<UnPublishedBooks {...props} onClick = {spy}/>)
    .instance().handlePublish(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test if it sets state', () => {
    wrapper.setState({
      bookIndex: event.target.dataset.index,
      bookId: event.target.value});
      expect(wrapper.instance().state).toExist;
  });

  it('should test the method: handlePublish', () => {
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'cancelPublish');
    shallow(<UnPublishedBooks {...props} onClick = {spy}/>)
    .instance().cancelPublish(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should test if it sets state', () => {
    wrapper.setState({
      error: false,
      errorMessage: '',
      errorStatus: false,
      successStatus: false,
      successMessage: '',
      loader: false,
      modalHeader: ''
    });
      expect(wrapper.instance().state).toExist;
  });

  it('should test the method: publishBookHander', () => {
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'publishBookHander');
    shallow(<UnPublishedBooks {...props} onSubmit = {spy}/>)
    .instance().publishBookHander(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: componentDidMount', () => {
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'componentDidMount');
    shallow(<UnPublishedBooks {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: componentWillReceiveProps when book length is more than one', () => {
    const nextProps = {
      allbooks: publishedBooksSample
    }
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'componentWillReceiveProps');
    shallow(<UnPublishedBooks {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    wrapper.setState({unpublishedBooksArray: nextProps.allbooks});
    wrapper.setState({ bookCountStatus: true});
  });

  it('should test the method: componentWillReceiveProps when book length is less than one', () => {
    const nextProps = {
      allbooks: []
    }
    const spy = jest.spyOn(UnPublishedBooks.prototype, 'componentWillReceiveProps');
    shallow(<UnPublishedBooks {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    wrapper.setState({unpublishedBooksArray: nextProps.allbooks});
    wrapper.setState({ bookCountStatus: true});
  });

  it('should test the method: mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).adminGetAllBooks).toBeTruthy();
    expect(mapDispatchToProps(dispatch).publishBook).toBeTruthy();
  });

  it('should test the method: mapStateToProps', () => {
    const state = {
      books: publishedBooksSample
    }
    expect(mapStateToProps(state).allbooks).toExist;
  });
  
});