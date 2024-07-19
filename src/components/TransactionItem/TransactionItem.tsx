import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";
import clsx from "clsx";

import Logo from "../Logo/Logo";
import CustomModal from "../CustomModal/CustomModal";
import { CustomButton } from "../CustomButton/CustomButton";
import FormattedBalance from "../FormattedBalance/FormattedBalance";

import { Transaction } from "../../redux/data.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCategories } from "../../redux/transactions/selectors";
import {
  deleteTransaction,
  getAllTransactions,
} from "../../redux/transactions/operations";
import { getBalance } from "../../redux/user/operations";

import icon from "../../img/icons.svg";
import s from "./TransactionItem.module.css";
import { getTransactionCategory } from "../../helpers/getTransactionCategory";

type Props = {
  transaction: Transaction;
  scrollable?: boolean;
  setEditTransaction: (data: Transaction) => void;
  setModalEditIsOpen: (data: boolean) => void;
};

const TransactionItem = ({
  transaction,
  scrollable,
  setEditTransaction,
  setModalEditIsOpen,
}: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onUpdateTransaction = (obj: Transaction): undefined => {
    setEditTransaction(obj);
    setModalEditIsOpen(true);
  };

  const closeDeleteModal = () => {
    setConfirmDelete(false);
  };

  const onDeleteTransaction = (id: string): void => {
    dispatch(deleteTransaction(id))
      .unwrap()
      .then(() => {
        toast.success("Transaction was successfully deleted");
        dispatch(getAllTransactions());
        dispatch(getBalance());
      });
  };

  return !isMobile ? (
    <>
      <div className={clsx(s.row, s.rowBody, scrollable && s.scrollable)}>
        <div className={clsx(s.cell, s.cellDate)}>
          {transaction.transactionDate
            .slice(2)
            .replaceAll("-", ".")
            .split(".")
            .reverse()
            .join(".")}
        </div>
        <div className={clsx(s.cell, s.cellType)}>
          {transaction.type === "INCOME" ? "+" : "-"}
        </div>
        <div className={clsx(s.cell, s.cellCategory)}>
          {getTransactionCategory(categories, transaction.categoryId)?.name}
        </div>
        <div className={clsx(s.cell, s.cellComment)}>{transaction.comment}</div>
        <div
          className={clsx(
            s.cell,
            s.cellSum,
            transaction.type === "INCOME" ? s.incomeType : s.expenseType
          )}
        >
          <FormattedBalance balance={Math.abs(transaction.amount)} />
        </div>
        <div className={clsx(s.cell, s.cellBtn, "flex gap-[4px]")}>
          <button
            className={s.btnEdit}
            onClick={() => onUpdateTransaction(transaction)}
          >
            <svg
              width="14px"
              height="14px"
              stroke="var(--white-60-color)"
              fill="transparent"
            >
              <use href={`${icon}#icon-edit`} />
            </svg>
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className={clsx(
              s.btnDelete,
              "bg-gradient-to-r from-[#ffc727] from-0% via-[#9e40ba] via-61% to-[#7000ff] to-91%"
            )}
          >
            Delete
          </button>
        </div>
      </div>

      <CustomModal
        isOpen={confirmDelete}
        onClose={closeDeleteModal}
        type="auth"
      >
        <Logo sizeLogo={36} sizeText={26} icon="logo" className="text-[26px]" />
        <h2 className="mx-auto mt-[52px] mb-[52px] text-[18px] w-[300px] text-center">
          Are you sure you want to delete transaction?
        </h2>
        <button
          className={clsx(s.btnDeleteModal)}
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          Delete
        </button>
        <CustomButton
          elementLike={{ btnType: "button", onClick: closeDeleteModal }}
          btnStyle="mono"
        >
          Cancel
        </CustomButton>
      </CustomModal>
    </>
  ) : (
    <>
      <div
        key={transaction.id}
        className={clsx(
          s.mobileTransaction,
          transaction.type === "INCOME"
            ? s.incomeTypeTransaction
            : s.expenseTypeTransaction
        )}
      >
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>Date</span>
          <span className={s.cellRight}>
            {transaction.transactionDate
              .slice(2)
              .replaceAll("-", ".")
              .split(".")
              .reverse()
              .join(".")}
          </span>
        </div>
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>Type</span>
          <span className={s.cellRight}>
            {transaction.type === "INCOME" ? "+" : "-"}
          </span>
        </div>
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>Category</span>
          <span className={s.cellRight}>
            {getTransactionCategory(categories, transaction.categoryId)?.name}
          </span>
        </div>
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>Comment</span>
          <span className={s.cellRight}>{transaction.comment}</span>
        </div>
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>Sum</span>
          <span
            className={clsx(
              s.cellRight,
              transaction.type === "INCOME" ? s.incomeType : s.expenseType,
              "font-semibold"
            )}
          >
            <FormattedBalance balance={Math.abs(transaction.amount)} />
          </span>
        </div>
        <div className={clsx(s.row)}>
          <span className={s.cellLeft}>
            <button
              onClick={() => setConfirmDelete(true)}
              className={clsx(s.btnDelete)}
            >
              Delete
            </button>
          </span>
          <span className={clsx(s.cellRight)}>
            <button
              className={s.btnEdit}
              onClick={() => onUpdateTransaction(transaction)}
            >
              <svg
                width="14px"
                height="14px"
                stroke="var(--white-60-color)"
                fill="transparent"
              >
                <use href={`${icon}#icon-edit`} />
              </svg>
              <span>Edit</span>
            </button>
          </span>
        </div>
      </div>

      <CustomModal
        isOpen={confirmDelete}
        onClose={closeDeleteModal}
        type="auth"
      >
        <h2 className="mx-auto mb-[40px] text-[18px] w-[300px] text-center">
          Are you sure you want to delete transaction?
        </h2>
        <button
          className={clsx(s.btnDeleteModal)}
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          Delete
        </button>
        <CustomButton
          elementLike={{ btnType: "button", onClick: closeDeleteModal }}
          btnStyle="mono"
        >
          Cancel
        </CustomButton>
      </CustomModal>
    </>
  );
};

export default TransactionItem;
