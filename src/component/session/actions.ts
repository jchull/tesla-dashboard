import {IChargeState, IDriveState, IVehicleSession, IVehicleState} from 'tesla-dashboard-api';
import {ApiType} from '@service/index';

export interface SessionState {
  sessions: IVehicleSession[];
  selectedSessionId?: string;
  selectedSessionStates?: IChargeState[] | IDriveState[];
}

export enum SessionListActionType {
  FETCH_SESSION_LIST__START = 'FETCH_SESSION_LIST__START',
  FETCH_SESSION_LIST__FAIL = 'FETCH_SESSION_LIST__FAIL',
  FETCH_SESSION_LIST__SUCCESS = 'FETCH_SESSION_LIST__SUCCESS',
  FETCH_SESSION_DETAILS__START = 'FETCH_SESSION_DETAILS__START',
  FETCH_SESSION_DETAILS__FAIL = 'FETCH_SESSION_DETAILS__FAIL',
  FETCH_SESSION_DETAILS__SUCCESS = 'FETCH_SESSION_DETAILS__SUCCESS',
  SELECT_SESSION = 'SELECT_SESSION'
}

export interface SessionListAction {
  type: SessionListActionType,
  payload?: {
    sessions?: IVehicleSession[],
    selectedSessionId?: string,
    selectedSessionStates?: IChargeState[] | IDriveState[],
    message?: string,
  }
}

export const fetchSessionListStart = (): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__START
});

export const fetchSessionListFail = (message: string): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__FAIL,
  payload: {
    message
  }
});

export const fetchSessionListSuccess = (sessions: IVehicleSession[]): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__SUCCESS,
  payload: {
    sessions
  }
});

export const selectSession = (selectedSessionId: string): SessionListAction => ({
  type: SessionListActionType.SELECT_SESSION,
  payload: {
    selectedSessionId
  }
});

export const fetchSessionDetailsStart = (): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_DETAILS__START
});

export const fetchSessionDetailsFail = (message: string): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_DETAILS__FAIL,
  payload: {
    message
  }
});

export const fetchSessionDetailsSuccess = (states: IChargeState[] | IDriveState[]): SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_DETAILS__SUCCESS,
  payload: {
    selectedSessionStates: states
  }
});

export const fetchSessionListAction =
    (vin: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchSessionListStart());
      return extraArgument.api.queryService.getRecentSessions(vin, 200)
                          .then((result: IVehicleSession[]) => {
                            dispatch(fetchSessionListSuccess(result));
                          }, (error: any) => {
                            dispatch(fetchSessionListFail(error));
                          });
    };


export const fetchSessionDetailsAction =
    (sessionId: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchSessionDetailsStart());
      return extraArgument.api.queryService.getSessionDetails(sessionId)
                          .then((result: IDriveState[] | IChargeState[]) => {
                            dispatch(fetchSessionDetailsSuccess(result));
                          }, (error: any) => {
                            dispatch(fetchSessionDetailsFail(error));
                          });
    };
