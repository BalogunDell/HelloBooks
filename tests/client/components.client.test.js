import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

import Home from '../../client/src/components/home/Home';
import LoginForm from '../../client/src/components/useraccess/Forms/LoginForm';
import { PasswordResetModal } from '../../client/src/components/useraccess/Forms/PasswordResetModal';
import * as mockData from './mockdata';

const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });
jest.mock('react-router-dom');


// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //
describe('component: Home', () => {
    it('renders Home component', () => {
        const wrapper = render(<Home />);
        const testRender = renderer.create(<Home/>);
      expect(testRender.toJSON()).to.matchSnapshot();
      expect(wrapper.find('.intro')).to.have.length(1);
      expect(wrapper.find('h1').text()).to.equal('Hellobooks Library');
      expect(wrapper.find('p').text()).to.equal(mockData.homeParagraph);
    });

  // it('renders Login Form', () => {
  //   const minProps = {
  //     userData: {},
  //     handleLoginInput: jest.fn(),
  //     loginHandler: jest.fn(),
  //     error: false,
  //     isLoading: false
  //   }
  //   const wrapper = render(<LoginForm {...minProps}/>);
  //   expect(wrapper.find('.user-login-form')).to.have.length(1);
  // });

  it('renders Password Reset Modal', () => {
    
    const testRender = renderer.create(<PasswordResetModal/>);
    const wrapper = mount(<PasswordResetModal handleSubmit = {mockFunction} />);
    const mockFunction = wrapper.instance().handleSubmit;
    wrapper.find('button').simulate('click');
    // expect(mockFunction).to.have.property('callCount', 1);
    expect(testRender.toJSON()).to.matchSnapshot();
    expect(wrapper.find(PasswordResetModal)).to.have.length(1);
    expect(wrapper.find('.modal')).to.have.length(1);
    expect(wrapper.contains(<h5 className="center-align">Password reset</h5>)).to.equal(true);

  })
});