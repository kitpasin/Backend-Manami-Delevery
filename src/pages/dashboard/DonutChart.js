import React from "react";
import Chart from "react-apexcharts";

function DonutChart({ data, labelTitles }) {
  const colors = ["#0300AB", "#169CE7", "#FF9029", "#0fb900", "#E32900", "#FF599F"];
  console.log(data)
  return (
    <React.Fragment>
      <Chart
        type="donut"
        width={370}
        height={370}
        series={data}
        options={{
          colors: colors,
          chart: {
            // width: "100%"
          },
          labels: labelTitles,

          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: false,
                    showAlways: false,
                  },
                },
              },
              expandOnClick: true,
              size: 299,
            },
          },
          responsive: [
            {
              breakpoint: 1670,
              options: {
                chart: {
                  width: 250,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          dataLabels: {
            enabled: false,
          },
        }}
      />
    </React.Fragment>
  );
}

export default DonutChart;
