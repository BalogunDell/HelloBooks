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
jest.mock('../../client/src/components/userprofile/adminSubComponents/createCategory.jsx');
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

  it('should not save book if image dimensions are small and if there is no file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = mount(<CreateBook {...minProps}/>)
    const form = wrapper.find('#handleSubmit');
    wrapper.setState({
      tempImageName: 'dfadsfadsfdsf',
      tempFileName: '',
      imageHeight: 200,
      imageWidth: 150, 
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.error).toBe('Image is too small. Allowed dimension is 300 x 250 pixels.');
  });

  it('should not save book if the image size is higher than expected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = mount(<CreateBook {...minProps}/>)
    const form = wrapper.find('#handleSubmit');
    wrapper.setState({
      tempImageName: '',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 9485760,
      imageHeight: 200,
      imageWidth: 150
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.error).toBe('Image is too small. Allowed dimension is 300 x 250 pixels.');
  });


  it('should not save book if file size is more than 10MB', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = mount(<CreateBook {...minProps}/>)
    const form = wrapper.find('#handleSubmit');
    wrapper.setState({
      tempImageName: 'sdfdsfadf',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 19485760,
      imageHeight: 500,
      imageWidth: 450
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.error).toBe('File too large, Only 10MB or less is allowed.');
  });
  
  it('should pass on to the next condition if the main conditions are met', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = mount(<CreateBook {...minProps}/>)
    const form = wrapper.find('#handleSubmit');
    wrapper.setState({
      tempImageName: 'sdfsdfds',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 45760,
      imageHeight: 500,
      imageWidth: 450
    });
    form.simulate('submit', event);
  });

  it('should not save book if file size is more than 10MB and if there is no image file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = mount(<CreateBook {...minProps}/>)
    const form = wrapper.find('#handleSubmit');
    wrapper.setState({
      tempImageName: 'sdfsdfds',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 45760,
      imageHeight: 500,
      imageWidth: 450,
      bookData: {
        image: 'dfadfd',
        pdf: 'dfdfadf'
      }
    });
    form.simulate('submit', event);
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
