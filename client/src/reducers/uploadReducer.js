import {
  SAVE_IMAGE,
  SAVE_PDF,
} from '../actions/actionTypes';

/**
 * 
 * @description Defines reducer for uploads
 * 
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} new state
 */
const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state, imageUrl: action.image
      };
    case SAVE_PDF:
      return {
        ...state, PDFUrl: action.PDF
      };
    default:
      return state;
  }
};

export default uploadReducer;
