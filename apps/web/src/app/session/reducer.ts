import { SessionActionType, SessionState } from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { QueryResult } from '@tesla-dashboard/util';

const initialState: SessionState = {
  sessions: [],
  loading: true,
  loadedCount: 0,
  totalCount: 0,
  availableTags: [],
};

export const sessionListReducer = createReducer(initialState, {
  [SessionActionType.SELECT_SESSION]: (state, action) => {
    state.selectedSessionId = action.payload.selectedSessionId;
  },

  // Session details fetching
  [SessionActionType.FETCH_SESSION_DETAILS__START]: (state, action) => {
    state.selectedSessionStates = undefined;
    state.loading = true;
  },
  [SessionActionType.FETCH_SESSION_DETAILS__FAIL]: (state, action) => {
    state.selectedSessionId = undefined;
    state.selectedSessionStates = undefined;
    state.loading = false;
  },
  [SessionActionType.FETCH_SESSION_DETAILS__SUCCESS]: (state, action) => {
    state.selectedSessionStates = action.payload.selectedSessionStates;
    state.loading = false;
  },

  // session list fetching
  [SessionActionType.FETCH_SESSION_LIST__CLEAR]: (state, action) => {
    state.selectedSessionId = undefined;
    state.selectedSessionStates = undefined;
    state.sessions = [];
  },
  [SessionActionType.FETCH_SESSION_LIST__START]: (state, action) => {
    state.loading = true;
  },
  [SessionActionType.FETCH_SESSION_LIST__SUCCESS]: (state, action) => {
    const result = action.payload.result as QueryResult;
    if (result?.results?.length) {
      const sessions = state.sessions.concat(...result.results).reduce((acc, cur) => {
        if (!acc.find((existing) => existing._id === cur._id)) {
          return acc.concat([cur]);
        }
        return acc;
      }, []);
      state.loadedCount = sessions.length;
      if (!state.sessions?.length) {
        state.selectedSessionId = sessions[0]._id;
      }
      state.sessions = sessions;
    }
    state.totalCount = result?.page?.total || 0;
    state.loading = false;
  },
  [SessionActionType.FETCH_SESSION_LIST__FAIL]: (state, action) => {
    // TODO: add failure message
    state.loading = false;
  },

  // tags
  [SessionActionType.FETCH_ALL_TAGS__START]: (state, action) => {},
  [SessionActionType.FETCH_ALL_TAGS__SUCCESS]: (state, action) => {
    state.availableTags = action.payload.availableTags;
  },
  [SessionActionType.FETCH_ALL_TAGS__FAIL]: (state, action) => {},
  [SessionActionType.ADD_SESSION_TAG__SUCCESS]: (state, action) => {
    const sessionIndex = state.sessions.findIndex((session) => session._id === action.payload.sessionId);
    state.sessions[sessionIndex].tags.push(action.payload.tag);
  },
  [SessionActionType.REMOVE_SESSION_TAG__SUCCESS]: (state, action) => {
    const sessionIndex = state.sessions.findIndex((session) => session._id === action.payload.sessionId);
    state.sessions[sessionIndex].tags = state.sessions[sessionIndex].tags.filter((tag) => action.payload.tag !== tag);
  },

  // session actions
  [SessionActionType.REMOVE_SESSION__SUCCESS]: (state, action) => {
    state.sessions = state.sessions.filter((session) => session._id !== action.payload.sessionId);
    if (state.selectedSessionId === action.payload.sessionId) {
      state.selectedSessionId = state.sessions[0]._id;
    }
  },

  // TODO: use a slice for the tags?
});
