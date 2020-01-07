import {DriveSession} from './DriveSession';
import {VehicleState} from './VehicleState';

export interface DriveState extends VehicleState {
  _id: string;
  gps_as_of: number;
  heading: number;
  latitude: number;
  longitude: number;
  power: number;
  shift_state: string;
  speed: number;
  odometer: number;
  session?: DriveSession;
}
