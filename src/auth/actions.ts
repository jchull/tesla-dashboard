import {ApiType} from '@service/index';


export interface AuthState {
  username: string,
  loggedIn: boolean
}

export enum AuthActionType {
  AUTH_LOGOUT__START = 'AUTH_LOGOUT__START'
}

export interface AuthAction {
  type: AuthActionType,
  payload?: {

  }
}


export function authLogout(): AuthAction {
  return {
    type: AuthActionType.AUTH_LOGOUT__START
  };
}
//
// export function fetchProductListFail(): ProductListAction {
//   return {
//     type: ProductListActionType.FETCH_PRODUCT_LIST__FAIL,
//     payload: {
//       message: 'failed to fetch product list'
//     }
//   };
// }
//
// export function fetchProductListSuccess(productList: IVehicle[]): ProductListAction {
//   return {
//     type: ProductListActionType.FETCH_PRODUCT_LIST__SUCCESS,
//     payload: {
//       productList
//     }
//   };
// }



// export const fetchProductListAction =
//     () => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
//       dispatch(fetchProductListStart());
//       return extraArgument.api.queryService.getProducts()
//                           .then((result: IVehicle[]) => {
//                             dispatch(fetchProductListSuccess(result));
//                           })
//                           .catch(() => dispatch(fetchProductListFail()));
//     };
//

