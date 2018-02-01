import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import LoginForm from '../../client/src/components/Useraccess/Forms/LoginForm';
import { 
  Login,
  mapDispatchToProps,
  mapStateToProps
} from '../../client/src/components/Useraccess/Login';

import {
  PasswordResetModal,
  dispatchToProps
} from '../../client/src/components/Useraccess/Forms/PasswordResetModal';
import {
  userData,
  signupResponse
} from './mocks/mockdata';
import { PassThrough } from 'stream';

jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;
global.message = {
  message: ''
};


const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test'
  }
};


// **************************************** //
// *****TEST FOR LOGIN FORM COMPONENT***** //
// *************************************** //

describe('renders Login Form', () => {

  const minProps = {
    userData: {
      username: 'test',
      password: 'password'
    },
    handleLoginInput: jest.fn(),
    loginHandler: jest.fn(),
    error: '',
    isLoading: false,
    isAuthenticated: false,
  }
  const wrapper = shallow(<LoginForm {...minProps}/>);

  it('renders one login form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders css classes on div and the length of div', () => {
    expect(wrapper.find('.user-login-form').length).toBe(1);
    expect(wrapper.find('div').length).toBe(16);
    expect(wrapper.find('.form-holder').length).toBe(1);
    expect(wrapper.find('.form-header').length).toBe(1);
    expect(wrapper.find('.user-form').length).toBe(1);
    expect(wrapper.find('.resetPassBtn').length).toBe(1);
  });

  it('renders three input fields of type text and password and submit respectively', () => {
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('input').at(0).props().type).toBe('text');
    expect(wrapper.find('input').at(1).props().type).toBe('password');
    expect(wrapper.find('input').at(2).props().type).toBe('submit');
  });
});

// *********************************** //
// *****TEST FOR LOGIN COMPONENT***** //
// ********************************* //

describe('Login Component', () => {

  const props = {
    initialUserData: {
      username: 'Fred1',
      password: 'password'
    },
    googleAuth: {
      isAuthenticated: false
    },
    isAuthenticated: {
      userAccess: {
        isAuthenticated: false
      }
    },
    userLogin: jest.fn(() => Promise.resolve()),
    googleAccess: jest.fn(() => Promise.resolve())
  }
  it('renders the login component', () => {
    const wrapper = shallow(<Login {...props}/>);
    const handleLoginInputSpy = jest.spyOn(Login.prototype, 'handleLoginInput');
    shallow(<Login { ...props } onChange = {handleLoginInputSpy}/>)
    .instance().handleLoginInput(event);
    expect(handleLoginInputSpy).toHaveBeenCalledTimes(1);
  });

  it('should contain the login handler method', () => {
    const wrapper = shallow(<Login {...props}/>);
    const loginHandlerspy = jest.spyOn(Login.prototype, 'loginHandler');
    shallow(<Login { ...props } onSubmit = {loginHandlerspy}/>)
    .instance().loginHandler(event);
    expect(loginHandlerspy).toHaveBeenCalledTimes(1);
  });

  it('should contain the google login handler method', () => {
    const wrapper = shallow(<Login {...props}/>);
    const spy = jest.spyOn(Login.prototype, 'googleLoginHandler');
    const response = {
      profileObj: {
        givenName: '',
        familyName: '',
        googleId: 3,
        email: '',
        imageUrl: ''
      }
    }
    shallow(<Login { ...props } googleLoginHandler = {spy}/>)
    .instance().googleLoginHandler(response);
    expect(spy).toHaveBeenCalledTimes(1);
  });


  it('should ensure mapDispatchToProps returns called methods', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).userLogin).toBeTruthy();
    expect(mapDispatchToProps(dispatch).googleAccess).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      userData: signupResponse,
      isAuthenticated: true,
      userAccess: {
        isAuthenticated: true
      }
    };
    expect(mapStateToProps(storeState)).toBeTruthy();
  });
});

describe('Password Reset Modal', () => {

  const wrapper = shallow(<PasswordResetModal {...minProps}/>);

  const minProps = {
    handleInput: jest.fn(),
    handleSubmit: jest.fn(() => Promise.resolve()),
    cancelPassReset: jest.fn(),
    email: 'test@gmail.com',
    loader:false,
    disableBtn: false,
    message: '',
    sendEmail: jest.fn(() => Promise.resolve())
  }
  it('renders the modal without crashing', () => {
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('.passwordModal').length).toBe(1);
    expect(wrapper.find('#passwordResetModal').length).toBe(1);
    expect(wrapper.find('#message').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });


  it('ensure that it the handleSubmit method called', () => {
    const setup = shallow(<PasswordResetModal {...minProps}/>);
    const event = {
      preventDefault: jest.fn()
    };
    const form = setup.find('#handleSubmit');
    setup.setState({
      email: 'sample@gmail.com'
    });
    form.simulate('submit', event);
  });

  it('ensure that it the handleSubmit method called', () => {
    const setup = shallow(<PasswordResetModal {...minProps}/>);
    const event = {
      preventDefault: jest.fn()
    };
    const form = setup.find('#handleSubmit');
    setup.setState({
      email: ''
    });
    form.simulate('submit', event);
  });

  it('ensure that it the handleSubmit method called', () => {
    const setup = shallow(<PasswordResetModal {...minProps}/>);
    const event = {
      preventDefault: jest.fn()
    };
    const form = setup.find('#handleSubmit');
    setup.setState({
      email: ''
    });
    form.simulate('submit', event);
  });

  it('ensure that it the handleSubmit method called', () => {
    const setup = shallow(<PasswordResetModal {...minProps}/>);
    setup.instance.error = {
      response: {
        status: 501
      }
    }
    const event = {
      preventDefault: jest.fn()
    };
    const form = setup.find('#cancelPass');
    setup.setState({
      email: ''
    });
    form.simulate('click', event);
  });


  it('ensure that it has the handleInput method', () => {
    const spyhandleInput = jest.spyOn(PasswordResetModal.prototype, 'handleInput');
    shallow(<PasswordResetModal {...minProps} onChange={spyhandleInput}/>)
    .instance().handleInput(event);
    expect(spyhandleInput).toHaveBeenCalledTimes(1);
  });

  it('ensure that it has the componentDidMount method', () => {
    const spycomponentDidMount = jest.spyOn(PasswordResetModal.prototype, 'componentDidMount');
    const dispatch = jest.fn();
    shallow(<PasswordResetModal {...minProps} componentDidMount={spycomponentDidMount}/>)
    .instance().componentDidMount;
    expect(spycomponentDidMount).toHaveBeenCalledTimes(1);
    expect(dispatchToProps(dispatch).sendEmail).toBeTruthy();
  });

  it('ensure that it has the dispatchToProps method', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).sendEmail).toBeTruthy();
  });
});
