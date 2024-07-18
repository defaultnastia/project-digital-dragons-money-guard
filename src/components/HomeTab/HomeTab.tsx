import { useEffect, useState } from "react";
import clsx from "clsx";

import TransactionsList from "../TransactionsList/TransactionsList";
import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import CustomModal from "../CustomModal/CustomModal";

import { selectTransactions } from "../../redux/transactions/selectors";
import { getAllTransactions } from "../../redux/transactions/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectLoadingState } from "../../redux/user/selectors";
import { Transaction } from "../../redux/data.types";

import icon from "../../img/icons.svg";
import s from "./HomeTab.module.css";
import Balance from "../Balance/Balance";
import { useMediaQuery } from "react-responsive";

const HomeTab = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const loading = useAppSelector(selectLoadingState);
  const [editTransaction, setEditTransaction] = useState<Transaction>();
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const transactionsSorted = Object.freeze(transactions)
    .slice()
    .sort(
      (a, b) => Date.parse(b.transactionDate) - Date.parse(a.transactionDate)
    );

  const openAddTransactionModal = () => {
    setModalAddIsOpen(true);
  };

  const closeAddTransactionModal = () => {
    setModalAddIsOpen(false);
  };

  const closeEditTransactionModal = () => {
    setModalEditIsOpen(false);
  };

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  return (
    <div className={s.homepageWrapper}>
      {transactionsSorted.length === 0 && !loading ? (
        <p className="text-center mx-[20px]">
          There are no transactions yet. <br /> To add the first one, click on
          the + button below.
        </p>
      ) : (
        <>
          {isMobile && (
            <div className={s.balanceWrapper}>
              <Balance />
            </div>
          )}

          <TransactionsList
            transactions={transactionsSorted}
            setEditTransaction={setEditTransaction}
            setModalEditIsOpen={setModalEditIsOpen}
          />
        </>
      )}

      <button
        className={clsx(s.btnAddTransaction)}
        onClick={openAddTransactionModal}
      >
        <svg width="20px" height="20px" stroke="var(--white-color)">
          <use href={`${icon}#icon-plus`} />
        </svg>
      </button>

      <CustomModal
        isOpen={modalAddIsOpen}
        onClose={closeAddTransactionModal}
        type="transaction"
      >
        <AddTransactionForm closeModal={closeAddTransactionModal} />
      </CustomModal>

      <CustomModal
        isOpen={modalEditIsOpen}
        onClose={closeEditTransactionModal}
        type="transaction"
      >
        <EditTransactionForm
          closeModal={closeEditTransactionModal}
          userTransaction={editTransaction as Transaction}
        />
      </CustomModal>
    </div>
  );
};

export default HomeTab;
