import { Grid } from "@mui/material";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { generateBrightRandomColor } from "./CrimeBarChart";
import ReactApexChart from "react-apexcharts";
import { ErrorComp } from "../../common/Error";
interface IStopSearchChartProps {
  searches: IPersonSearch[][];
  categoryFilter:
    | "all"
    | "age"
    | "race"
    | "law"
    | "gender"
    | "outcome"
    | "officerEthnicity"
    | "type"
    | "operationName"
    | "objectOfSearch";
}
abstract class PersonSearchUtils {
  public static FindUniqueRace(personSearchData: IPersonSearch[]): string[] {
    const uniqueRace: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueRace.includes(person.self_defined_ethnicity)) {
        uniqueRace.push(person.self_defined_ethnicity);
      }
    });

    return uniqueRace.filter((x) => Boolean(x));
  }

  public static FindUniqueOutcome(personSearchData: IPersonSearch[]): string[] {
    const uniqueOutcome: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueOutcome.includes(person.outcome)) {
        uniqueOutcome.push(person.outcome);
      }
    });

    return uniqueOutcome.filter((x) => Boolean(x));
  }

  public static FindUniqueOfficerEthnicity(
    personSearchData: IPersonSearch[]
  ): string[] {
    const uniqueEthnicities: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueEthnicities.includes(person.officer_defined_ethnicity)) {
        uniqueEthnicities.push(person.officer_defined_ethnicity);
      }
    });

    return uniqueEthnicities.filter((x) => Boolean(x));
  }

  public static FindUniqueType(personSearchData: IPersonSearch[]): string[] {
    const uniqueTypes: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueTypes.includes(person.type)) {
        uniqueTypes.push(person.type);
      }
    });

    return uniqueTypes.filter((x) => Boolean(x));
  }

  public static FindUniqueOperationName(
    personSearchData: IPersonSearch[]
  ): string[] {
    const uniqueOperationNames: string[] = [];

    personSearchData.forEach((person) => {
      if (
        person.operation_name &&
        !uniqueOperationNames.includes(person.operation_name) &&
        person.operation_name !== null
      ) {
        uniqueOperationNames.push(person.operation_name);
      }
    });

    return uniqueOperationNames.filter((x) => Boolean(x));
  }

  public static FindUniqueObjectOfSearch(
    personSearchData: IPersonSearch[]
  ): string[] {
    const uniqueObjectsOfSearch: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueObjectsOfSearch.includes(person.object_of_search)) {
        uniqueObjectsOfSearch.push(person.object_of_search);
      }
    });

    return uniqueObjectsOfSearch.filter((x) => Boolean(x));
  }

  public static FindUniqueAgeRanges(
    personSearchData: IPersonSearch[]
  ): string[] {
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
  }

  public static FindUniqueGenders(personSearchData: IPersonSearch[]): string[] {
    const uniqueGenders: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueGenders.includes(person.gender)) {
        uniqueGenders.push(person.gender);
      }
    });

    return uniqueGenders.filter((x) => Boolean(x));
  }

  public static FindUniqueLegislations(
    personSearchData: IPersonSearch[]
  ): string[] {
    const uniqueLegislations: string[] = [];

    personSearchData.forEach((person) => {
      if (!uniqueLegislations.includes(person.legislation)) {
        uniqueLegislations.push(person.legislation);
      }
    });

    return uniqueLegislations.filter((x) => Boolean(x));
  }
}

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
      uniqueCat = PersonSearchUtils.FindUniqueAgeRanges(flatSearch);
      break;
    case "gender":
      propertyName = "gender";
      uniqueCat = PersonSearchUtils.FindUniqueGenders(flatSearch);
      break;
    case "race":
      propertyName = "self_defined_ethnicity";
      uniqueCat = PersonSearchUtils.FindUniqueRace(flatSearch);
      break;
    case "law":
      propertyName = "legislation";
      uniqueCat = PersonSearchUtils.FindUniqueLegislations(flatSearch);
      break;
    case "outcome":
      propertyName = "outcome";
      uniqueCat = PersonSearchUtils.FindUniqueOutcome(flatSearch);
      break;
    case "officerEthnicity":
      propertyName = "officer_defined_ethnicity";
      uniqueCat = PersonSearchUtils.FindUniqueOfficerEthnicity(flatSearch);
      break;
    case "type":
      propertyName = "type";
      uniqueCat = PersonSearchUtils.FindUniqueType(flatSearch);
      break;
    case "objectOfSearch":
      propertyName = "object_of_search";
      uniqueCat = PersonSearchUtils.FindUniqueObjectOfSearch(flatSearch);
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
