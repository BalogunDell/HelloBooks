import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/';

/**
 * @description configStore configures the store
 * 
 * @param {any} initialState
 * 
 * @returns { object } configured store
 */
const configStore = (initialState) => {
  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV === 'development'
        ?
        window.devToolsExtension() : f => f),
  );
};

export default configStore;
