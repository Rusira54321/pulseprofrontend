import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const MonthlyAttendanceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const key = localStorage.getItem("gymkey")
      const response = await axios.post(`http://localhost:5000/Attendance/getmonthlyattendance`,{
        "key":key
      });
      setChartData({
        labels: response.data.labels,
        datasets: response.data.datasets
      });
    };
    fetchData();
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto" }}>
      <div className="flex justify-center">
      <h2 className="text-xl mb-4 text-white">Monthly Attendance Report</h2>
      </div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Monthly attendance`
            },
            legend: {
              position: "top"
            }
          },
        }}
      />
    </div>
  );
};

export default MonthlyAttendanceChart;
