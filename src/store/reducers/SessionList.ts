import {ACTION_TYPES, SessionListAction} from '../actions';
import {IVehicleSession} from 'tesla-dashboard-api';

const initialState = {
  sessionList: [] as IVehicleSession[]
};

// TODO: SessionAction should be part of a union type
export function sessionListReducer(state = initialState, action: SessionListAction) {
  switch (action.type) {
    case ACTION_TYPES.DELETE_SESSION:
      return {
        sessionList: state.sessionList.filter((session: IVehicleSession) => action.sessionId !== session._id)
      };
      break;
    case ACTION_TYPES.ARCHIVE_SESSION:
      return {
        sessionList: state.sessionList.filter((session: IVehicleSession) => action.sessionId !== session._id)
      };
      break;
      // case ACTION_TYPES.UPDATE_SESSION_LIST:
      //   break;
      // case ACTION_TYPES.FILTER_SESSION_LIST:
      //   break;
    default:
      return state;
  }
}