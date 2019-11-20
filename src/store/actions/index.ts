import {IVehicleSession} from "tesla-dashboard-api";

export enum ACTION_TYPES {
  DELETE_SESSION = 'DELETE_SESSION',
  ARCHIVE_SESSION = 'ARCHIVE_SESSION',
  UPDATE_SESSION_LIST = 'UPDATE_SESSION_LIST',
  FILTER_SESSION_LIST = 'FILTER_SESSION_LIST'
}

export interface IAction {
  type: ACTION_TYPES
}

export interface SessionAction extends IAction{
  sessionId: string
}

export interface SessionListAction {
  sessionList: IVehicleSession[]
}


