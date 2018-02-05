import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import {
  RegistrationForm
} from '../../../client/src/components/userAccess/Forms/RegistrationForm';

import { 
  Register,
  mapDispatchToProps,
  mapStateToProps
} from '../../../client/src/components/userAccess/Register'

import {
  userData,
  signupResponse,
  mockBooks,
  profile
} from '../mock/mockdata';

jest.mock('../../../client/src/components/userAccess/Forms/PasswordResetModal.jsx');
jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;



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

// ******************************************* //
// ****TEST FOR REGISTRATION FORM COMPONENT*** //
// ******************************************* //

describe('Registration Form Component', () => {
  it('renders without crashing', () => {
    const props = {
      userData: userData,
      handleSubmit: jest.fn(),
      handleUserInput: jest.fn(),
      error: '',
      loading: false
    }
    const wrapper = shallow(<RegistrationForm {...props} />);
    expect(wrapper.find('div').length).toBe(20);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('.form-holder').length).toBe(1);
    expect(wrapper.find('.form-header').length).toBe(1);
    expect(wrapper.find('.user-form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(7);
  });
});

// *************************************//
// *****TEST FOR REGISTER COMPONENT*****//
// *************************************//

describe('Register Component', () => {
  const wrapper = shallow(<Register {...props}/>);

  const props = {
    initialUserData: { 
      username: '', 
      firstname: '', 
      lastname: '', 
      email: '', 
      password: '', 
      confirmPassword: ''
    },
    authStatus: false,
    userType: 'admin',
    saveNewUser: jest.fn(() => Promise.resolve())
  }
  it('renders the register component', () => {
    expect(wrapper.find('div').length).toBe(1);
    const handleUserInputSpy = jest.spyOn(Register.prototype, 'handleUserInput');
    shallow(<Register { ...props } onChange = {handleUserInputSpy}/>)
    .instance().handleUserInput(event);
    expect(handleUserInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the register handler method', () => {
    const handleSubmitspy = jest.spyOn(Register.prototype, 'handleSubmit');
    shallow(<Register { ...props } onSubmit = {handleSubmitspy}/>)
    .instance().handleSubmit(event);
    expect(handleSubmitspy).toHaveBeenCalledTimes(1);
  });

  it('should contain the mapDispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).saveNewUser).toBeTruthy();
  });

  it('should contain the mapDispatchToProps method', () => {
    const store = {
      initialUserData: { username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: ''},
      userAccess: {
        isAuthenticated: false,
        userData: profile
      }
    };
    expect(mapStateToProps(store).authStatus).toExist;
    expect(mapStateToProps(store).initialUserData).toExist;
    expect(mapStateToProps(store).userType).toExist;
  });
});
