import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";

import {colorsStatistics} from "../../helpers/statistics/colors";
import NotificationStatistic from "../NotificationStatistic/NotificationStatistic";

ChartJS.register(ArcElement, Tooltip);

const Chart = ({dataTransaction, balance}: ChartProps) => {
  if (!dataTransaction || !dataTransaction.categoriesSummary) {
    return null;
  }

  const categoriesSummary = dataTransaction.categoriesSummary;
  const data = {
    labels: categoriesSummary.map((data) => data.name),
    datasets: [
      {
        data: categoriesSummary.map((data) => -data.total),
        backgroundColor: colorsStatistics,
        borderColor: colorsStatistics,
        borderWidth: 1,
        cutout: "70%",
      },
    ],
  };

  const shadowPlugin = {
    id: "shadowPlugin",
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      //  boxShadow: "0px 0px 8px 0px #000 inset",
      ctx.save();
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
  };

  return (
    <div className="mb-8 min-[768px]:w-[336px] min-[1280px]:w-[288px] grid place-items-center relative">
      {categoriesSummary.length !== 0 ? (
        <>
          <Doughnut data={data} plugins={[shadowPlugin]} />
          <p className="text-[1.125rem] font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            &#8372; {balance}
          </p>
        </>
      ) : (
        <NotificationStatistic text="No transactions for the selected date" />
      )}
    </div>
  );
};

export default Chart;
