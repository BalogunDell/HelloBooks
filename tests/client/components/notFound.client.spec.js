import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { createSpy, spyOn, isSpy } from 'expect'
import Notfound from '../../../client/src/components/presentational/NotFound/NotFound';

jest.mock('../../../client/src/components/Useraccess/Forms/PasswordResetModal.jsx');
jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;



// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //

describe('404 page', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notfound/>);
    expect(wrapper.find('.notFoundContent').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
});