import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.errorCode = null;
        state.user = initialState.user;
        state.token = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.errorCode = null;
        state.user = action.payload;
      })
      // === rejected and pending===//
      .addMatcher(
        isAnyOf(
          refreshUser.rejected,
          signOut.rejected,
          signIn.rejected,
          signUp.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.errorCode = String(action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          refreshUser.pending,
          signOut.pending,
          signIn.pending,
          signUp.pending
        ),
        (state) => {
          state.loading = true;
          state.errorCode = null;
        }
      );
  },
});

export default authSlice.reducer;
