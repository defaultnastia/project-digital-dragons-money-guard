import {Chart as ChartJS, ArcElement, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {dataProcessing} from "../../helpers/statistics/dataProcessing";

ChartJS.register(ArcElement, Tooltip);

const Chart = () => {
  const {dataTransaction} = dataProcessing();
  const data = {
    labels: dataTransaction.map((data) => data.name),
    datasets: [
      {
        data: dataTransaction.map((data) => data.total),
        backgroundColor: dataTransaction.map((data) => data.color),
        borderColor: dataTransaction.map((data) => data.color),
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
    <div>
      <Doughnut data={data} plugins={[shadowPlugin]} />
    </div>
  );
};

export default Chart;
