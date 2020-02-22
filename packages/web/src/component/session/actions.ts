import {
  ChargeSession,
  ChargeState,
  DriveSession,
  DriveState
} from '@teslapp/common/src/model';
import { ApiType } from '@teslapp/web/src/service';
import { createAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

export interface SessionState {
  sessions: (ChargeSession | DriveSession)[];
  selectedSessionId?: string;
  selectedSessionStates?: ChargeState[] | DriveState[];
}

export enum SessionActionType {
  FETCH_SESSION_LIST__START = 'FETCH_SESSION_LIST__START',
  FETCH_SESSION_LIST__FAIL = 'FETCH_SESSION_LIST__FAIL',
  FETCH_SESSION_LIST__SUCCESS = 'FETCH_SESSION_LIST__SUCCESS',
  SELECT_SESSION = 'SELECT_SESSION',
  FETCH_SESSION_DETAILS__START = 'FETCH_SESSION_DETAILS__START',
  FETCH_SESSION_DETAILS__FAIL = 'FETCH_SESSION_DETAILS__FAIL',
  FETCH_SESSION_DETAILS__SUCCESS = 'FETCH_SESSION_DETAILS__SUCCESS',
  ADD_SESSION_TAG__START = 'ADD_SESSION_TAG__START',
  ADD_SESSION_TAG__FAIL = 'ADD_SESSION_TAG__FAIL',
  ADD_SESSION_TAG__SUCCESS = 'ADD_SESSION_TAG__SUCCESS',
  REMOVE_SESSION_TAG__START = 'REMOVE_SESSION_TAG__START',
  REMOVE_SESSION_TAG__FAIL = 'REMOVE_SESSION_TAG__FAIL',
  REMOVE_SESSION_TAG__SUCCESS = 'REMOVE_SESSION_TAG__SUCCESS',
  REMOVE_SESSION__START = 'REMOVE_SESSION__START',
  REMOVE_SESSION__FAIL = 'REMOVE_SESSION__FAIL',
  REMOVE_SESSION__SUCCESS = 'REMOVE_SESSION__SUCCESS'
}

export const fetchSessionListStart = createAction(
  SessionActionType.FETCH_SESSION_LIST__START
);
export const fetchSessionListFail = createAction(
  SessionActionType.FETCH_SESSION_LIST__FAIL
);

export const fetchSessionListSuccess = createAction(
  SessionActionType.FETCH_SESSION_LIST__SUCCESS,
  (sessions) => ({
    payload: {
      sessions
    }
  })
);

export const selectSession = createAction(
  SessionActionType.SELECT_SESSION,
  (selectedSessionId: string) => ({
    payload: {
      selectedSessionId
    }
  })
);

export const fetchSessionDetailsStart = createAction(
  SessionActionType.FETCH_SESSION_DETAILS__START
);
export const fetchSessionDetailsFail = createAction(
  SessionActionType.FETCH_SESSION_DETAILS__FAIL
);

export const fetchSessionDetailsSuccess = createAction(
  SessionActionType.FETCH_SESSION_DETAILS__SUCCESS,
  (states) => ({
    payload: {
      selectedSessionStates: states
    }
  })
);

export const fetchSessionListAction = (id: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchSessionListStart());
  return extraArgument.api.queryService.getRecentSessions(id, 200).then(
    (result) => {
      dispatch(fetchSessionListSuccess(result));
    },
    (error: any) => {
      dispatch(fetchSessionListFail());
    }
  );
};

export const fetchSessionDetailsAction = (sessionId: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchSessionDetailsStart());
  return extraArgument.api.queryService.getSessionDetails(sessionId).then(
    (result: DriveState[] | ChargeState[]) => {
      dispatch(fetchSessionDetailsSuccess(result));
    },
    (error: any) => {
      dispatch(fetchSessionDetailsFail());
    }
  );
};

export const addSessionTagStart = createAction(
  SessionActionType.ADD_SESSION_TAG__START
);
export const addSessionTagFail = createAction(
  SessionActionType.ADD_SESSION_TAG__FAIL
);
export const addSessionTagSuccess = createAction(
  SessionActionType.ADD_SESSION_TAG__SUCCESS,
  (sessionId: string, tag: string) => ({
    payload: {
      tag,
      sessionId
    }
  })
);

export const addSessionTagAction = (sessionId: string, tag: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(addSessionTagStart());
  return extraArgument.api.queryService.addTag(sessionId, tag).then(
    (result) => {
      batch(() => {
        dispatch(addSessionTagSuccess(sessionId, tag));
      });
    },
    (error: any) => {
      dispatch(addSessionTagFail());
    }
  );
};

export const removeSessionTagStart = createAction(
  SessionActionType.REMOVE_SESSION_TAG__START
);
export const removeSessionTagFail = createAction(
  SessionActionType.REMOVE_SESSION_TAG__FAIL
);
export const removeSessionTagSuccess = createAction(
  SessionActionType.REMOVE_SESSION_TAG__SUCCESS,
  (sessionId: string, tag: string) => ({
    payload: {
      tag,
      sessionId
    }
  })
);

export const removeSessionTagAction = (
  sessionId: string,
  tag: string
) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(removeSessionTagStart());
  return extraArgument.api.queryService.removeTag(sessionId, tag).then(
    (result) => {
      batch(() => {
        dispatch(removeSessionTagSuccess(sessionId, tag));
      });
    },
    (error: any) => {
      dispatch(removeSessionTagFail());
    }
  );
};

export const removeSessionStart = createAction(
  SessionActionType.REMOVE_SESSION__START
);
export const removeSessionFail = createAction(
  SessionActionType.REMOVE_SESSION__FAIL
);
export const removeSessionSuccess = createAction(
  SessionActionType.REMOVE_SESSION__SUCCESS,
  (sessionId: string) => ({
    payload: {
      sessionId
    }
  })
);

export const removeSessionAction = (sessionId: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(removeSessionStart());
  return extraArgument.api.queryService.removeSession(sessionId).then(
    () => {
      batch(() => {
        dispatch(removeSessionSuccess(sessionId));
      });
    },
    (error: any) => {
      dispatch(removeSessionFail());
    }
  );
};
