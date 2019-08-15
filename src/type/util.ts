import {IDriveSession} from './DriveSession';

export function isDriveSession(arg: any): arg is IDriveSession {
  return arg.charge_to_max_range === undefined;
}
