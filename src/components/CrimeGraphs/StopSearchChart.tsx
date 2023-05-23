import { Grid } from "@mui/material";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { generateBrightRandomColor } from "./CrimeBarChart";
import ReactApexChart from "react-apexcharts";
import { ErrorComp } from "../../common/Error";
interface IStopSearchChartProps {
  searches: IPersonSearch[][];
  categoryFilter: "all" | "age" | "race" | "law" | "gender";
}
const findUniqueRace = (personSearchData: IPersonSearch[]): string[] => {
  const uniqueCat: string[] = [];

  personSearchData.forEach((person) => {
    if (!uniqueCat.includes(person.self_defined_ethnicity)) {
      uniqueCat.push(person.self_defined_ethnicity);
    }
  });

  return uniqueCat.filter((x) => Boolean(x));
};
const findUniqueAgeRanges = (personSearchData: IPersonSearch[]): string[] => {
  const uniqueAgeRanges: string[] = [];

  personSearchData.forEach((person) => {
    if (
      person.age_range &&
      !uniqueAgeRanges.includes(person.age_range) &&
      person.age_range !== null
    ) {
      uniqueAgeRanges.push(person.age_range);
    }
  });

  return uniqueAgeRanges.filter((x) => Boolean(x));
};
const findUniqueGenders = (personSearchData: IPersonSearch[]): string[] => {
  const uniqueGenders: string[] = [];

  personSearchData.forEach((person) => {
    if (!uniqueGenders.includes(person.gender)) {
      uniqueGenders.push(person.gender);
    }
  });

  return uniqueGenders.filter((x) => Boolean(x));
};
const findUniqueLegislations = (
  personSearchData: IPersonSearch[]
): string[] => {
  const uniqueLegislations: string[] = [];

  personSearchData.forEach((person) => {
    if (!uniqueLegislations.includes(person.legislation)) {
      uniqueLegislations.push(person.legislation);
    }
  });

  return uniqueLegislations.filter((x) => Boolean(x));
};
export const StopSearchChart: React.FC<IStopSearchChartProps> = ({
  searches,
  categoryFilter,
}) => {
  if (searches.length < 1) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={5}
      >
        <Grid item>
          <ErrorComp error={new Error("No selected dates")} />
        </Grid>
      </Grid>
    );
  }
  const categories = searches.map((x) => {
    const date = new Date(x[0].datetime);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  });
  let uniqueCat: string[];
  let propertyName: string;
  const flatSearch = searches.flat();
  switch (categoryFilter) {
    case "all":
      propertyName = "all";
      uniqueCat = ["All searches"];
      break;
    case "age":
      propertyName = "age_range";
      uniqueCat = findUniqueAgeRanges(flatSearch);
      break;
    case "gender":
      propertyName = "gender";
      uniqueCat = findUniqueGenders(flatSearch);
      break;
    case "race":
      propertyName = "self_defined_ethnicity";
      uniqueCat = findUniqueRace(flatSearch);
      break;
    case "law":
      propertyName = "legislation";
      uniqueCat = findUniqueLegislations(flatSearch);
      break;
    default:
      uniqueCat = ["all searches"];
      break;
  }
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries =
    uniqueCat.map((x: string) => {
      return {
        name: x,
        data: searches.map((y) =>
          propertyName === "all"
            ? y.length
            : y.filter(
                (deepX) =>
                  Object.entries(deepX).find(
                    ([key, val]) => key === propertyName
                  )![1] === x
              ).length
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
      fontSize: "15px",
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
