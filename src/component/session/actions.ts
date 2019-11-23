import {IVehicleSession} from 'tesla-dashboard-api';
import {api, ApiType} from '@service/index';

export enum SessionListActionType {
  FETCH_SESSION_LIST__START = 'FETCH_SESSION_LIST__START',
  FETCH_SESSION_LIST__FAIL = 'FETCH_SESSION_LIST__FAIL',
  FETCH_SESSION_LIST__SUCCESS = 'FETCH_SESSION_LIST__SUCCESS',
  SELECT_SESSION = "SELECT_SESSION"
}

export interface SessionListAction {
  type: SessionListActionType,
  payload?: {
    sessionList?: IVehicleSession[],
    selectedSessionId?: string,
    message?: string
  }
}

export const fetchSessionListStart = ():SessionListAction => ({
  type: SessionListActionType.FETCH_SESSION_LIST__START
});

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

export const selectSession = (selectedSessionId: string): SessionListAction => ({
  type:SessionListActionType.SELECT_SESSION,
  payload: {
    selectedSessionId
  }
})

export const fetchSessionListAction =
    (vin:string) => async (dispatch: any, getState: any, extraArgument: {api:ApiType}): Promise<any> => {
        dispatch(fetchSessionListStart());
        return extraArgument.api.queryService.getRecentSessions(vin, 200)
                  .then((result: IVehicleSession[]) => {
                    dispatch(fetchSessionListSuccess(result));
                  });
      }


