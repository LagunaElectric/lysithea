import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { BundlesState } from "./bundles"
import Bundler from "../../../bundler"

const initialState: BundlesState = {}

export const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    bundleStart: (
      state,
      action: PayloadAction<{ cellId: string; input: string }>
    ) => {
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        error: ""
      }
    },
    bundleComplete: (
      state,
      action: PayloadAction<{
        cellId: string
        bundle: { code: string; error: string }
      }>
    ) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error
      }
    }
  }
})

export const createBundleAsync = createAsyncThunk(
  "createBundleAsync",
  async (payload: { cellId: string; input: string }, thunkAPI) => {
    console.log()
    const result = await Bundler(payload.input)
    thunkAPI.dispatch(
      bundleComplete({ cellId: payload.cellId, bundle: result })
    )
  }
)

export const { bundleStart, bundleComplete } = bundlesSlice.actions

export default bundlesSlice.reducer
