import * as types from '../Actions/actionTypes';

const uploadReducer = (state={}, action) => {
    switch(action.type) {
        case types.SAVE_IMAGE: 
            return {
                ...state, image: action.image
            }
        case types.SAVE_PDF: 
            return {
                ...state, pdf: action.pdf
            }
        default: 
            return state
    }
}

export default uploadReducer;