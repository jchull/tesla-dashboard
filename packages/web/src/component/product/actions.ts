import { types } from '@teslapp/common'

import { ApiType } from '@teslapp/web/src/service'
import { createAction } from '@reduxjs/toolkit'

export interface ProductState {
  products: types.Vehicle[]
  selectedProductId?: string
}

export enum ProductActionType {
  FETCH_PRODUCT_LIST__START = 'FETCH_PRODUCT_LIST__START',
  FETCH_PRODUCT_LIST__FAIL = 'FETCH_PRODUCT_LIST__FAIL',
  FETCH_PRODUCT_LIST__SUCCESS = 'FETCH_PRODUCT_LIST__SUCCESS',
  SELECT_PRODUCT = 'SELECT_PRODUCT',

  SYNC_UPSTREAM__START = 'SYNC_UPSTREAM__START',
  SYNC_UPSTREAM__FAIL = 'SYNC_UPSTREAM__FAIL',
  SYNC_UPSTREAM__SUCCESS = 'SYNC_UPSTREAM__SUCCESS',

}

export const fetchProductListStart = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__START
)
export const fetchProductListFail = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__FAIL
)

export const fetchProductListSuccess = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__SUCCESS,
  (products: types.Vehicle[]) => ({
    payload: {
      productList: products
    }
  })
)

export const selectProduct = createAction(
  ProductActionType.SELECT_PRODUCT,
  (productId: string) => ({
    payload: {
      selectedProductId: productId
    }
  })
)

export const fetchProductListAction = (syncUpstream = false) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchProductListStart())
  return extraArgument.api.queryService
                      .getProducts(syncUpstream)
                      .then((result: types.Vehicle[]) => {
                        dispatch(fetchProductListSuccess(result))
                      })
                      .catch(() => dispatch(fetchProductListFail()))
}


export const syncUpstreamStart = createAction(
  ProductActionType.SYNC_UPSTREAM__START
)
export const syncUpstreamFail = createAction(
  ProductActionType.SYNC_UPSTREAM__FAIL
)

export const syncUpstreamSuccess = createAction(
  ProductActionType.FETCH_PRODUCT_LIST__SUCCESS,
  (product: types.Vehicle) => ({
    payload: {
      productList: product
    }
  })
)

export const syncUpstreamAction = (productId: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(syncUpstreamStart())
  return extraArgument.api.queryService
                      .syncCurrentActivity(productId)
                      .then((result: types.Vehicle) => {
                        dispatch(syncUpstreamSuccess(result))
                      })
                      .catch(() => dispatch(syncUpstreamFail()))
}
