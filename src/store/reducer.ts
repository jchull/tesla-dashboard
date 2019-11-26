import {combineReducers} from 'redux';
import {authReducer} from '../auth/reducer';
import {productListReducer} from '@component/product/reducer';
import {sessionListReducer} from '@component/session/reducer';

export const rootReducer = combineReducers({
                                             auth: authReducer,
                                             product: productListReducer,
                                             session: sessionListReducer
                                           });