import {AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk, {ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
import {sessionListReducer} from '@component/session/reducer';
import {productListReducer} from '@component/product/reducer';
import {ApiType} from '@service/index';

import {SessionState} from '@component/session/actions';
import {ProductState} from '@component/product/actions';

export interface AppState {
  product: ProductState,
  session: SessionState,
  //username?: string
  // TODO: keep track of role for admin settings page
}

// @ts-ignore
const logger = (store) => (next) => (action) => {
  console.log('action:', action);
  return next(action);
};

export function configureStore(services: ApiType): Store {
  const middlewares: Middleware[] = [];

  const thunkMiddleware: ThunkMiddleware<ThunkDispatch<{}, { api: ApiType }, AnyAction>, any, ThunkDispatch<{}, { api: ApiType }, AnyAction>> =
      reduxThunk.withExtraArgument({
                                     api: services
                                   });

  middlewares.push(thunkMiddleware);

  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    middlewares.push(logger);
  }

  return createStore(
      combineReducers<AppState>({
                                  product: productListReducer,
                                  session: sessionListReducer
                                }),
      composeWithDevTools(
          applyMiddleware(...middlewares)
      )
  );
};

