import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Active", "At Risk", "Completed"],
    datasets: [
      {
        data: [84, 12, 32],
        backgroundColor: ["#2d6a4f", "#ba1a1a", "#74c69d"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
