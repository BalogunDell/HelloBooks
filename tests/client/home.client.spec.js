import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from 'expect'

import Home from '../../client/src/components/home/Home';

import { homeParagraph } from './mocks/mockdata';

jest.mock('react-router-dom');


configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;



// ********************************* //
// *****TEST FOR HOME COMPONENT***** //
// ******************************** //

describe('component: Home', () => {

  it('renders Home component', () => {
    const wrapper = render(<Home />);
    const testRender = renderer.create(<Home />);
    expect(wrapper.find('.intro').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Hellobooks Library');
    expect(wrapper.find('p').text()).toEqual(homeParagraph);
  });
});

