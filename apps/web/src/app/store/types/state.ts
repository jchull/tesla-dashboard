import { Vehicle, VehicleActivity } from '@tesla-dashboard/types';

export interface ProductListState {
  products: Vehicle[];
  selectedProductId?: string;
}

export interface ProductListItemState {
  product: Vehicle;
  handleSelection: (productId: string) => void;
  selected?: boolean;
}

export interface SessionListItemState {
  session: VehicleActivity;
  selected: boolean;

  selectionHandler(sessionId: string): any;
}
