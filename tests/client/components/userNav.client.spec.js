import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import jwt from 'jsonwebtoken';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { spyOn } from 'expect'


import UserNav from '../../../client/src/components/presentational/Usernav';
import Footer from '../../../client/src/components/presentational/Footer/Footer';
import { 
  successMessage ,
  failureMessage,
  membershipIconCreator
} from '../../../client/src/utils/messages';

import {
  Main,
  mapDispatchToProps,
  mapStateToProps} from '../../../client/src/components/containers/Main';

import {
  publishedBooksSample,
  categories,
  mockBooks,
  profile,
  token } from '../mock/mockdata';

import mockStorage from '../mock/mockDataStorage';


jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// Configure file reader
global.FileReader = () => ({
  readAsDataURL: () => {}
});


const props = {
    bookData: {
      publishedBooksSample
    }
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



describe('UserNav Component', () => {
  const props = {
    userType: 'admin',
    navLinks: [],
    linkIcons: [],
    linkTexts: [],
    path: '',
    userDetails: {},
    handleLogout: jest.fn()
  }
  const wrapper = shallow(<UserNav {...props}/>)
  it('should render Usernav components successfully', () => {
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('#userprofile').length).toBe(1);
    expect(wrapper.find('#dashboard').length).toBe(2);
  });
});

describe('UserNav Component', () => {
  const props = {
    trendingBooks: [],
    loading: true,
    trendingBooks: jest.fn(() => Promise.resolve())
  }
  const wrapper = shallow(<Main {...props}/>)
  it('should render Main components successfully', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should call componentDidMount method', () => {
    const spy = jest.spyOn(Main.prototype, 'componentDidMount');
    shallow(<Main {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(props.trendingBooks).toHaveBeenCalledTimes(2);
  });

  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      books: {
        books_trending: publishedBooksSample
      }
    }
    const spy = jest.spyOn(Main.prototype, 'componentWillReceiveProps');
    shallow(<Main {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
  });


  it('should call componentWillReceiveProps method', () => {
    const nextProps = {
      books: {
        books_trending: ''
      }
    }
    const spy = jest.spyOn(Main.prototype, 'componentWillReceiveProps');
    shallow(<Main {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
  });

  it('should ensure that mapDispatchToProps is called', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).trendingBooks).toBeTruthy();
  });

  it('should ensure that mapStateToProps is called', () => {
    const state = {
      books: {
        trendingBooks: publishedBooksSample
      }
    }
    expect(mapStateToProps(state).books).toExist;
    expect(publishedBooksSample).toEqual(state.books.trendingBooks);
  });
});

describe('Messages Function', () => {
  it('should return the appropriate messages depending on the parameter given',
   () => {
    const Result = successMessage('Welcome');
    expect(Result.type).toBe('div');
    expect(Result.props.className).toBe('successMessage');
    const Result2 = failureMessage('jfadsfa');
    expect(Result.type).toBe('div');

    const levelIndicator = membershipIconCreator('silver');
    expect(Result.type).toBe('div');

    const levelIndicator2 = membershipIconCreator('bronze');
    expect(Result.type).toBe('div');

    const levelIndicator3 = membershipIconCreator('gold');
    expect(Result.type).toBe('div');

    const levelIndicator4 = membershipIconCreator('');
    expect(Result.type).toBe('div');
  });
});

describe('Footer component', () => {
  it('should render the footer without crashing', () => {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.find('footer').length).toBe(1); 
  });
});