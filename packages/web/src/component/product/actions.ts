import { Product } from '@teslapp/common';

import { ApiType } from '@teslapp/web/src/service';
import { createAction } from '@reduxjs/toolkit';

export interface ProductState {
  products: Product[];
  selectedProductId?: string;
}

export enum ProductActionType {
  FETCH_PRODUCT_LIST__START = 'FETCH_PRODUCT_LIST__START',
  FETCH_PRODUCT_LIST__FAIL = 'FETCH_PRODUCT_LIST__FAIL',
  FETCH_PRODUCT_LIST__SUCCESS = 'FETCH_PRODUCT_LIST__SUCCESS',
  SELECT_PRODUCT = 'SELECT_PRODUCT'
}

export const fetchProductListStart = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__START
);
export const fetchProductListFail = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__FAIL
);

export const fetchProductListSuccess = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__SUCCESS,
  (products: Product[]) => ({
    payload: {
      productList: products
    }
  })
);

export const selectProduct = createAction(
  ProductActionType.SELECT_PRODUCT,
  (productId: string) => ({
    payload: {
      selectedProductId: productId
    }
  })
);

export const fetchProductListAction = (syncUpstream = false) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchProductListStart());
  return extraArgument.api.queryService
    .getProducts(syncUpstream)
    .then((result: Product[]) => {
      dispatch(fetchProductListSuccess(result));
    })
    .catch(() => dispatch(fetchProductListFail()));
};
