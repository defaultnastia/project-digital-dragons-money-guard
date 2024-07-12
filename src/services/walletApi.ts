import axios from "axios";

const walletApi = axios.create({
  baseURL: "https://wallet.b.goit.study/",
});

export const setUserToken = (token: string): void => {
  walletApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearUserToken = (): void => {
  walletApi.defaults.headers.common.Authorization = "";
};
