import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { generateBrightRandomColor } from "./CrimeBarChart";
import ReactApexChart from "react-apexcharts";
interface IStopSearchChartProps {
  searches: IPersonSearch[][];
}
const findUniqueDates = (personSearchData: IPersonSearch[]) => {
  const uniqueDates = new Set<string>();

  personSearchData.forEach((person) => {
    const date = new Date(person.datetime);
    const dateString = date.toISOString().split("T")[0];
    uniqueDates.add(dateString);
  });

  return Array.from(uniqueDates);
};
const findUniqueRaces = (personSearchData: IPersonSearch[]) => {
  const uniqueRaces = new Set();

  personSearchData.forEach((person) => {
    uniqueRaces.add(person.self_defined_ethnicity);
  });

  return Array.from(uniqueRaces);
};
export const StopSearchChart: React.FC<IStopSearchChartProps> = ({
  searches,
}) => {
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries =
    searches.map((x, index, array) => {
      const date = new Date(x[0].datetime);
      return {
        name: `${date.getMonth() + 1}/${date.getFullYear()}`,
        data: [x.length],
        color: generateBrightRandomColor(),
      };
    });
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: "Stop search data",
      height: 350,
      type: "bar",
      animations: {
        enabled: false,
      },

      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    legend: {
      fontSize: "25px",
      show: false,
      position: "bottom",
    },
    title: {
      text: "Stop search data",
      align: "center",
      style: {
        fontSize: "25px",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "center",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "30px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      categories: ["Stop searches per month"],
      labels: {
        show: false,
      },
    },
    yaxis: {
      max: searches.reduce((acc, val) => {
        if (val.length > acc) {
          return val.length;
        } else {
          return acc;
        }
      }, 0),
      labels: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
    },
  };
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};
