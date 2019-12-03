import {Action, AnyAction, Middleware, Store} from 'redux';
import {configureStore as configureReduxStore} from '@reduxjs/toolkit';
import reduxThunk, {ThunkAction, ThunkDispatch, ThunkMiddleware} from 'redux-thunk';

import {ApiType} from '@service/index';
import {rootReducer} from './reducer';

export type AppState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, { api: ApiType }, Action<string>>;

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

  const initialState: AppState = {
    auth: {
      loggedIn: services.auth.loggedIn(),
      username: services.auth.getUsername(),
      token: services.auth.getToken() || undefined
    },
    product: {
      products: []
    },
    session: {
      sessions: []
    }
  };
  return configureReduxStore({
                               preloadedState: initialState,
                               reducer: rootReducer,
                               middleware: middlewares
                             }
  );
};

