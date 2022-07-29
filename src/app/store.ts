import { configureStore } from "@reduxjs/toolkit"
import { tierApi } from "../services/tierApi"

export const store = configureStore({
  reducer: {
    [tierApi.reducerPath]: tierApi.reducer
    /*  user: userReducer */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tierApi.middleware)
})
