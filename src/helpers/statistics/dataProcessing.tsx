import {useEffect, useState} from "react";
import {
  transactionAll,
  transactionType,
  transactionValue,
} from "../../components/StatisticsTab/temp/http";
import {colorsStatistics} from "./colors";
import {
  getTransactionsCategories,
  getTransactionsSummary,
} from "../../redux/transactions/operations";
import {useAppDispatch} from "../../redux/hooks";

export const dataProcessing = () => {
  const [nameTransactions, setNameTransactions] = useState<Data[]>([]);
  const [value, setValue] = useState<Data[]>([]);
  const [date, setDate] = useState<Transaction[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTransactionsCategories = async () => {
      // const {payload: data} = await dispatch(getTransactionsCategories());
      const data = await transactionType();
      const itemName = [...data]
        .filter((item) => item.type !== "INCOME")
        .map((property) => {
          return {name: property.name, id: property.id};
        });
      setNameTransactions(itemName);
    };

    const fetchTransactionsSummary = async () => {
      // const {payload: data} = await dispatch(getTransactionsSummary());
      const {categoriesSummary} = await transactionValue();
      // const {categoriesSummary} = data;
      const transactions: Data[] = [...categoriesSummary]
        .filter((item) => item.type !== "INCOME")
        .map((item) => {
          return {name: item.name, total: -item.total};
        });
      setValue(transactions);
    };

    const fetchTransactions = async () => {
      // const {payload: data} = await dispatch(getTransactionsSummary());
      const data: Transaction[] = await transactionAll();
      // const {categoriesSummary} = data;
      const dates = data
        .filter((item) => item.type !== "INCOME")
        .map((item) => {
          return {id: item.id, date: item.transactionDate, categoryId: item.categoryId};
        });

      setDate(dates);
    };

    fetchTransactionsCategories();
    fetchTransactionsSummary();
    fetchTransactions();
  }, [dispatch]);

  const generalColorSchema: ColorSchema[] = nameTransactions.map((transaction, index) => {
    return {
      color: colorsStatistics[index],
      name: transaction.name,
      id: transaction.id,
    };
  });

  const dataTransaction: Data[] = value.map((transaction) => {
    const colorInfo = generalColorSchema.find((color) => color.name === transaction.name);
    const dateInfo = date.find((date) => date.categoryId === colorInfo?.id);

    return {
      ...transaction,
      color: colorInfo?.color || "",
      id: colorInfo?.id || "",
      date: dateInfo?.date || "",
    };
  });

  return {dataTransaction};
};
