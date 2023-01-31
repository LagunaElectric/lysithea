import {
  createSlice,
  PayloadAction,
  current,
  createAsyncThunk
} from "@reduxjs/toolkit"
import { Cell, CellsState, Direction } from "./cells"
import axios from "axios"
import { RootState } from "../../store"

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const randomId = () => {
  return Math.random().toString(36).substring(2, 5)
}

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const { id, content } = action.payload
      state.data[id].content = content
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload]
      state.order = state.order.filter(id => id !== action.payload)
    },
    moveCell: (
      state,
      action: PayloadAction<{ id: string; direction: "up" | "down" }>
    ) => {
      const { direction } = action.payload
      const index = state.order.findIndex(id => id === action.payload.id)
      const targetIndex = direction === "up" ? index - 1 : index + 1

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state
      }

      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id
    },
    insertCell: (
      state,
      action: PayloadAction<{
        id: string | null
        type: "text" | "code"
        direction: Direction
      }>
    ) => {
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId()
      }

      state.data[cell.id] = cell

      const foundIndex = state.order.findIndex(id => id === action.payload.id)

      if (foundIndex < 0) {
        state.order.unshift(cell.id)
      } else {
        const targetIndex =
          action.payload.direction === "up" ? foundIndex : foundIndex + 1
        state.order.splice(targetIndex, 0, cell.id)
      }
    },
    fetchCells: state => {
      state.loading = true
      state.error = null
    },
    fetchCellsComplete: (state, action: PayloadAction<Cell[]>) => {
      state.order = action.payload.map(cell => cell.id)
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell
        return acc
      }, {} as CellsState["data"])
      state.loading = false
      state.error = null
    },
    fetchCellsError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    saveCellsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

export const saveCellsAsync = createAsyncThunk(
  "saveCellsAsync",
  async (_, thunkAPI) => {
    console.log("saveCellsAsync")
    console.log("thunkAPI: ", thunkAPI.getState())
    const state = thunkAPI.getState() as RootState
    const { data, order } = state.cells
    const cells = order.map(id => data[id])
    console.log("data: ", data)
    console.log("order: ", order)
    try {
      await axios.post("/cells", { cells })
    } catch (err) {
      if (err instanceof Error) {
        thunkAPI.dispatch(saveCellsError(err.message))
      }
    }
  }
)

export const fetchCellsAsync = createAsyncThunk(
  "fetchCellsAsync",
  async (_: CellsState, { dispatch }) => {
    console.log("fetchCellsAsync")
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells")
      dispatch(fetchCellsComplete(data))
    } catch (err) {
      if (err instanceof Error) {
        dispatch(fetchCellsError(err.message))
      }
    }
  }
)

export const {
  updateCell,
  deleteCell,
  moveCell,
  insertCell,
  fetchCells,
  fetchCellsComplete,
  fetchCellsError,
  saveCellsError
} = cellsSlice.actions
//export const { updateCell,  } = cellsSlice.actions;
export default cellsSlice.reducer
