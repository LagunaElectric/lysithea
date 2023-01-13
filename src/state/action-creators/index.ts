import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAction,
  BundleStartAction,
  BundleCompleteAction,
  Direction
} from "../actions"
import { CellTypes } from "../cell"
import Bundler from "../../bundler"

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  }
}

export const insertCell = (
  id: string | null,
  cellType: CellTypes,
  direction: Direction
): InsertCellAction => {
  return {
    type: ActionType.INSERT_CELL,
    payload: {
      id,
      type: cellType,
      direction
    }
  }
}

export const createBundle = (cellId: string, input: string) => {
  return async (
    dispatch: Dispatch<BundleStartAction | BundleCompleteAction>
  ) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    })

    const result = await Bundler(input)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    })
  }
}
