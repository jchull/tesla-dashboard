import {IChargeSession, IDriveSession, IVehicle, IVehicleSession} from 'tesla-dashboard-api';

export interface AppState {
  productList: ProductListState,
  //selectedProducts: IVehicle[],
  sessionList: SessionListState,
  //username?: string
  // TODO: keep track of role for admin settings page
}

export interface SessionListState {
  sessions: IVehicleSession[];
  vehicle: IVehicle;
}

export interface VehicleViewState {
  vehicle: IVehicle;
}


export interface SessionTagListProps {
  vehicleId: string;
  sessionId: string;
  tags: string[];
}

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
  handleSelection: (product: IVehicle) => void;
  selected?: boolean;
}


export interface SessionListItemState {
  session: IVehicleSession;
  selected: boolean;

  selectionHandler(session: IVehicleSession): any;
}
