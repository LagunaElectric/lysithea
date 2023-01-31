import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cellsReducer from "./slices/cellsSlice/cellsSlice"
import bundlesReducer from "./slices/bundlesSlice/bundlesSlice"
import { persistMiddleware } from "./middlewares/persist-middleware"

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer
  },
  middleware: [persistMiddleware]
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
