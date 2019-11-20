import {ACTION_TYPES, SessionAction} from "../actions";
import {IVehicle, IVehicleSession} from "tesla-dashboard-api";
import {AppState} from "../types/state";

const initialState = {
  productsList: [] as IVehicle[],
  selectedProducts: [] as IVehicle[],
  sessionList: [] as IVehicleSession[]
};

export function sessionListReducer(state = initialState, action: SessionAction): AppState {
  switch (action.type) {
    case ACTION_TYPES.DELETE_SESSION:
      return state;// TODO
      break;
    case ACTION_TYPES.ARCHIVE_SESSION:
      return {
        ...state,
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