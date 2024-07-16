import { useEffect } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import {
  selectCategories,
  selectTransactions,
} from "../../redux/transactions/selectors";
import {
  deleteTransaction,
  getAllTransactions,
  getTransactionsCategories,
  updateTransaction,
} from "../../redux/transactions/operations";
import { Category, PatchData, Transaction } from "../../redux/data.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import icon from "../../images/icons.svg";
import s from "./TransactionsTab.module.css";

const TransactionsTab = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const transactionsSorted = Object.freeze(transactions)
    .slice()
    .sort(
      (a, b) => Date.parse(a.transactionDate) - Date.parse(b.transactionDate)
    );

  const getTransactionCategory = (id: string): Category | undefined => {
    const category: Category | undefined = categories.find(
      (category) => category.id === id
    );

    return category;
  };

  const onUpdateTransaction = (obj: Transaction): undefined => {
    console.log(obj);

    // const transactionToUpdate: PatchData = {
    //   transId: obj.id,
    //   updTransaction: {
    //     transactionDate: "2023-09-09",
    //     type: "EXPENSE",
    //     categoryId: "27eb4b75-9a42-4991-a802-4aefe21ac3ce",
    //     comment: "Milk & Butter",
    //     amount: -30,
    //   },
    // };

    // dispatch(updateTransaction(transactionToUpdate))
    //   .unwrap()
    //   .then((data: any) => {
    //     console.log(data);
    //     dispatch(getAllTransactions());
    //   });
  };

  const onDeleteTransaction = (id: string): void => {
    dispatch(deleteTransaction(id))
      .unwrap()
      .then(() => {
        console.log("Transaction has been deleted");
        dispatch(getAllTransactions());
      });
  };

  useEffect(() => {
    dispatch(getAllTransactions());
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return !isMobile ? (
    <>
      <h1 className="m-[20px] text-center text-[30px]">
        Transactions desktop tab
      </h1>

      {transactionsSorted.length && (
        <div className={s.wrapper}>
          <div className={clsx(s.headerTable, s.row)}>
            <div className={clsx(s.cell, s.cellDate)}>Date</div>
            <div className={clsx(s.cell, s.cellType)}>Type</div>
            <div className={clsx(s.cell, s.cellCategory)}>Category</div>
            <div className={clsx(s.cell, s.cellComment)}>Comment</div>
            <div className={clsx(s.cell, s.cellSum)}>Sum</div>
            <div className={clsx(s.cell, s.cellBtn)}></div>
          </div>
          {transactionsSorted?.map((transaction) => (
            <div key={transaction.id} className={clsx(s.row, s.rowBody)}>
              <div className={clsx(s.cell, s.cellDate)}>
                {transaction.transactionDate
                  .replaceAll("-", ".")
                  .split(".")
                  .reverse()
                  .join(".")}
              </div>
              <div className={clsx(s.cell, s.cellType)}>
                {transaction.type === "INCOME" ? "+" : "-"}
              </div>
              <div className={clsx(s.cell, s.cellCategory)}>
                {getTransactionCategory(transaction.categoryId)?.name}
              </div>
              <div className={clsx(s.cell, s.cellComment)}>
                {transaction.comment}
              </div>
              <div
                className={clsx(
                  s.cell,
                  s.cellSum,
                  transaction.type === "INCOME" ? s.incomeType : s.expenseType
                )}
              >
                {transaction.amount}
              </div>
              <div className={clsx(s.cell, s.cellBtn, "flex gap-[4px]")}>
                <button
                  className={s.btnEdit}
                  onClick={() => onUpdateTransaction(transaction)}
                >
                  <svg width="14px" height="14px">
                    <use href={`${icon}#icon-edit`} />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className={clsx(
                    s.btnDelete,
                    "bg-gradient-to-r from-[#ffc727] from-0% via-[#9e40ba] via-61% to-[#7000ff] to-90%"
                  )}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <h1 className="m-[20px] text-center text-[30px]">
      There will be a mobile version of transactions
    </h1>
  );
};

export default TransactionsTab;
