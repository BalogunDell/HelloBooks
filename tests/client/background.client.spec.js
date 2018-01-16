import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';
import expect, { spyOn } from 'expect'

import Background from '../../client/src/components/Background/Background';

import { publishedBooksSample } from './mocks/mockdata';

jest.mock('../../client/src/components/HOC/authenticate.jsx');
jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

describe('Background Component', () => {
  const wrapper = shallow(<Background/>);
  it('renders the Background component without crashing', () => {
    expect(wrapper.find('div').length).toBe(2);
  });
})