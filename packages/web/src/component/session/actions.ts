import {
  ChargeSession,
  ChargeState,
  DriveSession,
  DriveState,
  QueryResult
} from '@teslapp/common';
import { ApiType } from '@teslapp/web/src/service';
import { createAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

export interface SessionState {
  sessions: (ChargeSession | DriveSession)[];
  selectedSessionId?: string;
  selectedSessionStates?: ChargeState[] | DriveState[];
  filters?: { include: string[]; exclude: string[] };
  loading?: boolean;
  loadedCount?: number;
  totalCount?: number;
  availableTags?: string[];
}

export enum SessionActionType {
  FETCH_SESSION_LIST__START = 'FETCH_SESSION_LIST__START',
  FETCH_SESSION_PAGE__START = 'FETCH_SESSION_PAGE__START',
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
  REMOVE_SESSION__SUCCESS = 'REMOVE_SESSION__SUCCESS',
  UPDATE_FILTERS = 'UPDATE_FILTERS',
  FETCH_ALL_TAGS__START = 'FETCH_ALL_TAGS__START',
  FETCH_ALL_TAGS__SUCCESS = 'FETCH_ALL_TAGS__SUCCESS',
  FETCH_ALL_TAGS__FAIL = 'FETCH_ALL_TAGS__FAIL'
}

export const fetchSessionListStart = createAction(
  SessionActionType.FETCH_SESSION_LIST__START
);

export const fetchSessionListPage = createAction(
  SessionActionType.FETCH_SESSION_PAGE__START
);

export const fetchSessionListFail = createAction(
  SessionActionType.FETCH_SESSION_LIST__FAIL,
  (error: any) => ({
    payload: error
  })
);

export const fetchSessionListSuccess = createAction(
  SessionActionType.FETCH_SESSION_LIST__SUCCESS,
  (result: QueryResult) => ({
    payload: {
      result
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

export const updateFilters = createAction(
  SessionActionType.UPDATE_FILTERS,
  (filters: any) => ({
    payload: {
      //TODO: update filters in store, then requery
    }
  })
);

export const fetchAllTagsStart = createAction(
  SessionActionType.FETCH_ALL_TAGS__START
);

export const fetchAllTagsSuccess = createAction(
  SessionActionType.FETCH_ALL_TAGS__SUCCESS,
  (tags) => ({
    payload: {
      availableTags: tags
    }
  })
);

export const fetchAllTagsFail = createAction(
  SessionActionType.FETCH_ALL_TAGS__FAIL
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

export const fetchAllTagsAction = (id: string) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchAllTagsStart());
  return extraArgument.api.queryService.getAllTags(id).then(
    (result) => {
      dispatch(fetchAllTagsSuccess(result));
    },
    (error: any) => {
      dispatch(fetchAllTagsFail());
    }
  );
};

export const fetchSessionListAction = (
  id: string,
  page: { start: number; size: number }
) => async (
  dispatch: any,
  getState: any,
  extraArgument: { api: ApiType }
): Promise<any> => {
  dispatch(fetchSessionListStart());
  return extraArgument.api.queryService.getRecentSessions(id, page).then(
    (result) => {
      dispatch(fetchSessionListSuccess(result));
    },
    (error: any) => {
      dispatch(fetchSessionListFail(error));
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
