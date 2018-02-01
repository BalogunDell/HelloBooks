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
} from '../../client/src/components/Userprofile/AdminSubComponents/BooksList';

import { 
  mockBooks,
  categories,
  publishedBooksSample,
  borrowedBook,
  borrowBookResponse
} from './mocks/mockdata';

import mockLocalStorage from './mocks/mockDataStorage'
import { prototype } from 'mocha';
import { deleteBook } from '../../client/src/Actions/booksAction';

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

global.material_select = {
  material_select: () => {jest.fn(() => Promise.resolve())}
}

const props = {
  booksReturnedCount: 0,
  selectedValue: '',
  pendingReturnCount: 0,
  handleBookEdit: jest.fn(),
  handleBookDelete: jest.fn(),
  handleDeleteCancel: jest.fn(),
  deleteBookTrigger: jest.fn(() => Promise.resolve()),
  handleSelectChange: jest.fn(),
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
  });

  it('ensure that it has the method: handleBookDelete', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleBookDelete');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().handleBookDelete(event);
  });

  it('ensure that it has the method: handleDeleteCancel', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleDeleteCancel');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().handleDeleteCancel(event);
  });

  it('ensure that it has the method: deleteBookTrigger', () => {
    const spy = jest.spyOn(BooksList.prototype, 'deleteBookTrigger');
    shallow(<BooksList {...props} onClick = {spy}/>)
    .instance().deleteBookTrigger(event);
  });

  it('ensure that it has the method: handleSelectChange', () => {
    const spy = jest.spyOn(BooksList.prototype, 'handleSelectChange');
    shallow(<BooksList {...props} onChange = {spy}/>)
    .instance().handleSelectChange(event);
  });

  it('should set state to allbooks when selected from dropdown', () => {
    const wrapper = mount(<BooksList {...props}/>)
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: '',
        dataset: {}
      }
    };
    const selectDropDown = wrapper.find('#booksToDisplay');
    event.target.value = 'allbooks'
    wrapper.setState({
      allbooks: [],
      selectedValue: event.target.value,
      filterable: publishedBooksSample
    });
    selectDropDown.simulate('change', event);
  });

  it('should set state to pendingreturn when selected from dropdown', () => {
    const wrapper = mount(<BooksList {...props}/>)
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: '',
        dataset: {}
      }
    };
    const selectDropDown = wrapper.find('#booksToDisplay');
    event.target.value = 'pendingreturn'
    wrapper.setState({
      allbooks: [],
      selectedValue: event.target.value,
      filterable: publishedBooksSample
    });
    selectDropDown.simulate('change', event);
  });

  it('should set state to booksreturned when selected from dropdown', () => {
    const wrapper = mount(<BooksList {...props}/>)
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: '',
        dataset: {}
      }
    };
    const selectDropDown = wrapper.find('#booksToDisplay');
    event.target.value = 'booksreturned'
    wrapper.setState({
      allbooks: [],
      selectedValue: event.target.value,
      filterable: publishedBooksSample
    });
    selectDropDown.simulate('change', event);
  });

  it('ensure that it has the method: componentDidMount', () => {
    const spy = jest.spyOn(BooksList.prototype, 'componentDidMount');
    shallow(<BooksList {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
  });

  it('ensure that it has the method: componentWillReceiveProps', () => {
    const spy = jest.spyOn(BooksList.prototype, 'componentWillReceiveProps');
    const nextProps = {
      loadAllbooks: mockBooks.books,
      borrowedBooks: borrowedBook
    }
    shallow(<BooksList {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
  });

  it('ensure that it has the method: getAllBooks from stateToProps', () => {
    const state = {
      books: {
        books: mockBooks.books,
        allborrowedbooks: borrowBookResponse
      }
    };
    expect(stateToProps(state).borrowedBooks).toExist;
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

describe('Button Click in Component: Booklist', () => {
  const wrapper = mount(<BooksList {...props}/>);
  it('should edit delete books when delete button in modal is clicked', () => {
   const event = {
     preventDefault: jest.fn()
   };
   const form = wrapper.find('#delete');
   wrapper.setState({bookId: 2});
   form.simulate('click', event);
 });
});
