import {nanoid} from "@reduxjs/toolkit";
import {colorsStatistics} from "../../helpers/statistics/colors";

const StatisticsTable = ({dataTransaction}: ChartProps) => {
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
        <div>
          <div className="flex justify-between p-4 bg-[rgba(82,59,126,0.60)] rounded-lg mb-[14px]">
            <p>Category</p>
            <p>Sum</p>
          </div>

          <ul className="mb-4 text-[0.875rem]">
            {categoriesSummary.map((item) => (
              <li
                key={item.id}
                className="flex justify-between py-[12.4px] px-4  border-b border-[rgba(255,255,255,0.41)]"
              >
                <span className="flex gap-4">
                  <span
                    className="rounded-sm block w-6 h-6"
                    style={{backgroundColor: item.color}}
                  ></span>
                  <p>{item.name}</p>
                </span>
                <p>{item.type === "INCOME" ? item.total : -item.total}</p>
              </li>
            ))}
          </ul>
          <ul className="px-4 text-[0.875rem] font-semibold flex flex-col gap-[19px]">
            <li className="flex justify-between">
              <p>Expenses:</p>
              <p style={{color: "var(--dashboard-text-color)"}}>{expenseSum}</p>
            </li>
            <li className="flex justify-between">
              <p>Income:</p>
              <p style={{color: "var(--yellow-color)"}}>{incomeSum}</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatisticsTable;
