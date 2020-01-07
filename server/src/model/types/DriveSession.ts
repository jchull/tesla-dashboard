import {DriveState} from './DriveState';
import {Vehicle} from './tesla/Vehicle';

export interface DriveSession {
  _id: string;
  id_s: string;
  start_date: number;
  end_date?: number;
  archived: boolean;
  tags: string[];
  distance?: number;  // end of trip
  first: DriveState;
  last?: DriveState;
  vehicle?: Vehicle;
}
