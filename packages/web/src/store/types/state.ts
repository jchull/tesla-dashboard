import { types } from '@teslapp/common';

export interface ProductListState {
  products: types.Vehicle[];
  selectedProductId?: string;
}

export interface ProductListItemState {
  product: types.Vehicle;
  handleSelection: (productId: string) => void;
  selected?: boolean;
}

export interface SessionListItemState {
  session: types.VehicleActivity;
  selected: boolean;

  selectionHandler(sessionId: string): any;
}
