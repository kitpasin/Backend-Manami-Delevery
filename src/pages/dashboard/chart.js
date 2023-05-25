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

import { svGetOrderBar } from "../../services/dashboard.service";

const Chart = ({
  colorRGB,
  barTitle,
  refreshData,
  setRefreshData,
  views,
  setTotalPriceWash,
  setTotalPriceFood,
  setTotalPrice,
}) => {
  const [orderBar, setOrderBar] = useState([]);
  const [orderLabel, setOrderLabel] = useState([]);

  useEffect(() => {
    let tt = 0;
    let start = dayjs().subtract(6, "day").toISOString().substring(0, 10);
    let end = dayjs().toISOString().substring(0, 10);
    if (views === "week") {
      if (barTitle === "Wash&Dry") {
        setTimeout(() => {
          svGetOrderBar(start, end, "week").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "washing"
              );
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                if (item.type_order === "washing") {
                  tt += item.total_price;
                }
              });
              const newLabel = label.filter(function (item, pos) {
                return label.indexOf(item) == pos;
              });
              setOrderBar(data);
              setOrderLabel(newLabel);
              setTotalPriceWash(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Vending&Cafe") {
        setTimeout(() => {
          svGetOrderBar(start, end, "week").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "foods"
              );
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                if (item.type_order === "foods") {
                  tt += item.total_price;
                }
              });
              const newLabel = label.filter(function (item, pos) {
                return label.indexOf(item) == pos;
              });
              setOrderBar(data);
              setOrderLabel(newLabel);
              setTotalPriceFood(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Delivery") {
        setTimeout(() => {
          svGetOrderBar(start, end, "week").then((res) => {
            if (res.status) {
              const data = res.data?.map((order) => order);
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                tt += item.delivery_price;
              });
              const newLabel = label.filter(function (item, pos) {
                return label.indexOf(item) == pos;
              });
              setOrderBar(data);
              setOrderLabel(newLabel);
              setTotalPrice(tt);
            }
          });
        }, 200);
      }
    } else if (views === "month") {
      if (barTitle === "Wash&Dry") {
        setTimeout(() => {
          svGetOrderBar(start, end, "month").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "washing"
              );
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                if (item.type_order === "washing") {
                  tt += item.total_price;
                }
              });

              setOrderBar(data);
              setTotalPriceWash(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Vending&Cafe") {
        setTimeout(() => {
          svGetOrderBar(start, end, "month").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "foods"
              );
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                if (item.type_order === "foods") {
                  tt += item.total_price;
                }
              });

              setOrderBar(data);
              setTotalPriceFood(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Delivery") {
        setTimeout(() => {
          svGetOrderBar(start, end, "month").then((res) => {
            if (res.status) {
              const data = res.data?.map((order) => order);
              const label = res.data?.map((item) => item.shipping_date);
              res.data?.map((item) => {
                tt += item.delivery_price;
              });

              setOrderBar(data);
              setTotalPrice(tt);
            }
          });
        }, 200);
      }
    } else if (views === "year") {
      if (barTitle === "Wash&Dry") {
        setTimeout(() => {
          svGetOrderBar(start, end, "year").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "washing"
              );
              res.data?.map((item) => {
                if (item.type_order === "washing") {
                  tt += item.total_price;
                }
              });

              setOrderBar(data);
              setTotalPriceWash(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Vending&Cafe") {
        setTimeout(() => {
          svGetOrderBar(start, end, "year").then((res) => {
            if (res.status) {
              const data = res.data?.filter(
                (order) => order.type_order === "foods"
              );
              res.data?.map((item) => {
                if (item.type_order === "foods") {
                  tt += item.total_price;
                }
              });

              setOrderBar(data);
              setTotalPriceFood(tt);
            }
          });
        }, 200);
      } else if (barTitle === "Delivery") {
        setTimeout(() => {
          svGetOrderBar(start, end, "year").then((res) => {
            if (res.status) {
              const data = res.data?.map((order) => order);
              res.data?.map((item) => {
                tt += item.delivery_price;
              });

              setOrderBar(data);
              setTotalPrice(tt);
            }
          });
        }, 200);
      }
    }
  }, [views, refreshData]);

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

  if (orderBar.length > 0) {
    const labels =
      views === "week"
        ? orderLabel
        : views === "month"
        ? [
            // "January",
            // "February",
            // "March",
            // "April",
            // "May",
            // "June",
            // "July",
            // "August",
            // "September",
            // "October",
            // "November",
            // "December",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
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
          ]
        : [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ];

    const data = {
      labels,
      datasets: [
        {
          label: "Total ",
          data: labels.map((item, ind) => {
            let tt = 0;
            for (let i of orderBar) {
              if (i.shipping_date === item) {
                if (barTitle === "Delivery") {
                  tt += i.delivery_price;
                } else {
                  tt += i.total_price;
                }
              }
            }
            return tt;
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
  }
};

export default Chart;
