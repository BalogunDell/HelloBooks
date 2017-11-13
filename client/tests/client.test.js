import React from 'react';
import { configure } from 'enzyme';
import  Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';
import chai from 'chai';
const expect = chai.expect;
import Home from '../src/components/home/Home.jsx';

describe('Test', () => {
    it('says nothing', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('Home')).to.have.length(1);
    });
});