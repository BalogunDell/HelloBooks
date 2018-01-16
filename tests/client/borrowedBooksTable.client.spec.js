import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { spyOn } from 'expect'

import BorrowedBooksTable from '../../client/src/components/userprofile/adminSubComponents/borrowedbooksTable';
import Loader from '../../client/src/components/userprofile/adminSubComponents/loader';
import { borrowedBookSample, publishedBooksSample } from './mocks/mockdata';
import mockLocalStorage from './mocks/mockDataStorage'
import PublishedBooks from '../../client/src/components/userprofile/adminSubComponents/publishedBooks'

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

window.localStorage = mockLocalStorage;

const props = {
  books: borrowedBookSample
}

const minProps = {
    handleBookDelete: jest.fn(() => Promise.resolve()),
    handleBookEdit: jest.fn(() => Promise.resolve()),
    books: publishedBooksSample
}
describe('BorrowedBooksTable, Loader, PublishedBooks ', () => {
  it('should render the borrowed books table without crashing', () => {
    const wrapper = shallow(<BorrowedBooksTable {...props}/>)
    expect(wrapper.find('div').length).toBe(2);
  });

  it('should render the loader component without crashing', () => {
    const wrapper = shallow(<Loader/>)
    expect(wrapper.find('div').length).toBe(8);
  });

  it('should render the published books table without crashing', () => {
    const wrapper = shallow(<PublishedBooks {...minProps}/>)
    expect(wrapper.find('div').length).toBe(1);
  });
});