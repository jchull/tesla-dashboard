import {IVehicle} from 'tesla-dashboard-api';
import {ProductListState} from '@store/types/state';
import {ProductListAction, ProductListActionType} from './actions';

const initialState: ProductListState = {
  products: [] as IVehicle[]
};

export function productListReducer(state = initialState, action: ProductListAction): ProductListState {
  switch (action.type) {
    case ProductListActionType.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload && action.payload.selectedProduct
      };
    case ProductListActionType.FETCH_PRODUCT_LIST__START:
      return {
        ...state
      }
    case ProductListActionType.FETCH_PRODUCT_LIST__SUCCESS:
      return {
        ...state,
        products: (action.payload? action.payload.productList : []) as IVehicle[],
        selectedProduct: state.selectedProduct || (action.payload && action.payload.productList && action.payload.productList[0])
      }
    case ProductListActionType.FETCH_PRODUCT_LIST__FAIL:
      return {
        ...state,
        products: []
      }

    default:
      return state;
  }
}