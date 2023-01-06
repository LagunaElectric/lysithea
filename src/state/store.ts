import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"
import { ActionType } from "./action-types"

export const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: {
    id: "w45gw4",
    type: "code",
    direction: "up"
  }
})

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: {
    id: "w45ghw",
    type: "text",
    direction: "up"
  }
})
