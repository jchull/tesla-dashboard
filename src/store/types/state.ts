import {IChargeSession, IDriveSession, IVehicle, IVehicleSession} from 'tesla-dashboard-api';

export interface ChargeListItemState {
  session: IChargeSession;
}


export interface DriveListItemState {
  session: IDriveSession;
}


export interface ProductListState {
  products: IVehicle[];
  selectedProductId?: string;
}


export interface ProductListItemState {
  product: IVehicle;
  handleSelection: (productId: string) => void;
  selected?: boolean;
}


export interface SessionListItemState {
  session: IVehicleSession;
  selected: boolean;

  selectionHandler(sessionId: string): any;
}
