import {SessionState, SessionActionType} from './actions';
import {createReducer} from '@reduxjs/toolkit';

const initialState: SessionState = {
  sessions: []
};

export const sessionListReducer = createReducer(initialState, {
  [SessionActionType.FETCH_SESSION_DETAILS__START]: (state, action) => {
  },
  [SessionActionType.FETCH_SESSION_DETAILS__FAIL]: (state, action) => {
  },
  [SessionActionType.FETCH_SESSION_DETAILS__SUCCESS]: (state, action) => {
    state.selectedSessionStates = action.payload.selectedSessionStates;
  },
  [SessionActionType.SELECT_SESSION]: (state, action) => {
    state.selectedSessionId = action.payload.selectedSessionId;
  },
  [SessionActionType.FETCH_SESSION_LIST__START]: (state, action) => {
  },
  [SessionActionType.FETCH_SESSION_LIST__SUCCESS]: (state, action) => {
    state.sessions = action.payload.sessions ?? [];
    state.selectedSessionId = action.payload.selectedSessionId;
  },
  [SessionActionType.FETCH_SESSION_LIST__FAIL]: (state, action) => {
    //TODO: add failure message
  },
  [SessionActionType.ADD_SESSION_TAG__SUCCESS]: (state, action) => {
    const sessionIndex = state.sessions.findIndex((session) => session._id === action.payload.sessionId);
    state.sessions[sessionIndex].tags.push(action.payload.tag);
  },
  [SessionActionType.REMOVE_SESSION_TAG__SUCCESS]: (state, action) => {
    const sessionIndex = state.sessions.findIndex((session) => session._id === action.payload.sessionId);
    state.sessions[sessionIndex].tags = state.sessions[sessionIndex].tags.filter((tag) => action.payload.tag !== tag);
  },
  [SessionActionType.REMOVE_SESSION__SUCCESS]: (state, action) => {
    state.sessions = state.sessions.filter((session) => session._id !== action.payload.sessionId);
    if(state.selectedSessionId === action.payload.sessionId){
      state.selectedSessionId = state.sessions[0]._id;
    }
  }

  // TODO: use a slice for the tags?
});