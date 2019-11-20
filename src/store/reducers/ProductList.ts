import {ACTION_TYPES, ProductListAction} from '../actions';
import {IVehicle} from 'tesla-dashboard-api';
import {ProductListState} from '../types/state';

const initialState = {
  products: [] as IVehicle[]
} as ProductListState;

export function productListReducer(state = initialState, action: ProductListAction): ProductListState {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_PRODUCT_LIST:
      return {
        products: action.productList
      };
      break;

    default:
      return state;
  }
}