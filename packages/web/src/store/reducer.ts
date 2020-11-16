import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@teslapp/web/src/component/auth/reducer'
import { productListReducer } from '@teslapp/web/src/component/product/reducer'
import { sessionListReducer } from '@teslapp/web/src/component/session/reducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productListReducer,
  session: sessionListReducer
})
