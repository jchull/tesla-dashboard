import {IChargeSession, IDriveSession, IVehicle, IVehicleSession} from 'tesla-dashboard-api';


export interface AppState {
  products?: [IVehicle];
  username: string;
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
  products?: [IVehicle];
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
