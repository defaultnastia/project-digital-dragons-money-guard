import axios, { AxiosInstance, AxiosResponse } from "axios";

const monobankApi: AxiosInstance = axios.create({
  baseURL: "https://api.monobank.ua",
});

export interface CurrencyRate {
  currencyCodeA: number;
  currencyCodeB: number;
  rateBuy: number;
  rateSell: number;
  date?: number;
}

const STORAGE_KEY = "currencyRates";

const getCurrentTime = (): number => new Date().getTime();

const saveToLocalStorage = (data: CurrencyRate[]): void => {
  const currentTime = getCurrentTime();
  const dataToStore = { rates: data, timestamp: currentTime };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
};

const getFromLocalStorage = (): CurrencyRate[] | null => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    const { rates, timestamp } = JSON.parse(storedData);
    const currentTime = getCurrentTime();
    if (currentTime - timestamp < 3600000) {
      return rates;
    }
  }
  return null;
};

export const getCurrencyRates = async (): Promise<CurrencyRate[] | null> => {
  const cachedRates = getFromLocalStorage();
  if (cachedRates) {
    return cachedRates;
  }
  try {
    const response: AxiosResponse<CurrencyRate[]> = await monobankApi.get(
      "/bank/currency"
    );
    const currencyRates = response.data;
    saveToLocalStorage(currencyRates);
    return currencyRates;
  } catch (err) {
    return null;
  }
};
