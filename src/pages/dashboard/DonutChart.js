import React from "react";
import Chart from "react-apexcharts";

function DonutChart() {
  return (
    <React.Fragment>
      <Chart
        type="donut"
        width={300}
        height={300}
        series={[45, 67, 89, 34, 43]}
        options={{
          chart: {
            // width: "100%"
          },
          labels: ["USA", "China", "Russia", "India", "Uk"],

          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    showAlways: false,
                  },
                },
                // size: "65%",
              },
              expandOnClick: true,
              size: 299,
              
            //   customScale: 0.8,
            },
          },

          //   responsive: [
          //     {
          //       breakpoint: 480,
          //       options: {
          //         chart: {
          //           width: 200,
          //         },
          //         legend: {
          //           position: "bottom",
          //         },
          //       },
          //     },
          //   ],

          dataLabels: {
            enabled: false,
          },
        }}
      />
    </React.Fragment>
  );
}

export default DonutChart;
