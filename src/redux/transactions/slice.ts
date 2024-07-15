import {
  createSlice,
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
  statistics: null,
  loading: false,
  errorCode: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
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

export default transactionSlice.reducer;
