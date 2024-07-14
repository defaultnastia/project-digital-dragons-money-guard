import {useEffect, useState} from "react";
import {transactionType, transactionValue} from "../../components/StatisticsTab/temp/http";
import {colorsStatistics} from "./colors";

export const dataProcessing = () => {
  const [nameTransactions, setNameTransactions] = useState<string[]>([]);
  const [value, setValue] = useState<Data[]>([]);

  useEffect(() => {
    const http = async () => {
      const data = await transactionType();
      const itemName = [...data]
        .filter((item) => item.type !== "INCOME")
        .map((property) => property.name);
      setNameTransactions(itemName);
    };

    const httpValue = async () => {
      const {categoriesSummary} = await transactionValue();
      const transactions: Data[] = [...categoriesSummary]
        .filter((item) => item.type !== "INCOME")
        .map((item) => {
          return {name: item.name, total: -item.total};
        });
      setValue(transactions);
    };

    http();
    httpValue();
  }, []);

  const generalColorSchema: ColorSchema[] = colorsStatistics.map((name, index) => {
    return {color: name, name: nameTransactions[index]};
  });

  const dataTransaction: Data[] = value.map((transaction) => {
    const colorInfo = generalColorSchema.find((color) => color.name === transaction.name);
    return {...transaction, color: colorInfo?.color || ""};
  });

  return {dataTransaction};
};
