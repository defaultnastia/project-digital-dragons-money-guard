import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { getBalance, refreshUser, signIn, signOut, signUp } from "./operations";
import { UserState } from "../data.types";

const initialState: UserState = {
  user: {
    username: "",
    email: "",
    id: "",
    balance: null,
  },
  token: null,
  loading: false,
  errorCode: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signOut.pending, () => {
        return initialState;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user.balance = action.payload.balance.toFixed(2);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.user.balance = action.payload.toFixed(2);
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addMatcher(
        isAnyOf(signIn.fulfilled, signUp.fulfilled),
        (state, action) => {
          state.user = action.payload.user;
          state.user.balance = action.payload.user.balance.toFixed(2);
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(isFulfilled, (state) => {
        state.loading = false;
        state.errorCode = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.errorCode = String(action.payload);
      })
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.errorCode = null;
      });
  },
});

export default userSlice.reducer;
