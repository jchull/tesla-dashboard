import {DriveSession, DriveSessionType} from './DriveSession';
import {ChargeSessionType} from './ChargeSession';

export type SessionType = DriveSessionType | ChargeSessionType;


export function isDriveSession<T extends SessionType>(session: T): boolean {
  // if(session.first.){
  //   return true;
  // }
  return false;
}
