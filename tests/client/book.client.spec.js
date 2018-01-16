import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { spyOn } from 'expect'
import {
  EditBookForm,
  stateToProps,
  dispatchToProps
} from '../../client/src/components/userprofile/adminSubComponents/editBook';
import Books from '../../client/src/components/books/Books';
import { publishedBooksSample, categories, mockBooks } from './mocks/mockdata';
import mockStorage from './mocks/mockDataStorage';

window.localStorage = mockStorage;

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// Configure file reader
global.FileReader = () => ({
  readAsDataURL: () => {}
});

global.JSON = {
  parse: () => {},
  stringify: () => {}
}

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

const wrapper = shallow(<Books {...props} />)
describe('Books Component,', () => {
  it('should render the book component without crashing', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});

describe('Edit Books Component,', () => {
  const props = {
    book: {},
    dataReady: false,
    imageHeight: 76560,
    imageWidth: 6560,
    tempImageName: 'jkfjgskdgfskgsf',
    tempFileName: 'dsfdsfd',
    tempFileSize: 1666666666660,
    loadedCategories: [],
    loader: false,
    error: '',
    successStatus: false,
    success: '',
    redirect: false,
    errorStatus: false,
    bookIndex : 0,
    getCategories: jest.fn(() => Promise.resolve()),
    modifyBook: jest.fn(() => Promise.resolve()),
    saveImageToCloudinary: jest.fn(() => Promise.resolve()),
    savePdfToCloudinary: jest.fn(() => Promise.resolve()),
    handleEditInput: jest.fn(),
    handleUpdate: jest.fn(),
    imageUploadHandler: jest.fn(),
    fileUploadHandler: jest.fn(),
    books: mockBooks,
    getBookToEdit: publishedBooksSample,
    loadedCategories: categories,
    imageUrl: '',
    pdfUrl: ''
  };
  const wrapper = shallow(<EditBookForm {...props} />);
  it('should render the edit book component without crashing', () => {
    expect(wrapper.find('div').length).toBe(31);
  });

  it('should have the handleEditInput method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'handleEditInput');
    shallow(<EditBookForm {...props} onChange= {spy}/>)
    .instance().handleEditInput(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('should have the handleUpdate method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'handleUpdate');
    shallow(<EditBookForm {...props} onSubmit={spy}/>)
    .instance().handleUpdate(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the handleUpdate method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'handleUpdate');
    shallow(<EditBookForm {...props} onSubmit= {spy}/>)
    .instance().handleUpdate(event);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should have the imageUploadHandler method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'imageUploadHandler');
    shallow(<EditBookForm {...props} imageUploadHandler= {spy}/>)
    .instance().imageUploadHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the fileUploadHandler method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'fileUploadHandler');
    shallow(<EditBookForm {...props} fileUploadHandler= {spy}/>)
    .instance().fileUploadHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the componentDidMount method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'componentDidMount');
    shallow(<EditBookForm {...props} componentDidMount= {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the componentDidMount method', () => {
    const spy = jest.spyOn(EditBookForm.prototype, 'componentWillReceiveProps');
    const nextProps = {
      loadedCategories: categories
    }
    shallow(<EditBookForm {...props} componentWillReceiveProps= {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the dispatchToProps method: getCategories', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).getCategories).toBeTruthy();
  });

  it('should have the dispatchToProps method: modifyBook', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).modifyBook).toBeTruthy();
  });

  it('should have the dispatchToProps method: saveImageToCloudinary', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).saveImageToCloudinary).toBeTruthy();
  });

  it('should have the dispatchToProps method: savePdfToCloudinary', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).savePdfToCloudinary).toBeTruthy();
  });

  it('should have the stateToProps properties: getBookToEdit', () => {
    const state = {
      books: {
        publishedBooksSample
      },
      createCategory: categories,
      uploadFiles: '',
      uploadFiles: ''
    }
    expect(stateToProps(state).getBookToEdit).toExist;
    expect(stateToProps(state).books).toExist;
    expect(stateToProps(state).imageUrl).toExist;
    expect(stateToProps(state).pdfUrl).toExist;
  });
  
});


