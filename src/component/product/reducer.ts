import {Vehicle as Product} from 'tesla-dashboard-api';
import {ProductListState} from '@store/types/state';
import {createReducer} from '@reduxjs/toolkit';

const initialState: ProductListState = {
  products: [] as Product[]
};

export const productListReducer = createReducer(initialState, {
  SELECT_PRODUCT: (state, action) => {
    state.selectedProductId = action.payload && action.payload.selectedProductId;
  },
  FETCH_PRODUCT_LIST__START: (state, action) => {

  },
  FETCH_PRODUCT_LIST__SUCCESS: (state, action) => {
    state.products = (action.payload ? action.payload.productList : []) as Product[];
    state.selectedProductId = state.selectedProductId || (action.payload && action.payload.productList && action.payload.productList[0]._id);
  },
  FETCH_PRODUCT_LIST__FAIL: (state, action) => {

  }
});