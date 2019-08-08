import {IDriveState} from './DriveState';

export interface IDriveSession {
  _id: string;
  id_s: string,
  start_date: Date,
  end_date: Date,  // end of trip
  distance?: number,  // end of trip
  tags: [string],
  first: IDriveState,
  last?: IDriveState
}

