import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import { shallow, mount, render , configure} from 'enzyme';

import Home from '../client/src/components/home/Home';
import Books from '../client/src/components/books/Books';
import Book from '../client/src/components/books/book';

const expect = chai.expect;
configure({ adapter: new Adapter() });



// ************************ //
// *****COMPONENTS TEST**** //
// ************************ //
describe('component: Home', () => {
    it('renders without exploding', () => {
        const wrapper = render(<Home />);
      expect(wrapper.find('.intro')).to.have.length(1);
    });
  });

