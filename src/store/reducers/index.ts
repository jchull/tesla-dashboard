import {ACTION_TYPES, SessionAction} from "../actions";
import {SessionListState} from "../types";
import {IVehicleSession} from "tesla-dashboard-api";

const initialState = {
  sessions: [] as IVehicleSession[]
};

export function sessionListReducer(state = initialState, action: SessionAction): SessionListState {
  switch (action.type) {
    case ACTION_TYPES.DELETE_SESSION:
      return {sessions: []};
      break;
    case ACTION_TYPES.ARCHIVE_SESSION:
      return {
        sessions: state.sessions.filter((session: IVehicleSession) => action.sessionId !== session._id)
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