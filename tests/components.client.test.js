import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import { shallow, mount, render , configure} from 'enzyme';

import Home from '../client/src/components/home/Home';
import About from '../client/src/components/about/about';
import Books from '../client/src/components/books/Books';
import Book from '../client/src/components/books/book';
import Navbar from '../client/src/components/navbar/Navbar';
import * as mockData from './mockdata';

const expect = chai.expect;
configure({ adapter: new Adapter() });
jest.mock('react-router-dom');



// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //
describe('component: Home', () => {
    it('renders Home component', () => {
        const wrapper = render(<Home />);
      expect(wrapper.find('.intro')).to.have.length(1);
      expect(wrapper.find('h1').text()).to.equal('Hellobooks Library');
      expect(wrapper.find('p').text()).to.equal(mockData.homeParagraph);
    });

    it('renders About component', () => {
      const wrapper = render(<About />);
    expect(wrapper.find('.aboutUsHeader_Container')).to.have.length(1);
  });
  });