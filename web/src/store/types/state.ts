import { ChargeSession, DriveSession, Product } from '@model/index';

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
  session: ChargeSession | DriveSession;
  selected: boolean;

  selectionHandler(sessionId: string): any;
}
