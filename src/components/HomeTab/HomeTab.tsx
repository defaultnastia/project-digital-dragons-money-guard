import { useEffect, useState } from "react";
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
import CustomModal from "../CustomModal/CustomModal";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const HomeTab = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectLoadingState);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const transactionsSorted = Object.freeze(transactions)
    .slice()
    .sort(
      (a, b) => Date.parse(a.transactionDate) - Date.parse(b.transactionDate)
    );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(2);
  };

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <>
      {transactionsSorted.length === 0 && !loading ? (
        <p className="text-center mx-[20px]">
          There are no transactions yet. <br /> To add the first one, click on
          the + button below.
        </p>
      ) : (
        <TransactionsList transactions={transactionsSorted} />
      )}

      <button
        className={clsx(
          s.btnAddTransaction,
          "bg-gradient-to-r from-[#ffc727] from-0% via-[#9e40ba] via-61% to-[#7000ff] to-91%"
        )}
        onClick={openModal}
      >
        <svg width="20px" height="20px" stroke="var(--white-color)">
          <use href={`${icon}#icon-plus`} />
        </svg>
      </button>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal} type="transaction">
        <AddTransactionForm closeModal={closeModal} />
      </CustomModal>
    </>
  );
};

export default HomeTab;
