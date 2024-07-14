import axios from "axios";

export const walletInstance = axios.create({
  baseURL: "https://wallet.b.goit.study/api",
});

export const setAuthHeader = (token: string) => {
  walletInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearAuthHeader = () => {
  walletInstance.defaults.headers.common.Authorization = "";
};
