import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { TransactionsState } from "../data.types";
import {
  getAllTransactions,
  getTransactionsCategories,
  getTransactionsSummary,
} from "./operations";

const initialState: TransactionsState = {
  transactions: [],
  categories: [],
  loading: false,
  errorCode: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addMatcher(
        isAnyOf(
          getAllTransactions.fulfilled,
          getTransactionsSummary.fulfilled,
          getTransactionsCategories.fulfilled
        ),
        (state, action) => {
          state.transactions = action.payload;
        }
      );
  },
});

export default transactionSlice.reducer;
