import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { generateBrightRandomColor } from "./CrimeBarChart";
import ReactApexChart from "react-apexcharts";
interface IStopSearchChartProps {
  searches: IPersonSearch[][];
}
const findUniqueRaces = (personSearchData: IPersonSearch[]): string[] => {
  const uniqueRaces: string[] = [];

  personSearchData.forEach((person) => {
    if (!uniqueRaces.includes(person.self_defined_ethnicity)) {
      uniqueRaces.push(person.self_defined_ethnicity);
    }
  });

  return uniqueRaces.filter((x) => x);
};
export const StopSearchChart: React.FC<IStopSearchChartProps> = ({
  searches,
}) => {
  const categories = searches.map((x) => {
    const date = new Date(x[0].datetime);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  });
  const uniqueRaces = findUniqueRaces(searches.flat());
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries =
    uniqueRaces.map((x: string) => {
      return {
        name: x,
        data: searches.map(
          (y) => y.filter((deepX) => deepX.self_defined_ethnicity === x).length
        ),
        color: generateBrightRandomColor(),
      };
    });
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: "Stop search data",
      height: 350,
      type: "bar",
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
    },
    legend: {
      fontSize: "12px",
      show: true,
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
      enabled: false,
      offsetY: -20,
      style: {
        fontSize: "30px",
        colors: ["#000000"],
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        style: {
          fontSize: "20px",
        },
      },
    },
    yaxis: {
      max: chartSeries.reduce((acc, val) => {
        const maxVal = Math.max(...val.data.map((x) => Number(x)));
        if (maxVal > acc) return maxVal;
        else return acc;
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
