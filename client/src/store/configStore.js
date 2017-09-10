import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

function configStore(initialState) {
  const combineEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
  rootReducer,
  initialState,
  combineEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}

export default configStore;