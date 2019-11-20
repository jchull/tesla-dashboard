import {sessionListReducer} from "./reducers";
import {combineReducers, createStore, Store} from "redux";

export const rootReducer = combineReducers({
  sessionList: sessionListReducer
});

export function configureStore(): Store {
  const store = createStore(combineReducers({}));

  return store;
}

