import {IChargeSession, IDriveSession, IVehicle, IVehicleSession} from 'tesla-dashboard-api';

export interface AppState {
  productList: ProductListState,
  sessionList: SessionListState,
  //username?: string
  // TODO: keep track of role for admin settings page
}

export interface SessionListState {
  sessionList: IVehicleSession[];
  vehicle?: IVehicle;
  selectedSessionId?: string;
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

  selectionHandler(sessionId: string): any;
}
