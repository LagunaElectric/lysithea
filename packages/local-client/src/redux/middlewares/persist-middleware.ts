import { Middleware } from "redux"
import { createBundleAsync } from "../slices/bundlesSlice/bundlesSlice"
import {
  fetchCellsAsync,
  saveCellsAsync
} from "../slices/cellsSlice/cellsSlice"

export const persistMiddleware: Middleware = ({ getState, dispatch }) => {
  let timer: any
  return next => {
    return action => {
      const targetBundleAction = "bundles/bundleStart"
      const targetLoadAction = "cells/fetchCells"
      const targetSaveActions = [
        "cells/insertCell",
        "cells/updateCell",
        "cells/deleteCell",
        "cells/moveCell"
      ]
      next(action)

      if (targetSaveActions.includes(action.type)) {
        console.log("action intercepted: ", action)
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          saveCellsAsync()(dispatch, getState, undefined)
        }, 250)
      }

      if (action.type === targetLoadAction) {
        console.log("action intercepted: ", action)
        fetchCellsAsync(getState())(dispatch, getState, undefined)
      }

      if (action.type === targetBundleAction) {
        console.log("action intercepted: ", action)
        const { input, cellId } = action.payload
        console.log("input: ", input)
        console.log("cellId: ", cellId)
        createBundleAsync({ input, cellId })(dispatch, getState, undefined)
      }
    }
  }
}
