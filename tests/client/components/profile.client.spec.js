import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import $ from 'jquery';
import { shallow, mount, render , configure} from 'enzyme';
import expect, { spyOn } from 'expect'
import {
  Profile,
  mapStateToProps,
  mapDispatchToProps
} from '../../../client/src/components/containers/Profile';
import ProfileInfo from '../../../client/src/components/presentational/ProfileInfo';
import UpdateForm from '../../../client/src/components/presentational/UpdateForm';
import { 
  ProfileUpdateForm,
  dispatchToProps,
  stateToProps
 } from '../../../client/src/components/containers/ProfileUpdateForm';
import UpdateImageModal from '../../../client/src/components/presentational/UpdateImageModal';

import { profile, categories, mockBooks, userProfile } from '../mock/mockdata';
import mockStorage from '../mock/mockDataStorage';

window.localStorage = mockStorage;

jest.mock('react-router-dom');

configure({ adapter: new Adapter() });
global.$ = global.jQuery = $;
global.FileReader = () => ({
  readAsDataURL: () => {}
});
global.JSON = {
  parse: () => {},
  stringify: () => {}
}
global.Materialize = {
  Materialize: () => {}
}



const props = {
  userData: profile.user,
  viewProfile:false,
  showInput: false,
  editButton: true,
  tempImageName: '',
  imageHeight: 0,
  imageWidth: 0,
  loader: false,
  newImageUploadError: false,
  newImageUploadSuccess: false,
  newImageUploadSuccessMessage: '',
  newImageUploadErrorMessage: '',
  disableUpdateBtn: false,
  preview: '',
  defaultUserImage: 'https://res.cloudinary.com/djvjxp2am/image/upload/v1510302773/default_image_yi56ca.jpg',
  showProfile: jest.fn(),
  hideChangeForm: jest.fn(),
  showInputHandler: jest.fn(),
  cancelEdit: jest.fn(),
  handleImageEdit: jest.fn(() => Promise.resolve()),
  imageUploadHandler: jest.fn(() => Promise.resolve()),
  saveNewImage: jest.fn(() => Promise.resolve()),
  saveNewImageToDB: jest.fn(() => Promise.resolve()),
  };

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'username',
    value: 'Test',
    dataset: {},
    files: ['nothing']
  },
  persist: () => {}
};

