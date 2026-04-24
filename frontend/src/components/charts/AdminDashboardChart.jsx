import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({active, atRisk, completed}) => {
  const [dashboardData, setDashboardData] = useState({});


  const data = {
    labels: ["Active", "At Risk", "Completed"],
    datasets: [
      {
        data: [
          active || 0,
          atRisk || 0,
          completed || 0
        ],
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
