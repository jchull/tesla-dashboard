import {SessionListAction, SessionListActionType, SessionState} from './actions';
import {IVehicleSession} from 'tesla-dashboard-api';

const initialState = {
  sessions: [] as IVehicleSession[]
};

export function sessionListReducer(state = initialState, action: SessionListAction): SessionState {
  switch (action.type) {
    case SessionListActionType.FETCH_SESSION_DETAILS__START:
      return {
        ...state
      };
    case SessionListActionType.FETCH_SESSION_DETAILS__FAIL:
      return {
        ...state
        // message: "failed to get session details"
      };
    case SessionListActionType.FETCH_SESSION_DETAILS__SUCCESS:
      return {
        ...state,
        selectedSessionStates: action.payload && action.payload.selectedSessionStates

      };
    case SessionListActionType.SELECT_SESSION:
      return {
        ...state,
        selectedSessionId: action.payload && action.payload.selectedSessionId
      };
    case SessionListActionType.FETCH_SESSION_LIST__START:
      return {
        ...state
      };

    case SessionListActionType.FETCH_SESSION_LIST__SUCCESS:
      return {
        ...state,
        sessions: (action.payload ? action.payload.sessions : []) as IVehicleSession[],
        selectedSessionId: action.payload && action.payload.selectedSessionId
      };

    case SessionListActionType.FETCH_SESSION_LIST__FAIL:
      return {
        ...state
        //TODO: add failure message
      };


    default:
      return state;
  }
}