import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserCredentials } from "../data.types";
import { RootState } from "../store";
import {
  clearAuthHeader,
  setAuthHeader,
  walletInstance,
} from "../../services/axiosInstance";
import toast from "react-hot-toast";
import {
  successAuthSound,
  errorAuthSound,
  logoutSound,
} from "../../sounds/playback";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (user: UserCredentials, thunkAPI) => {
    try {
      const response = await walletInstance.post("/auth/sign-up", user);
      setAuthHeader(response.data.token);
      successAuthSound.play();
      return response.data;
    } catch (error) {
      errorAuthSound.play();
      toast.error("Couldn't signup user, please check the credentials");
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (user: Omit<UserCredentials, "username">, thunkAPI) => {
    try {
      const response = await walletInstance.post("/auth/sign-in", user);
      setAuthHeader(response.data.token);
      successAuthSound.play();
      return response.data;
    } catch (error) {
      errorAuthSound.play();
      toast.error(
        "Couldn't sign in as this user, please check the credentials!"
      );
      return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
    }
  }
);

export const signOut = createAsyncThunk("user/signOut", async (_, thunkAPI) => {
  try {
    await walletInstance.delete("/auth/sign-out");
    logoutSound.play();
  } catch (error) {
    errorAuthSound.play();
    return thunkAPI.rejectWithValue((error as AxiosError).response?.status);
  } finally {
    clearAuthHeader();
  }
});

export const refreshUser = createAsyncThunk(
  "user/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const persistedToken = state.user.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);

      const response = await walletInstance.get("/users/current");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getBalance = createAsyncThunk(
  "auth/getBalance",
  async (_, thunkAPI) => {
    try {
      const response = await walletInstance.get("/users/current");
      return response.data.balance;
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Couldn't update balance, try again");
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
