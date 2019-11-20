import {sessionListReducer} from "./reducers";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
  sessionList: sessionListReducer
})

export type AppState = ReturnType<typeof rootReducer>