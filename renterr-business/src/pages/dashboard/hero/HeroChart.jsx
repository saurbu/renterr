import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import earningData from "../../../data/earningData.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HeroChart = () => {
  return (
    <div className="w-full min-w-0 bg-gray-100 rounded-xl p-3 sm:p-4 md:p-5">
      <div className="flex justify-between items-center">
      <h2 className="text-base sm:text-lg font-semibold mb-3">
        Earnings Overview
      </h2>
      <p className="bg-green-100 px-3 py-1 border-2 border-green-600 rounded-2xl ">All Time: <span className="text-green-600 font-bold">500000</span></p>
      </div>

      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px]">
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                ticks: {
                  maxRotation: 0,
                  autoSkip: true,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
          data={{
            labels: earningData.map((d) => d.label),
            datasets: [
              {
                label: "Earning",
                data: earningData.map((d) => d.earning),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.1)",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
              },
            ],
          }}
        />
        <div className="py-3">
          <p className="text-lg">Today: 5000</p>
        </div>
      </div>
    </div>
  );
};

export default HeroChart;