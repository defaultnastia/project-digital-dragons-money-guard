import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectStatistics} from "../../redux/transactions/selectors";
import Chart from "../Chart/Chart";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import {getTransactionsSummary} from "../../redux/transactions/operations";
import {selectUserData} from "../../redux/user/selectors";
import {getBalance} from "../../redux/user/operations";

const StatisticsTab = () => {
  const dispatch = useAppDispatch();
  const statistics = useAppSelector(selectStatistics);
  const userData = useAppSelector(selectUserData);
  const balance = userData?.balance;

  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    dispatch(getTransactionsSummary(filter));
    dispatch(getBalance());
  }, [filter, dispatch]);

  const handleFilterChange = (newFilter: ParametersMonthYear) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h2 className="text-[1.875rem] mb-5 min-[1280px]:ml-[15px] max-[1279px]:hidden">
        Statistics
      </h2>
      <div className="min-[768px]:flex gap-8">
        <div>
          <h2 className="text-[1.875rem] mb-2 min-[768px]:mb-5 min-[1280px]:hidden ">Statistics</h2>
          <Chart dataTransaction={statistics} balance={balance} />
        </div>
        <div className="w-full min-[768px]:mt-[25px] min-[1280px]:mt-0">
          <StatisticsDashboard onFilterChange={handleFilterChange} />
          <StatisticsTable dataTransaction={statistics} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
