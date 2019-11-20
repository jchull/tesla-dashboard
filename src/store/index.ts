import {combineReducers, createStore, Store} from 'redux';
import {sessionListReducer} from './reducers/SessionList';
import {productListReducer} from './reducers/ProductList';
import {devToolsEnhancer} from 'redux-devtools-extension';

export const rootReducer = combineReducers({
                                             productList: productListReducer,
                                             sessionList: sessionListReducer
                                           });

export function configureStore(): Store {
  const store = createStore(rootReducer, undefined, devToolsEnhancer({}));

  // TODO: add middleware?
  return store;
}

