import {nanoid} from "@reduxjs/toolkit";
import {colorsStatistics} from "../../helpers/statistics/colors";
import FormattedBalance from "../FormattedBalance/FormattedBalance";

interface TableProps {
  dataTransaction?: Statistics | null;
}

const StatisticsTable = ({dataTransaction}: TableProps) => {
  if (!dataTransaction || !dataTransaction.categoriesSummary) {
    return null;
  }

  const categoriesSummary = dataTransaction.categoriesSummary.map((category, index) => ({
    ...category,
    id: nanoid(),
    color: colorsStatistics[index % colorsStatistics.length],
  }));

  const expenseSum =
    dataTransaction.expenseSummary !== undefined ? -dataTransaction.expenseSummary : 0;
  const incomeSum = dataTransaction.incomeSummary;
  return (
    <div>
      {categoriesSummary.length !== 0 && (
        <div className="min-[1280px]:w-[395px]">
          <div className="flex justify-between p-4 bg-[rgba(82,59,126,0.60)] rounded-lg mb-[14px] ">
            <p>Category</p>
            <p>Sum</p>
          </div>

          <ul className="mb-4 text-[0.875rem]">
            {categoriesSummary.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-[12.4px] px-4 border-b border-[rgba(255,255,255,0.41)]"
              >
                <span className="flex gap-4">
                  <span
                    className="rounded-sm block w-6 h-6"
                    style={{backgroundColor: item.color}}
                  ></span>
                  <p>{item.name}</p>
                </span>
                <span>
                  <FormattedBalance balance={item.type === "INCOME" ? item.total : -item.total} />
                </span>
              </li>
            ))}
          </ul>
          <ul className="px-4 text-[0.875rem] font-semibold flex flex-col gap-[19px]">
            <li className="flex justify-between">
              <p>Expenses:</p>
              <span style={{color: "var(--dashboard-text-color)"}}>
                <FormattedBalance balance={expenseSum} />
              </span>
            </li>
            <li className="flex justify-between pb-[20px]">
              <p>Income:</p>
              <span style={{color: "var(--yellow-color)"}}>
                <FormattedBalance balance={incomeSum} />
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;
