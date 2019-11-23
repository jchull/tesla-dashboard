import {IVehicleSession} from 'tesla-dashboard-api';
import {ThunkAction} from 'redux-thunk';
import {action, createAction} from 'typesafe-actions';
import {api, ApiType} from '@service/index';

export enum SessionListActionType {
  FETCH_SESSION_LIST__START = 'FETCH_SESSION_LIST__START',
  FETCH_SESSION_LIST__FAIL = 'FETCH_SESSION_LIST__FAIL',
  FETCH_SESSION_LIST__SUCCESS = 'FETCH_SESSION_LIST__SUCCESS'
}

export interface SessionListAction {
  type: SessionListActionType,
  payload?: {
    sessionList?: IVehicleSession[],
    selectedSession?: IVehicleSession,
    message?: string
  }
}

export const fetchSessionListStart = () => action(SessionListActionType.FETCH_SESSION_LIST__START);

export const fetchSessionListFail = (message: string): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__FAIL,
  payload: {
    message
  }
});

export const fetchSessionListSuccess = (sessionList: IVehicleSession[]): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__SUCCESS,
  payload: {
    sessionList
  }
});

export const fetchSessionListAction =
    (vin:string) => async (dispatch: any, getState: any, api:ApiType): Promise<any> => {
        dispatch(fetchSessionListStart());
        return api.queryService.getRecentSessions(vin, 200)
                  .then((result: IVehicleSession[]) => {
                    dispatch(fetchSessionListSuccess(result));
                  });
      }


