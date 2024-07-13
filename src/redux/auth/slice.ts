import { createSlice } from "@reduxjs/toolkit";
import { refreshUser, signIn, signOut, signUp } from "./operations";
import { UserState } from "../data.types";

const initialState: UserState = {
  user: {
    username: "",
    email: "",
    id: "",
    balance: 0,
  },
  token: null,
  loading: false,
  errorCode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //=== signUp ===//
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = String(action.payload);
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      //=== signIn ===//
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = String(action.payload);
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      //=== signOut ===//
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = String(action.payload);
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.errorCode = null;
        state.user = initialState.user;
        state.token = null;
      })

      //=== refresh ===//
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = String(action.payload);
      })
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
