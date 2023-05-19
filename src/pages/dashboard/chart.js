import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Chart(props) {
  console.log(props.colorRGB);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: `${props.barTitle}`,
      },
    },
    scales: {
        y: {
          grid: {
            drawBorder: false, // <-- this removes y-axis line
            lineWidth: function (context) {
              return context?.index === 0 ? 0 : 1; // <-- this removes the base line
            }
          }
        },
        x: {
          grid: {
            drawBorder: false,
            lineWidth: 0 // <-- this removes vertical lines between bars
          }
        }
      },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "April",
    "May",
    "June",
    "July",
    "July",
    
  ];

  const data = {
    labels,
    datasets: [
      {
        label: null,
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: `rgba(${props.colorRGB})`,
        borderWidth: 1,
        borderRadius: 5,
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => 100),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default Chart;
