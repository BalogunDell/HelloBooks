import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { spyOn } from 'expect'

import ConfirmationModal from '../../client/src/components/Userprofile/AdminSubComponents/ConfirmationModal';

import { mockBooks, categories } from './mocks/mockdata';

import mockLocalStorage from './mocks/mockDataStorage'
import { prototype } from 'mocha';

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

window.localStorage = mockLocalStorage;

const props = {
  deleteErrorStatus: false,
  handleDeleteCancel: jest.fn(),
  deleteErrorSuccess: false,
  disabled: true,
  loader: false,
  errorMessage: '',
  successMessage: '',
  deleteBookTrigger: jest.fn(() => Promise.resolve())
}
describe('Confirmation Modal', () => {

  const wrapper = shallow(<ConfirmationModal {...props}/>)
  it('shoud render the confirmation modal without crashing', () => {
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('button').length).toBe(2);
  });
});
