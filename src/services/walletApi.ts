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

type Props = {
  name?: string;
  email: string;
  password: string;
};

export const login = ({ email, password }: Props) =>
  walletApi.post("/login", { email, password });
export const register = ({ name, email, password }: Props) =>
  walletApi.post("/register", { name, email, password });
export const logout = (token: string) =>
  walletApi.post(
    "/logout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
