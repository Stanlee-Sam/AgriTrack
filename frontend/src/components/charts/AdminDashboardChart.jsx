import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/admin",
        );
        setDashboardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminDashboard();
  }, []);

  const data = {
    labels: ["Active", "At Risk", "Completed"],
    datasets: [
      {
        data: [
          dashboardData.activeFields,
          dashboardData.atRiskFields,
          dashboardData.completedFields,
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
