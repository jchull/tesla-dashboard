import {ChargeSession, DriveSession, Vehicle as Product} from 'tesla-dashboard-api';

export interface ChargeListItemState {
  session: ChargeSession;
}


export interface DriveListItemState {
  session: DriveSession;
}


export interface ProductListState {
  products: Product[];
  selectedProductId?: string;
}


export interface ProductListItemState {
  product: Product;
  handleSelection: (productId: string) => void;
  selected?: boolean;
}


export interface SessionListItemState {
  session: (ChargeSession | DriveSession);
  selected: boolean;

  selectionHandler(sessionId: string): any;
}
