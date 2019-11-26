import {AuthAction, AuthActionType, AuthState} from './actions';

const initialState: AuthState = {
  username: '',
  loggedIn: false
};

export function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.AUTH_LOGOUT__START:
      return initialState;

    default:
      return state;
  }
}