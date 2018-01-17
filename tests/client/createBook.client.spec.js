import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import {
  CreateBook,
  mapDispatchToProps,
  mapStateToProps 
} from '../../client/src/components/userprofile/admin/createBook';

import CreateBookForm from '../../client/src/components/userprofile/adminSubComponents/createBookForm';

import { CreateCategoryModal } from '../../client/src/components/userprofile/adminSubComponents/createCategory';
import { initialData, categories } from './mocks/mockdata';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// Configure file reader
global.FileReader = () => ({
  readAsDataURL: () => {}
});

// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //


const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test'
  }
}


// **************************************** //
// *****TEST FOR LOGIN FORM COMPONENT***** //
// *************************************** //

describe('renders Create Book Component and create category', () => {
  const minProps = {
    initialData,
    loadedCategories: categories,
    imageUrl: 'sampleUrl',
    pdfUrl: 'samplePdfUrl',
    createBook: jest.fn(() => Promise.resolve()),
    getCategories: jest.fn(() => Promise.resolve()),
    saveImageToCloudinary: jest.fn(() => Promise.resolve()),
    savePdfToCloudinary: jest.fn(() => Promise.resolve())
  }
  const wrapper = shallow(<CreateBook {...minProps}/>);
  it('renders css classes on div and the length of div', () => {
    expect(wrapper.find('div').length).toBe(3);  
  });

  it('should have the handleInput method', () => {
    const handleInputSpy = jest.spyOn(CreateBook.prototype, 'handleInput');
    shallow(<CreateBook {...minProps} onChange = {handleInputSpy}/>)
    .instance().handleInput(event);
    expect(handleInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should have the imageUploadHandler method', () => {

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'Test',
        files: ['sampleFile', 'sampleFile2']
      }
    }
    const imageUploadHandlerSpy = jest.spyOn(CreateBook.prototype, 'imageUploadHandler');
    shallow(<CreateBook {...minProps} imageUploadHandler = {imageUploadHandlerSpy}/>)
    .instance().imageUploadHandler(event);
    expect(imageUploadHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should have the fileUploadHandler method', () => {

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'Test',
        files: ['sampleFile', 'sampleFile2']
      }
    }
    const fileUploadHandlerSpy = jest.spyOn(CreateBook.prototype, 'fileUploadHandler');
    shallow(<CreateBook {...minProps} fileUploadHandler = {fileUploadHandlerSpy}/>)
    .instance().fileUploadHandler(event);
    expect(fileUploadHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should have the createBookHandler method', () => {

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'Test',
        files: ['sampleFile', 'sampleFile2']
      }
    }
    const createBookHandlerSpy = jest.spyOn(CreateBook.prototype, 'createBookHandler');
    shallow(<CreateBook {...minProps} onSubmit = {createBookHandlerSpy}/>)
    .instance().createBookHandler(event);
    expect(createBookHandlerSpy).toHaveBeenCalledTimes(1);
  });

  it('should have the componentDidMount method', () => {
    const componentDidMountSpy = jest.spyOn(CreateBook.prototype, 'componentDidMount');
    shallow(<CreateBook {...minProps}/>)
    .instance().componentDidMount;
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should have the componentWillReceiveProps method', () => {
    const nextProps = minProps;
    const componentWillReceivePropsSpy = jest.spyOn(CreateBook.prototype, 'componentWillReceiveProps');
    shallow(<CreateBook {...minProps}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
 
  it('ensures that mapDispatchToProps dispatches the specified actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).createBook).toBeTruthy();
    expect(mapDispatchToProps(dispatch).getCategories).toBeTruthy();
    expect(mapDispatchToProps(dispatch).saveImageToCloudinary).toBeTruthy();
    expect(mapDispatchToProps(dispatch).savePdfToCloudinary).toBeTruthy();
  });

  it('ensures that mapStateToProps dispatches the specified actions', () => {
    const state = {
    initialData,
    createCategory: {},
    uploadFiles: '',
    uploadFiles: '',
    }
    expect(mapStateToProps(state).initialData).toExist;
    expect(mapStateToProps(state).loadedCategories).toExist;
    expect(mapStateToProps(state).imageUrl).toExist;
    expect(mapStateToProps(state).pdfUrl).toExist;
  });
});

describe('Create Book Form', () => {

  const props = {
    disableBtn: false,
    showHiddenBtns: false,
    loader: false,
    error: '',
    successStatus: false,
    errorStatus: false,
    success: '',
    createBookHandler: jest.fn(() => Promise.resolve()),
    handleInput: jest.fn(),
    initialData: {},
    createCategory: jest.fn(() => Promise.resolve()),
    loadedCategories: categories,
    imageUploadHandler: jest.fn(),
    fileUploadHandler: jest.fn()
  }
  it('renders the create book form without crashing', () => {
    const wrapper = shallow(<CreateBookForm { ...props }/>);
    expect(wrapper.find('div').length).toBe(26);
    expect(wrapper.find('.createBookForm').length).toBe(1);
    expect(wrapper.find('.create-book').length).toBe(1);
    expect(wrapper.find('.create-form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(11);
    expect(wrapper.find('textarea').length).toBe(1);  
  });
});


describe('Create Category', () => {
  const wrapper = shallow(<CreateCategoryModal { ...props }/>);
  const props = {
    newCategory: '',
      newCategoryError: '',
      newCategoryErrorStatus: false,
      newCategorySuccessStatus: false,
      newCategorySuccess: '',
      loader: false,
      disableSubmit: false,
      handleInput: jest.fn(),
      saveCategory: jest.fn(() => Promise.resolve()),
      closeModal: jest.fn(),
      loaderText: '',
      createCategory: jest.fn(() => Promise.resolve())
  }
  it('renders the create category form without crashing', () => {
    expect(wrapper.find('#addCategory').length).toBe(1);
    expect(wrapper.find('.modal-content').length).toBe(1);
    expect(wrapper.find('.modal-footer').length).toBe(1);
    expect(wrapper.find('div').length).toBe(14);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);  
  });

  it('ensure that it has the method: handleInput', () => {
    const spyHandleInput = jest.spyOn(CreateCategoryModal.prototype, 'handleInput');
    shallow(<CreateCategoryModal {...props} onChange={spyHandleInput}/>)
    .instance().handleInput(event);
    expect(spyHandleInput).toHaveBeenCalledTimes(1);    
  });

  it('ensure that it has the method: closeModal', () => {
    const spycloseModal = jest.spyOn(CreateCategoryModal.prototype, 'closeModal');
    shallow(<CreateCategoryModal {...props} onChange={spycloseModal}/>)
    .instance().closeModal({setState:() => 1});
    expect(spycloseModal).toHaveBeenCalledTimes(1);    
  });

  it('ensure that it has the method: saveCategory', () => {
    const spysaveCategory = jest.spyOn(CreateCategoryModal.prototype, 'saveCategory');
    shallow(<CreateCategoryModal {...props} onChange={spysaveCategory}/>)
    .instance().saveCategory(event);
    expect(spysaveCategory).toHaveBeenCalledTimes(1);    
  });
});
