import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

import TransactionItem from "../TransactionItem/TransactionItem";

import { Transaction } from "../../redux/data.types";

import s from "./TransactionsList.module.css";

type Props = {
  transactions: Transaction[];
};

const TransactionsList = ({ transactions }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isScrollable = transactions.length > 8;

  return !isMobile ? (
    <>
      <div className={clsx(s.wrapper)}>
        <div className={clsx(s.headerTable, s.row)}>
          <div className={clsx(s.cell, s.cellDate)}>Date</div>
          <div className={clsx(s.cell, s.cellType)}>Type</div>
          <div className={clsx(s.cell, s.cellCategory)}>Category</div>
          <div className={clsx(s.cell, s.cellComment)}>Comment</div>
          <div className={clsx(s.cell, s.cellSum)}>Sum</div>
          <div className={clsx(s.cell, s.cellBtn)}></div>
        </div>
        <div className={clsx(s.tableBody, isScrollable && s.scrollableWrapper)}>
          {transactions?.map((transaction: Transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              scrollable={isScrollable}
            />
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className={clsx(s.mobileWrapper)}>
      {transactions?.map((transaction: Transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionsList;
