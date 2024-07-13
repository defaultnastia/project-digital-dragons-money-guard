import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const Chart = () => {
  const data = {
    labels: [
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [8700.0, 3800.74, 1500.0, 800.0, 2208.5, 300.0, 3400.0, 1230.0, 610.0],
        backgroundColor: [
          "#FED057",
          "#FFD8D0",
          "#FD9498",
          "#C5BAFF",
          "#6E78E8",
          "#4A56E2",
          "#81E1FF",
          "#24CCA7",
          "#00AD84",
        ],
        borderColor: [
          "#FED057",
          "#FFD8D0",
          "#FD9498",
          "#C5BAFF",
          "#6E78E8",
          "#4A56E2",
          "#81E1FF",
          "#24CCA7",
          "#00AD84",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default Chart;
