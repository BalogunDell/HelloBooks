import React from 'react';
import  Adapter from 'enzyme-adapter-react-15';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { shallow, mount, render , configure} from 'enzyme';
import jestSnapshot from 'chai-jest-snapshot';

// Import reducers
import uploadReducer from '../../../client/src/reducers/uploadReducer';



import { saveImage} from '../../../client/src/actions/userProfileAction';
import { savePDFToCloudinary } from '../../../client/src/actions/booksAction';
import { saveImagerResponse } from '../mock/mockdata';


// Configure necessary libs
const expect = chai.expect;
chai.use(jestSnapshot);
configure({ adapter: new Adapter() });

// Declare global variable
const initialState = {};
describe('Uploads Reducer', () => {

  it('should return a new state when SAVE_IMAGE is triggered', () => {
    const newState = uploadReducer(initialState,
      saveImage(saveImagerResponse));
    expect(newState.public_id).to.equal(saveImagerResponse.public_id);
    expect(newState.version).to.equal(saveImagerResponse.version);
    expect(newState.signature).to.equal(saveImagerResponse.signature);
    expect(newState.width).to.equal(saveImagerResponse.width);
    expect(newState.height).to.equal(saveImagerResponse.height);
    expect(newState.format).to.equal(saveImagerResponse.format);
    expect(newState.resource_type).to.equal(saveImagerResponse.resource_type);
    expect(newState.created_at).to.equal(saveImagerResponse.created_at);
    expect(newState.tags).to.equal(saveImagerResponse.tags);
    expect(newState.bytes).to.equal(saveImagerResponse.bytes);
    expect(newState.type).to.equal(saveImagerResponse.type);
    expect(newState.etag).to.equal(saveImagerResponse.etag);
    expect(newState.placeholder).to.equal(saveImagerResponse.placeholder);
    expect(newState.url).to.equal(saveImagerResponse.url);
    expect(newState.secure_url).to.equal(saveImagerResponse.secure_url);
    expect(newState.original_filename).to
    .equal(saveImagerResponse.original_filename);
  });

  it('should return a new state when SAVE_PDF is triggered', () => {
    const newState = uploadReducer(initialState,
      savePDFToCloudinary(saveImagerResponse));
    expect(newState.public_id).to.equal(saveImagerResponse.public_id);
    expect(newState.version).to.equal(saveImagerResponse.version);
    expect(newState.signature).to.equal(saveImagerResponse.signature);
    expect(newState.width).to.equal(saveImagerResponse.width);
    expect(newState.height).to.equal(saveImagerResponse.height);
    expect(newState.format).to.equal(saveImagerResponse.format);
    expect(newState.resource_type).to.equal(saveImagerResponse.resource_type);
    expect(newState.created_at).to.equal(saveImagerResponse.created_at);
    expect(newState.tags).to.equal(saveImagerResponse.tags);
    expect(newState.bytes).to.equal(saveImagerResponse.bytes);
    expect(newState.type).to.equal(saveImagerResponse.type);
    expect(newState.etag).to.equal(saveImagerResponse.etag);
    expect(newState.placeholder).to.equal(saveImagerResponse.placeholder);
    expect(newState.url).to.equal(saveImagerResponse.url);
    expect(newState.secure_url).to.equal(saveImagerResponse.secure_url);
    expect(newState.original_filename).to
    .equal(saveImagerResponse.original_filename);
  });

  it('should return the state when no action is passed', () => {
    const newState = uploadReducer(initialState, 'default');
    expect(newState).to.be.an('object');
    expect(newState).to.be.empty;
  });
});
