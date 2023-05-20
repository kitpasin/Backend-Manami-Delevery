import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";

const Chart = ({ colorRGB, barTitle, mountChecked, refreshData, setRefreshData, orderDash }) => {
  useEffect(() => {
    console.log(orderDash)
    if (orderDash.length == 0) {
      setRefreshData(refreshData + 1)
    }
  }, [mountChecked]);

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
        text: `${barTitle}`,
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false, // <-- this removes y-axis line
          lineWidth: function (context) {
            return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          lineWidth: 0, // <-- this removes vertical lines between bars
        },
      },
    },
  };

  const labels = mountChecked
    ? [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
    : [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ];

  const data = {
    labels,
    datasets: [
      {
        label: null,
        data: labels.map((item, index) => {
          return Math.floor(Math.random() * 100)
        }),
        backgroundColor: `rgba(${colorRGB})`,
        borderWidth: 1,
        borderRadius: 5,
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => Math.floor(Math.random() * 100)),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
