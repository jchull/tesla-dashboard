import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../auth/reducer';
import { productListReducer } from '../product/reducer';
import { sessionListReducer } from '../session/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productListReducer,
  session: sessionListReducer,
});
