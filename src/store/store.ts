import { configureStore } from "@reduxjs/toolkit"
import { tierApi } from "./reducers/tierSlice"

export const store = configureStore({
  reducer: {
    [tierApi.reducerPath]: tierApi.reducer
    /*  user: userReducer */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tierApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
