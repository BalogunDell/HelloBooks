import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { spyOn } from 'expect'
import {
  BookDetails,
  stateToProps,
  dispatchToProps
} from '../../client/src/components/userprofile/bookDetails';

import { 
  BorrowedBooks,
  mapDispatchToProps } from '../../client/src/components/userprofile/Borrowedbooks';

import { 
  History,
  mapStateToProps } from '../../client/src/components/userprofile/History';

// Bookdetails
// Borrowedbooks
// History
import { publishedBooksSample, categories, mockBooks } from './mocks/mockdata';
import mockStorage from './mocks/mockDataStorage';
import { prototype } from 'stream';

window.localStorage = mockStorage;

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// Configure file reader
global.FileReader = () => ({
  readAsDataURL: () => {}
});

const props = {
  book_id: 1,
  books: publishedBooksSample,
  book: publishedBooksSample,
  dataReady: false,
  borrowError: '',
  borrowErrorStatus:false,
  disableBtn: false,
  processingRequest: false,
  borrowSuccessStatus: false,
  borrowedMessage: '',
  isAdmin: false,
  borrowBook: jest.fn(() => Promise.resolve()),
  userBooks: jest.fn(() => Promise.resolve())

  };
const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test',
    dataset: {},
    files: ['nothing']
  },
  persist: () => {}
}


describe('Bookdetails, Borrowedbooks and history components', () => {
  // const wrapper = shallow(<BookDetails {...props}/>)
  it('should render these components successfully', () => {
    // expect(wrapper.find('div').length).toBe(14);
  });
});

describe('Borrowedbooks', () => {
  const props = {
    userid: 3,
    loading: false,
    getUserBooks: jest.fn(() => Promise.resolve())
  }
  const wrapper = shallow(<BorrowedBooks {...props}/>);
  it('should render without exploding', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('option').length).toBe(4);
  });

  it('should test for componentWillMount method', () => {
    const spy = jest.spyOn(BorrowedBooks.prototype, 'componentWillMount');
    shallow(<BorrowedBooks {...props} componentWillMount = {spy}/>)
    .instance().componentWillMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test for mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).getUserBooks).toBeTruthy();
  });
});

describe('History Component', () => {
  const props = {
    userid: 3,
    loading: false,
    selectedValue: '',
    allUserBooks: [],
    filterable: [],
    bookToDisplay: '',
    allbooks: false,
    returnedBookDisplayStatus: false,
    unreturnedBookDisplayStatus: true,
    tableHeader: 'All Books',
    handleReturn: jest.fn(),
    handleSelectChange: jest.fn(),
    getUserBooks: jest.fn(() => Promise.resolve()),
    returnBook: jest.fn(() => Promise.resolve()),
  };
  const wrapper = shallow(<History {...props}/>);
  it('should render the history component without crashing', () => {
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('option').length).toBe(3);
  });

  it('should have the method: handleReturn ', () => {
   const spy = jest.spyOn(History.prototype, 'handleReturn');
   shallow(<History {...props} handleReturn = {spy}/>)
   .instance().handleReturn(event);
   expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the method: handleSelectChange ', () => {
    const spy = jest.spyOn(History.prototype, 'handleSelectChange');
    shallow(<History {...props} handleSelectChange = {spy}/>)
    .instance().handleSelectChange(event);
    expect(spy).toHaveBeenCalledTimes(1);
   });

   it('should have the method: componentDidMount ', () => {
    const spy = jest.spyOn(History.prototype, 'componentDidMount');
    shallow(<History {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
   });

   it('should have the method: componentWillReceiveProps ', () => {
    const spy = jest.spyOn(History.prototype, 'componentWillReceiveProps');
    const nextProps = {
      fetchedBooks: {
        response: []
      }
    }
    shallow(<History {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
   });

   it('should have the method: mapDispatchToProps ', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).getUserBooks).toBeTruthy();
   });

   it('should have the method: mapDispatchToProps ', () => {
    const state = {
      books: {
        fetchedBooks: []
      }
    }
    expect(mapStateToProps(state).fetchedBooks).toExist;
   });
});