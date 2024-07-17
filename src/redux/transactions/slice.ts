import { createSlice } from "@reduxjs/toolkit";
import { TransactionsState } from "../data.types";
import {
  getAllTransactions,
  getTransactionsCategories,
  getTransactionsSummary,
} from "./operations";
import { signOut } from "../user/operations";

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
      .addCase(signOut.pending, () => {
        return initialState;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(getTransactionsSummary.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default transactionSlice.reducer;
