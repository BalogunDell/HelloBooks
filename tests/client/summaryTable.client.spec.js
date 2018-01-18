import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { spyOn } from 'expect'

import {
    SummaryTable,
    stateToProps
} from '../../client/src/components/userprofile/adminSubComponents/summaryTable';

import { mockBooks , borrowedBookSample } from './mocks/mockdata';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;


const props = {
    books: [],
    pendingReturnCount: 0,
    booksReturnedCount: 0,
    bookCount: 0,
    borrowed: [],
    allbooks: mockBooks,
    borrowedBooks: borrowedBookSample
}

const wrapper = shallow(<SummaryTable {...props}/>)
describe('Summary Table,', () => {
  it('should render the summary table without crashing', () => {
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('table').length).toBe(1);
    expect(wrapper.find('thead').length).toBe(1);
    expect(wrapper.find('tbody').length).toBe(1);
  });

  it('should call the componentWillReceiveProps method', () => {
    const spycomponentWillReceiveProps = jest.spyOn(SummaryTable.prototype, 'componentWillReceiveProps');
    const nextProps = {
        allbooks: mockBooks.books,
        borrowedBooks: borrowedBookSample
    }
    shallow(<SummaryTable {...props} componentWillReceiveProps = {spycomponentWillReceiveProps}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(spycomponentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(spycomponentWillReceiveProps).toHaveBeenCalledTimes(1);
  });

  it('should call the stateToProps method', () => {
    const state = {
        books: mockBooks.books,

    }
    expect(stateToProps(state).allbooks).toExist;
    expect(stateToProps(state).borrowedBooks).toExist;
  });
});
