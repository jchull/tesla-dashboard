import { Vehicle } from '@tesla-dashboard/types';
import { ProductListState } from '../store/types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: ProductListState = {
  products: [] as Vehicle[],
};

export const productListReducer = createReducer(initialState, {
  SELECT_PRODUCT: (state, action) => {
    // only select product if ID is found in current list of products
    if (
      action.payload.selectedProductId &&
      state.products.find((product) => product._id === action.payload.selectedProductId)
    ) {
      state.selectedProductId = action.payload.selectedProductId;
    }
  },
  // FETCH_PRODUCT_LIST__START: (state, action) => {},
  FETCH_PRODUCT_LIST__SUCCESS: (state, action) => {
    state.products = action.payload.productList;

    // if previously-selected product is not found in the new products list, select the first product in the list
    if (
      !state.selectedProductId ||
      !action.payload.products.find((product: Vehicle) => product._id === state.selectedProductId)
    ) {
      state.selectedProductId = action.payload.productList[0]._id;
    } else {
      state.selectedProductId = action.payload.selectedProductId;
    }
  },
  // FETCH_PRODUCT_LIST__FAIL: (state, action) => {},

  SYNC_UPSTREAM__SUCCESS: (state, action) => {
    // replace one existing product in list
    state.products = state.products.map((product) =>
      product._id === action.payload.product._id ? action.payload.product : product
    );
  },

  SYNC_UPSTREAM__FAIL: (state, action) => {
    // TODO: handle failure, message
  },
});
