import {IVehicle} from 'tesla-dashboard-api';
import {ApiType} from '@service/index';
import {createAction} from '@reduxjs/toolkit';


export interface ProductState {
  products: IVehicle[];
  selectedProductId?: string;
}


export const fetchProductListStart = createAction('FETCH_PRODUCT_LIST__START');
export const fetchProductListFail = createAction('FETCH_PRODUCT_LIST__FAIL');

export const fetchProductListSuccess = createAction('FETCH_PRODUCT_LIST__SUCCESS', (products: IVehicle[]) => ({
  payload: {
    productList: products
  }
}));

export const selectProduct = createAction('SELECT_PRODUCT', (productId:string) => ({
  payload: {
    selectedProductId: productId
  }
}));

export const fetchProductListAction =
    () => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchProductListStart());
      return extraArgument.api.queryService.getProducts()
                          .then((result: IVehicle[]) => {
                            dispatch(fetchProductListSuccess(result));
                          })
                          .catch(() => dispatch(fetchProductListFail()));
    };


