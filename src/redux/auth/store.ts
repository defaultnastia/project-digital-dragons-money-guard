// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
