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
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HeroChart = ({ earning = [] }) => {
  const navigate = useNavigate()
  const labels = earning.map((item) => {
    const date = new Date(item.date)

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  })

  const data = earning.map((item) => item.earning)
  const today = new Date().toISOString().split("T")[0]

  const todayEarning =
    earning.find((item) => item.date === today)?.earning || 0

  return (
    <div className="w-full h-fit min-w-0 bg-gray-100 rounded-xl p-3 sm:p-4 md:p-5">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base sm:text-lg font-semibold">
          Earnings Overview
        </h2>
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

              tooltip: {
                callbacks: {
                  label: (context) => {
                    return ` ₹${context.raw}`;
                  },
                },
              },
            },

            scales: {
              x: {
                ticks: {
                  maxRotation: 0,
                  autoSkip: false,
                },
              },

              y: {
                beginAtZero: true,

                ticks: {
                  callback: (value) => `₹${value}`,
                },
              },
            },
          }}

          data={{
            labels,

            datasets: [
              {
                label: "Earning",
                data,

                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.1)",

                tension: 0.4,
                fill: true,

                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          }}
        />
      </div>
         <p className="text-sm w-fit bg-green-100 border-2 text-green-700 px-3 p-1 my-3 rounded-full font-semibold">
          Today: ₹{todayEarning}
        </p>
        <p 
        onClick={() => navigate("/earning")}
        className="text-blue-600 cursor-pointer ">View Full Earning details...</p>

    </div>
  );
};

export default HeroChart;