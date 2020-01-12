import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from '@component/auth/reducer';
import {productListReducer} from '@component/product/reducer';
import {sessionListReducer} from '@component/session/reducer';

export const rootReducer = combineReducers({
                                             auth: authReducer,
                                             product: productListReducer,
                                             session: sessionListReducer
                                           });