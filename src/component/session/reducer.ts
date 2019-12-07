import {SessionState} from './actions';
import {createReducer} from '@reduxjs/toolkit';

const initialState: SessionState = {
  sessions: []
};

export const sessionListReducer = createReducer(initialState, {
  FETCH_SESSION_DETAILS__START: (state, action) => {
  },
  FETCH_SESSION_DETAILS__FAIL: (state, action) => {
  },
  FETCH_SESSION_DETAILS__SUCCESS: (state, action) => {
    state.selectedSessionStates = action.payload && action.payload.selectedSessionStates;
  },
  SELECT_SESSION: (state, action) => {
    state.selectedSessionId = action.payload && action.payload.selectedSessionId;
  },
  FETCH_SESSION_LIST__START: (state, action) => {
  },
  FETCH_SESSION_LIST__SUCCESS: (state, action) => {
    state.sessions = action.payload ? action.payload.sessions : [];
    state.selectedSessionId = action.payload && action.payload.selectedSessionId;
  },
  FETCH_SESSION_LIST__FAIL: (state, action) => {
    //TODO: add failure message
  },

  // TODO: use a slice for the tags?
});