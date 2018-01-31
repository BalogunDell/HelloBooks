import { createStore, applyMiddleware, compose } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

/**
 * 
 * 
 * @param {any} initialState 
 * @returns { object } configured store
 */
const configStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f),
  );
};

export default configStore;


// const combineEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
//   return createStore(
//     rootReducer,
//     initialState,
//     combineEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))