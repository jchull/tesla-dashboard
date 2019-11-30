import {ApiType} from '@service/index';
import {createAction} from '@reduxjs/toolkit';


export interface AuthState {
  username?: string,
  loggedIn: boolean,
  role?: string,
  message?: string
}

export enum AuthActionType {
  AUTH_LOGIN__START = 'AUTH_LOGIN__START',
  AUTH_LOGIN__FAILURE = 'AUTH_LOGIN__FAILURE',
  AUTH_LOGIN__SUCCESS = 'AUTH_LOGIN__SUCCESS',
  AUTH_LOGOUT__START = 'AUTH_LOGOUT__START',
  AUTH_LOGOUT__SUCCESS = 'AUTH_LOGOUT__START',
}

export interface AuthAction {
  type: AuthActionType,
  payload?: {
    username?: string,
    password?: string
  }
}

export const authLoginStart = createAction(AuthActionType.AUTH_LOGIN__START);
export const authLoginFail = createAction(AuthActionType.AUTH_LOGIN__FAILURE);
export const authLoginSuccess = createAction(AuthActionType.AUTH_LOGIN__SUCCESS, (principal: { username: string, role: string }) => ({
  payload: {
    username: principal.username,
    role: principal.role
  }
}));

export const authLogoutStart = createAction(AuthActionType.AUTH_LOGOUT__START);
export const authLogoutSuccess = createAction(AuthActionType.AUTH_LOGOUT__SUCCESS);


export const loginAction =
    (username: string, password: string) => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(authLoginStart());
      return extraArgument.api.auth.login(username, password)
                          .then((result: boolean) => {
                            const role = 'temp';
                            if (result) {
                              return dispatch(authLoginSuccess({username, role}));
                            }
                          })
                          .catch(() => dispatch(authLoginFail()));
    };

export const logoutAction =
    () => async (dispatch: any, getState: any, extraArgument: { api: ApiType }): Promise<any> => {
      dispatch(authLogoutStart());
      return extraArgument.api.auth.logout()
                          .then(() => dispatch(authLogoutSuccess()));
    };


