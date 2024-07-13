import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: {
    username: string;
    email: string;
    id: string;
    balance: number;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  user: {
    username: "",
    email: "",
    id: "",
    balance: 0,
  },
  token: null,
  loading: false,
  error: null,
};

const walletAuthInstance = axios.create({
  baseURL: "https://wallet.b.goit.study/api/auth",
});

const setAuthHeader = (token: string) => {
  walletAuthInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// const clearAuthHeader = () => {
//   walletAuthInstance.defaults.headers.common.Authorization = "";
// };

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: UserCredentials, thunkAPI) => {
    try {
      const response = await walletAuthInstance.post("/sign-up", user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
