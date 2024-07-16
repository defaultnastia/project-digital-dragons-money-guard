import { useEffect } from "react";
import clsx from "clsx";

import TransactionsList from "../TransactionsList/TransactionsList";

import { selectTransactions } from "../../redux/transactions/selectors";
import {
  getAllTransactions,
  getTransactionsCategories,
} from "../../redux/transactions/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import icon from "../../img/icons.svg";
import s from "./HomeTab.module.css";
import { selectLoadingState } from "../../redux/user/selectors";

const HomeTab = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectLoadingState);

  const transactionsSorted = Object.freeze(transactions)
    .slice()
    .sort(
      (a, b) => Date.parse(a.transactionDate) - Date.parse(b.transactionDate)
    );

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <>
      {transactionsSorted.length > 0 && !loading ? (
        <TransactionsList transactions={transactionsSorted} />
      ) : (
        <p className="text-center mx-[20px]">
          There are no transactions yet. <br /> To add the first one, click on
          the + button below.
        </p>
      )}

      <button
        className={clsx(
          s.btnAddTransaction,
          "bg-gradient-to-r from-[#ffc727] from-0% via-[#9e40ba] via-61% to-[#7000ff] to-91%"
        )}
      >
        <svg width="20px" height="20px" stroke="white">
          <use href={`${icon}#icon_plus`} />
        </svg>
      </button>
    </>
  );
};

export default HomeTab;
