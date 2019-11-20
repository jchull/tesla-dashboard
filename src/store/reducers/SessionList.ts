import {ACTION_TYPES, SessionListAction} from '../actions';
import {IVehicleSession} from 'tesla-dashboard-api';
import {SessionListState} from '@store/types/state';

const initialState = {
  sessionList: [] as IVehicleSession[]
};

export function sessionListReducer(state = initialState, action: SessionListAction): SessionListState {
  switch (action.type) {
    case ACTION_TYPES.DELETE_SESSION:
      return {
        ...state,
        sessionList: state.sessionList.filter((session: IVehicleSession) => action.sessionId !== session._id)
      };
      break;
    case ACTION_TYPES.ARCHIVE_SESSION:
      return {
        ...state,
        sessionList: state.sessionList.filter((session: IVehicleSession) => action.sessionId !== session._id)
      };
      break;
    case ACTION_TYPES.UPDATE_SESSION_LIST:
      console.log('updating session list...');
      return {
        ...state,
        sessionList: action.sessionList
      };
      break;
      // case ACTION_TYPES.FILTER_SESSION_LIST:
      //   break;
    default:
      return state;
  }
}