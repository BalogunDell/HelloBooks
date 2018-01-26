import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import {
    CreateCategoryModal,
    mapDispatchToProps } from '../../client/src/components/Userprofile/AdminSubComponents/CreateCategoryModal';
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
  
  it('should have mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).createCategory).toBeTruthy();
  });
});
