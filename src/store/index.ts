import {combineReducers, createStore, Store} from 'redux';
import {sessionListReducer} from './reducers/SessionList';
import {productListReducer} from './reducers/ProductList';

export const rootReducer = combineReducers({
                                             productList: productListReducer,
                                             sessionList: sessionListReducer
                                           });

export function configureStore(): Store {
  const store = createStore(rootReducer);

  // TODO: add middleware?
  return store;
}

