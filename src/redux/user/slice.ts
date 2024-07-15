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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.user.balance = action.payload;
      })
      .addMatcher(
        isAnyOf(signIn.fulfilled, signUp.fulfilled),
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
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
