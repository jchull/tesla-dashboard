import { AuthActionType, AuthState } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState: AuthState = {
  loggedIn: false
};

export const authReducer = createReducer(initialState, {
  [AuthActionType.AUTH_LOGOUT__START]: (state, action) => {},
  [AuthActionType.AUTH_LOGOUT__SUCCESS]: (state, action) => {
    return initialState;
  },
  [AuthActionType.AUTH_LOGIN__START]: (state, action) => {},
  [AuthActionType.AUTH_LOGIN__FAILURE]: (state, action) => {
    return initialState;
  },
  [AuthActionType.AUTH_LOGIN__SUCCESS]: (state, action) => {
    state.username = action.payload.username;
    state.role = action.payload.role;
    state.token = action.payload.token;
    state.loggedIn = true;
  }
});
