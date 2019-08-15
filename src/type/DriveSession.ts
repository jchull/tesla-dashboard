import {IDriveState} from './DriveState';
import {IVehicleSession} from './VehicleSession';

export interface IDriveSession extends IVehicleSession {
  distance?: number,  // end of trip
  first: IDriveState,
  last?: IDriveState
}
