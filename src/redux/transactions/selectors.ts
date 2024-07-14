import { RootState } from "../store";

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export const selectCategories = (state: RootState) =>
  state.transactions.categories;

export const selectLoading = (state: RootState) => state.transactions.loading;

export const selectErrorCode = (state: RootState) =>
  state.transactions.errorCode;

export const selectStatistics = (state: RootState) =>
  state.transactions.statistics;
