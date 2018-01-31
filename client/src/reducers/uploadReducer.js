import {
  SAVE_IMAGE,
  SAVE_PDF,
} from '../Actions/actionTypes';

const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state, imageUrl: action.image
      };
    case SAVE_PDF:
      return {
        ...state, PDFUrl: action.pdf
      };
    default:
      return state;
  }
};

export default uploadReducer;