describe('Profile, updateImageModal and profileUpdateForm components', () => {
  const wrapper = shallow(<Profile {...props}/>)
  it('should render these components successfully', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('.profile').length).toBe(1);    
  });

  it('test the method: showProfile', () => {
    const spy = jest.spyOn(Profile.prototype, 'showProfile');
    shallow(<Profile {...props} showProfile = {spy}/>)
    .instance().showProfile(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('test the method: showInputHandler', () => {
    const spy = jest.spyOn(Profile.prototype, 'showInputHandler');
    shallow(<Profile {...props} showInputHandler = {spy}/>)
    .instance().showInputHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('test the method: hideChangeForm', () => {
    const spy = jest.spyOn(Profile.prototype, 'hideChangeForm');
    shallow(<Profile {...props} hideChangeForm = {spy}/>)
    .instance().hideChangeForm(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('test the method: handleImageEdit', () => {
    const spy = jest.spyOn(Profile.prototype, 'handleImageEdit');
    shallow(<Profile {...props} handleImageEdit = {spy}/>)
    .instance().handleImageEdit(event);
  });

  it('test the method: imageUploadHandler', () => {
    const spy = jest.spyOn(Profile.prototype, 'imageUploadHandler');
    shallow(<Profile {...props} imageUploadHandler = {spy}/>)
    .instance().imageUploadHandler(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('test the method: componentDidMount', () => {
    const spy = jest.spyOn(Profile.prototype, 'componentDidMount');
    shallow(<Profile {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('test the method: componentWillReceiveProps', () => {
    const spy = jest.spyOn(Profile.prototype, 'componentWillReceiveProps');
    const nextProps = {
      userProfile: profile,
      newImageUrl: {
        ImageUrl: 'dfaddsadsfadfdf'
      }
    }
    shallow(<Profile {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
  });

  it('test the method: componentWillReceiveProps', () => {
    const spy = jest.spyOn(Profile.prototype, 'componentWillReceiveProps');
    const nextProps = {
      userProfile: '',
      newImageUrl: {
        ImageUrl: ''
      }
    }
    shallow(<Profile {...props} componentWillReceiveProps = {spy}/>)
    .instance().componentWillReceiveProps(nextProps);
  });

  it('test the method: mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).saveNewImage).toBeTruthy();
    expect(mapDispatchToProps(dispatch).saveNewImageToDB).toBeTruthy();
  });

  it('test the method: mapDispatchToProps', () => {
    const state = {
      userProfile: profile,
      uploadFiles: ''
    }
    expect(mapStateToProps(state).newImageUrl).toExist;
    expect(mapStateToProps(state).userProfile).toExist;
  });
});;

describe('Update Image Profile', () => {
  const props = {
    imageUploadHandler: jest.fn(), 
    handleImageEdit: jest.fn(), 
    cancelEdit: jest.fn(), 
    loader: false, 
    newImageUploadError: '', 
    newImageUploadSuccess: '', 
    newImageUploadErrorMessage: '', 
    newImageUploadSuccessMessage: '', 
    disableUpdateBtn: false,
    preview: ''
  };
  const wrapper = shallow(<UpdateImageModal {...props}/>);
  it('should render update image profile successfully', () => {
    expect(wrapper.find('div').length).toBe(18);
  });
});

describe('Profile Update Form', () => {
  const props = {
    userData: profile,
    errorMessage: '',
    errorStatus: false,
    loader: false,
    successStatus: false,
    successMessage: '',
    disable: false,
    handleUserInput: jest.fn(),
    handleProfileUpdate: jest.fn(() => Promise.resolve()),
    editProfile: jest.fn(() => Promise.resolve())
  }
  const wrapper = shallow(<ProfileUpdateForm {...props}/>)
  it('should render the Profile Update Form successfully', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should test the method: handleUserInput', () => {
    const spy = jest.spyOn(ProfileUpdateForm.prototype, 'handleUserInput');
    shallow(<ProfileUpdateForm {...props} handleUserInput = {spy}/>)
    .instance().handleUserInput(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: componentDidMount', () => {
    const spy = jest.spyOn(ProfileUpdateForm.prototype, 'componentDidMount');
    shallow(<ProfileUpdateForm {...props} componentDidMount = {spy}/>)
    .instance().componentDidMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: componentWillMount', () => {
    const spy = jest.spyOn(ProfileUpdateForm.prototype, 'componentWillMount');
    shallow(<ProfileUpdateForm {...props} componentWillMount = {spy}/>)
    .instance().componentWillMount;
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: handleProfileUpdate', () => {
    const spy = jest.spyOn(ProfileUpdateForm.prototype, 'handleProfileUpdate');
    shallow(<ProfileUpdateForm {...props} handleProfileUpdate = {spy}/>)
    .instance().handleProfileUpdate(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should test the method: dispatchToProps', () => {
    const dispatch = jest.fn();
    expect(dispatchToProps(dispatch).editProfile).toBeTruthy();
  });

  it('should test the method: stateToProps', () => {
    const state = {
      userProfile: {
        data: profile.user
    }
    };
    expect(stateToProps(state).updateProfile).toExist;
  });
});

describe('Profile Info Component', () => {
  const props = {
    userData: profile.payload,
    showInputHandler: jest.fn()
  }
  it('should render without crashing', () => {
    const wrapper = shallow(<ProfileInfo {...props}/>)
  });
});

describe('Update Form', () => {
  const props = {
  handleProfileUpdate: jest.fn(),
  userData: profile,
  handleUserInput: jest.fn(),
  errorMessage:'',
  errorStatus: false,
  loader: true,
  successStatus: false,
  successMessage: '',
  disable: true,
  cancelEdit: jest.fn(),
}
  const wrapper = shallow(<UpdateForm {...props}/>)
  it('renders without crashing', () => {
    expect(wrapper.find('div').length).toEqual(9);
    expect(wrapper.find('input').length).toEqual(5);
  });
});