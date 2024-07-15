import {dataProcessing} from "../../helpers/statistics/dataProcessing";

const StatisticsTable = () => {
  const {dataTransaction} = dataProcessing();
  console.log(dataTransaction);
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
                  className={`bg-[${transaction.color}] w-[24px] h-[24px] block rounded-[2px]`}
                ></span>
                <p>{transaction.name}</p>
              </td>
              <td>{transaction.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
