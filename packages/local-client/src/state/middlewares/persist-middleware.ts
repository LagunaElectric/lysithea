import { Dispatch } from "redux"
import { Action } from "../actions"
import { ActionType } from "../action-types"
import { saveCells } from "../action-creators"
import { RootState } from "../reducers"

export const persistMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: any
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      const targetActions = [
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL,
        ActionType.DELETE_CELL
      ]

      next(action)

      if (targetActions.includes(action.type)) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState)
        }, 250)
      }
    }
  }
}
