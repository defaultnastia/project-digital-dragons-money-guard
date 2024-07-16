import { RootState } from "../store";

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

export const selectCategories = (state: RootState) =>
  state.transactions.categories;

export const selectStatistics = (state: RootState) =>
  state.transactions.statistics;
