import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { spyOn } from 'expect'

import Background from '../../client/src/components/Background/Background';

import Navbar from '../../client/src/components/navbar/Navbar';
import { publishedBooksSample } from './mocks/mockdata';
import mockStorage from './mocks/mockDataStorage';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

window.localStorage = mockStorage;

describe('Background Component', () => {
  const wrapper = shallow(<Background/>);
  it('renders the Background component without crashing', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
});

describe('Navbar Component', () => {
  
  it('should render without exploding', () => {
    const wrapper = shallow(<Navbar/>);
    expect(wrapper.find('div').length).toBe(1);
  });
});