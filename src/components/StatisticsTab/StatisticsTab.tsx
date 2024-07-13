import Chart from "../Chart/Chart";
import StatisticsDashboard from "../StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../StatisticsTable/StatisticsTable";

const StatisticsTab = () => {
  return (
    <div>
      <h2>Statistics</h2>
      <Chart />
      <StatisticsDashboard />
      <StatisticsTable />
    </div>
  );
};

export default StatisticsTab;
