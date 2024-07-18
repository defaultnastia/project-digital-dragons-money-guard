import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectStatistics} from "../../redux/transactions/selectors";
import {selectUserData} from "../../redux/user/selectors";
import {getBalance} from "../../redux/user/operations";

import Chart from "../Chart/Chart";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";
import NotificationStatistic from "../NotificationStatistic/NotificationStatistic";
import {getTransactionsSummary} from "../../redux/transactions/operations";

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

  const cs = statistics?.categoriesSummary.filter((item) => item.type !== "INCOME");

  const filteredStatistic = {
    ...statistics,
    categoriesSummary: cs,
  };

  return (
    <div>
      <h2 className="text-[1.875rem] mb-5 min-[1280px]:ml-[15px] max-[1279px]:hidden">
        Statistics
      </h2>
      <div className="min-[768px]:flex justify-between">
        <div>
          <h2 className="text-[1.875rem] mb-2 min-[768px]:mb-5 min-[1280px]:hidden ">Statistics</h2>
          <Chart dataTransaction={filteredStatistic} balance={balance} />
          {cs?.length === 0 && (
            <NotificationStatistic text="No transactions for the selected date" />
          )}
        </div>
        <div className="w-full min-[768px]:mt-[25px] min-[1280px]:mt-0 min-[768px]:w-[336px]">
          <StatisticsDashboard onFilterChange={handleFilterChange} />
          <StatisticsTable dataTransaction={filteredStatistic} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
