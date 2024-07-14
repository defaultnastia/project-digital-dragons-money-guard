import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserCredentials } from "../data.types";
import { RootState } from "../store";

const walletAuthInstance = axios.create({
  baseURL: "https://wallet.b.goit.study/api",
});

const setAuthHeader = (token: string) => {
  walletAuthInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  walletAuthInstance.defaults.headers.common.Authorization = "";
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: UserCredentials, thunkAPI) => {
    try {
      const response = await walletAuthInstance.post("/auth/sign-up", user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (user: Omit<UserCredentials, "username">, thunkAPI) => {
    try {
      const response = await walletAuthInstance.post("/auth/sign-in", user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await walletAuthInstance.delete("/auth/sign-out");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);

      const response = await walletAuthInstance.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);
