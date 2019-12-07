import {ChargeSession, ChargeState, DriveSession, DriveState} from 'tesla-dashboard-api';
import {ApiType} from '@service/index';
import {createAction} from '@reduxjs/toolkit';

export interface SessionState {
  sessions: (ChargeSession | DriveSession)[];
  selectedSessionId?: string;
  selectedSessionStates?: ChargeState[] | DriveState[];
}

export const fetchSessionListStart = createAction('FETCH_SESSION_LIST__START');
export const fetchSessionListFail = createAction('FETCH_SESSION_LIST__FAIL');

export const fetchSessionListSuccess = createAction('FETCH_SESSION_LIST__SUCCESS', (sessions) => ({
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


export const fetchSessionDetailsSuccess = createAction('FETCH_SESSION_DETAILS__SUCCESS', (states) => ({
  payload: {
    selectedSessionStates: states
  }
}));

export const fetchSessionListAction =
    (vin: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchSessionListStart());
      return extraArgument.api.queryService.getRecentSessions(vin, 200)
                          .then((result) => {
                            dispatch(fetchSessionListSuccess(result));
                          }, (error: any) => {
                            dispatch(fetchSessionListFail(error));
                          });
    };


export const fetchSessionDetailsAction =
    (sessionId: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(fetchSessionDetailsStart());
      return extraArgument.api.queryService.getSessionDetails(sessionId)
                          .then((result: DriveState[] | ChargeState[]) => {
                            dispatch(fetchSessionDetailsSuccess(result));
                          }, (error: any) => {
                            dispatch(fetchSessionDetailsFail(error));
                          });
    };


export const addSessionTagStart = createAction('ADD_SESSION_TAG__START');
export const addSessionTagFail = createAction('ADD_SESSION_TAG__FAIL');
export const addSessionTagSuccess = createAction('ADD_SESSION_TAG__SUCCESS');

export const addSessionTagAction =
    (sessionId: string, tag: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(addSessionTagStart());
      return extraArgument.api.queryService.addTag(sessionId, tag)
                          .then((result) => {
                            dispatch(addSessionTagSuccess());
                          }, (error: any) => {
                            dispatch(addSessionTagFail(error));
                          });
    };

export const removeSessionTagStart = createAction('REMOVE_SESSION_TAG__START');
export const removeSessionTagFail = createAction('REMOVE_SESSION_TAG__FAIL');
export const removeSessionTagSuccess = createAction('REMOVE_SESSION_TAG__SUCCESS');
export const removeSessionTagAction =
    (sessionId: string, tag: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(addSessionTagStart());
      return extraArgument.api.queryService.removeTag(sessionId, tag)
                          .then((result) => {
                            dispatch(addSessionTagSuccess());
                          }, (error: any) => {
                            dispatch(addSessionTagFail(error));
                          });
    };
