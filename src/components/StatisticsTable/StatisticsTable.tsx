import {dataProcessing} from "../../helpers/statistics/dataProcessing";

const StatisticsTable = () => {
  const {dataTransaction, totalExpense, totalIncome} = dataProcessing();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {dataTransaction.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <span
                  className={`bg-[${transaction.color}] w-[24px] h-[24px] block rounded-[2px] opacity-[1]`}
                >
                  {transaction.color}
                </span>

                {/* <span className={`bg-[#00AD84] w-[24px] h-[24px] block rounded-[2px] `}></span> */}

                <p>{transaction.name}</p>
              </td>
              <td>{transaction.total}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Expenses:</td>
            <td>{-totalExpense}</td>
          </tr>
          <tr>
            <td>Income:</td>
            <td>{totalIncome}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StatisticsTable;
