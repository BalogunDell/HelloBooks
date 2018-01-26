import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { spyOn } from 'expect'
import jwt from 'jsonwebtoken';
import ConnectedEditBookForm, {
  EditBook
} from '../../client/src/components/Userprofile/AdminSubComponents/EditBook';
import Books from '../../client/src/components/Books/Books';
import Book from '../../client/src/components/Books/Book'

jest.mock('../../client/src/components/Userprofile/AdminSubComponents/CreateCategoryModal.jsx');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { 
  publishedBooksSample,
  categories,
  mockBooks,
  token,
  editBookResponse } from './mocks/mockdata';

import mockStorage from './mocks/mockDataStorage';
import { setState } from 'expect/build/jest_matchers_object';

window.localStorage = mockStorage;

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
// Configure Juery for test 
global.$ = global.jQuery = $;

// Configure file reader
global.FileReader = () => ({
  readAsDataURL: () => {}
});

global.JSON = {
  parse: () => {},
  stringify: () => {}
};

global.Materialize = {
  toast: () => {}
};

global.modal ={
  modal: () => {}
}

const props = {
    bookData: {
      publishedBooksSample
    }
  };

  global.this = {
    setState: () => {}
  }
const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test',
    dataset: {},
    files: ['nothing']
  },
  persist: () => {}
}

const wrapper = shallow(<Books {...props} />);
describe('Books Component,', () => {
  it('should render the book component without crashing', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});

describe('Edit Books Component,', () => {
  const props = {
    getCategories: jest.fn(() => Promise.resolve()),
    modifyBook: jest.fn(() => Promise.resolve()),
    saveImageToCloudinary: jest.fn(() => Promise.resolve()),
    savePdfToCloudinary: jest.fn(() => Promise.resolve()),
    handleEditInput: jest.fn(),
    handleUpdate: jest.fn(),
    imageUploadHandler: jest.fn(),
    fileUploadHandler: jest.fn(),
    getBookToEdit: publishedBooksSample,
    loadedCategories: categories,
  };
  const wrapper = shallow(<EditBook {...props} />);
  it('should render the edit book component without crashing', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should have the handleEditInput method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'handleEditInput');
    shallow(<EditBook {...props} onChange= {spy}/>)
    .instance().handleEditInput(event);
  });

  it('should set book categoryid to state when input values changes', () => {
    const setup = mount(<EditBook {...props} />);
    const event = {
      target: { name: 'categoryid', value: 2 } };
    const categoryId = setup.find('#categoryid');

    event.target.value = 3;
    categoryId.simulate('change', event);

    expect(wrapper.instance().state.book.categoryid).toBe(2);
  });
  

  it('should have the handleUpdate method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'handleUpdate');
    shallow(<EditBook {...props} onSubmit={spy}/>)
    .instance().handleUpdate(event);
  });

  it('should not save book if image dimensions are small and if there is no file selected', () => {
    const setup = mount(<EditBook {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: 'dfadsfadsfdsf',
      tempFileName: '',
      imageHeight: 200,
      imageWidth: 150, 
    });
    form.simulate('submit', event);
    expect(setup.instance().state.error)
      .toBe('Image is too small. Allowed dimension is 300 x 250 pixels.');
  });


  it('should save book if image dimensions are bigger than specified and if there is no file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: 'dfadsfadsfdsf.png',
      tempFileName: '',
      imageHeight: 500,
      imageWidth: 450,
      loader: false,
      book: publishedBooksSample[0]
    });
    form.simulate('submit', event);
    expect(setup.instance().state.redirect).toBe(false);
  });


  it('should not save book if file size is more than 10MB and if there is no image file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: '',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 199485760
    });
    form.simulate('submit', event);
    expect(setup.instance().state.error)
      .toBe('Only portraits are allowed and should be less than 10MB.');
  });


  it('should not save book if image size is less than 10MB and if there is no image file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: '',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 9485760,
      book: publishedBooksSample[0]
    });
    form.simulate('submit', event);
    expect(setup.instance().state.redirect).toBe(false);
  });

  it('should not save book if image dimensions are small and if there is no file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: 'dfadsfadsfdsf',
      tempFileName: 'dfadsfadsfdsf',
      imageHeight: 200,
      imageWidth: 150, 
    });
    form.simulate('submit', event);
    expect(setup.instance().state.error)
    .toBe('Image is too small. Allowed dimension is 300 x 250 pixels.');
  });

  it('should not save book if file size is more than 10MB and if there is no image file selected', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: 'dfadsfadsfdsf',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 19485760,
      imageHeight: 2300,
      imageWidth: 3150, 
    });
    form.simulate('submit', event);
    expect(setup.instance().state.error)
    .toBe('Only portraits are allowed and should be less than 10MB.');
  });

  it('should save book if all conditions are met', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const setup = mount(<EditBook {...props} />);
    const form = setup.find('#handleSubmit');
    setup.setState({
      tempImageName: 'dfadsfadsfdsf',
      tempFileName: 'dfadsfadsfdsf',
      tempFileSize: 185760,
      imageHeight: 600,
      imageWidth: 450,
      book: publishedBooksSample[0],
    });
    form.simulate('submit', event);
  });


  it('should have the handleUpdate method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'handleUpdate');
    shallow(<EditBook {...props} onSubmit= {spy}/>)
    .instance().handleUpdate(event);
  });

  it('should have the imageUploadHandler method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'imageUploadHandler');
    shallow(<EditBook {...props} imageUploadHandler= {spy}/>)
    .instance().imageUploadHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the fileUploadHandler method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'fileUploadHandler');
    shallow(<EditBook {...props} fileUploadHandler= {spy}/>)
    .instance().fileUploadHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should have the componentDidMount method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'componentDidMount');
    shallow(<EditBook {...props} componentDidMount= {spy}/>)
    .instance().componentDidMount;
  });

  it('should have the componentWillReceiveProps method', () => {
    const spy = jest.spyOn(EditBook.prototype, 'componentWillReceiveProps');
    const nextProps = {
      loadedCategories: categories,
      imageUrl: 'sampleUrl',
      pdfUrl: 'sampleUrl'
    }
    shallow(<EditBook {...props} componentWillReceiveProps= {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('Single Book component', () => {
  global.books = {
    books: publishedBooksSample
  }
  it('Should render without crashing', () => {
    const props = {
      bookData: 
      {
        bookData: {
          books: publishedBooksSample,
        }   
      }
    }
    const wrapper = shallow(<Book {...props}/>);
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('.books-holder-title').length).toBe(1);
    expect(wrapper.find('.trending').length).toBe(1);
    expect(wrapper.find('.books-holder').length).toBe(1);
    expect(wrapper.find('.trending-book-holder-prot').length).toBe(1);
  });
});

describe('Connected EditBookForm component', () => {
  it('tests that the component successfully rendered', () => {
    const store = mockStore({
      books: {
        publishedBooksSample
      },
      loadedCategories: categories,
      uploadFiles: '',
      uploadFiles: ''
    });
    const wrapper = shallow(<ConnectedEditBookForm store={store} />);
    expect(wrapper.length).toBe(1);
  });
});



