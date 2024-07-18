import { createAsyncThunk } from "@reduxjs/toolkit";
import { PatchData, RangeType, UserTransaction } from "../data.types";
import { walletInstance } from "../../services/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const getAllTransactions = createAsyncThunk(
  "transactions/getAllTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await walletInstance.get("/transactions");
      return response.data;
    } catch (error) {
      toast.error("Couldn't fetch the transactions, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: UserTransaction, thunkAPI) => {
    try {
      const response = await walletInstance.post("/transactions", transaction);
      return response.data;
    } catch (error) {
      toast.error("Couldn't add the transaction, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction: PatchData, thunkAPI) => {
    try {
      const response = await walletInstance.patch(
        `/transactions/${transaction.transId}`,
        transaction.updTransaction
      );
      return response.data;
    } catch (error) {
      toast.error("Couldn't update the transaction, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transId: string, thunkAPI) => {
    try {
      const response = await walletInstance.delete(`/transactions/${transId}`);
      return response.data;
    } catch (error) {
      toast.error("Couldn't delete the transaction, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

//utils

export const getTransactionsSummary = createAsyncThunk(
  "transactions/getTransactionsSummary",
  async (range: RangeType | undefined, thunkAPI) => {
    const params = new URLSearchParams({});
    range?.year && params.append("year", String(range.year));
    range?.month && params.append("month", String(range.month));
    try {
      const response = await walletInstance.get(
        `/transactions-summary${params.size > 0 ? "?" + params : ""}`
      );
      return response.data;
    } catch (error) {
      toast.error("Couldn't fetch the statistics, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const getTransactionsCategories = createAsyncThunk(
  "transactions/getTransactionsCategories",
  async (_, thunkAPI) => {
    try {
      const response = await walletInstance.get("/transaction-categories");
      return response.data;
    } catch (error) {
      toast.error("Couldn't fetch the categories, please try again");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);
