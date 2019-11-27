import {IChargeState, IDriveState, IVehicleSession} from 'tesla-dashboard-api';
import {ApiType} from '@service/index';
import {createAction} from '@reduxjs/toolkit';

export interface SessionState {
  sessions: IVehicleSession[];
  selectedSessionId?: string;
  selectedSessionStates?: IChargeState[] | IDriveState[];
}

export const fetchSessionListStart = createAction('FETCH_SESSION_LIST__START');
export const fetchSessionListFail = createAction('FETCH_SESSION_LIST__FAIL');

export const fetchSessionListSuccess = createAction('FETCH_SESSION_LIST__SUCCESS', (sessions: IVehicleSession[]) => ({
  payload: {
    sessions
  }
}));

export const selectSession = createAction('SELECT_SESSION', (selectedSessionId: string) => ({
  payload: {
    selectedSessionId
  }
}));

export const fetchSessionDetailsStart = createAction('FETCH_SESSION_DETAILS__START');
export const fetchSessionDetailsFail = createAction('FETCH_SESSION_DETAILS__FAIL');


export const fetchSessionDetailsSuccess = createAction('FETCH_SESSION_DETAILS__SUCCESS', (states: IChargeState[] | IDriveState[]) => ({
  payload: {
    selectedSessionStates: states
  }
}));

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
