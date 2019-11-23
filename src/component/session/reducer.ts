import {SessionListAction, SessionListActionType} from './actions';
import {IVehicleSession} from 'tesla-dashboard-api';
import {SessionListState} from '@store/types/state';

const initialState = {
  sessionList: [] as IVehicleSession[]
};

export function sessionListReducer(state = initialState, action: SessionListAction): SessionListState {
  switch (action.type) {
    case SessionListActionType.FETCH_SESSION_LIST__START:
      return {
        ...state,
        selectedSession: action.payload && state.sessionList.find((session: IVehicleSession) => session._id === action.payload)
      };

    case SessionListActionType.FETCH_SESSION_LIST__SUCCESS:
      return {
        ...state,
        sessionList: (action.payload ? action.payload.sessionList : []) as IVehicleSession[]
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