import {IVehicle} from 'tesla-dashboard-api';
import {ApiType} from '@service/index';


export interface ProductState {
  products: IVehicle[];
  selectedProductId?: string;
}

export enum ProductListActionType {
  FETCH_PRODUCT_LIST__START = 'FETCH_PRODUCT_LIST__START',
  FETCH_PRODUCT_LIST__FAIL = 'FETCH_PRODUCT_LIST__FAIL',
  FETCH_PRODUCT_LIST__SUCCESS = 'FETCH_PRODUCT_LIST__SUCCESS',
  SELECT_PRODUCT = 'SELECT_PRODUCT'
}

export interface ProductListAction {
  type: ProductListActionType,
  payload?: {
    productList?: IVehicle[],
    selectedProductId?: string,
    message?: string
  }
}


export function fetchProductListStart(): ProductListAction {
  return {
    type: ProductListActionType.FETCH_PRODUCT_LIST__START,
    payload: {
      message: 'fetching products...'
    }
  };
}

export function fetchProductListFail(): ProductListAction {
  return {
    type: ProductListActionType.FETCH_PRODUCT_LIST__FAIL,
    payload: {
      message: 'failed to fetch product list'
    }
  };
}

export function fetchProductListSuccess(productList: IVehicle[]): ProductListAction {
  return {
    type: ProductListActionType.FETCH_PRODUCT_LIST__SUCCESS,
    payload: {
      productList
    }
  };
}


export function selectProduct(selectedProductId: string): ProductListAction {
  return {
    type: ProductListActionType.SELECT_PRODUCT,
    payload: {
      selectedProductId
    }
  };
}

export const fetchProductListAction =
    () => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchProductListStart());
      return extraArgument.api.queryService.getProducts()
                          .then((result: IVehicle[]) => {
                            dispatch(fetchProductListSuccess(result));
                          })
                          .catch(() => dispatch(fetchProductListFail()));
    };


