import { Grid } from "@mui/material";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { ErrorComp } from "../../common/Error";
import { generateBrightRandomColor } from "./CrimeBarChart";
import ReactApexChart from "react-apexcharts";
abstract class CrimeReportUtils {
  public static findUniqueCategory(crimeReports: ICrimeReport[]): string[] {
    const uniqueCategories: string[] = [];

    crimeReports.forEach((report) => {
      if (!uniqueCategories.includes(report.category)) {
        uniqueCategories.push(report.category);
      }
    });

    return uniqueCategories.filter((x) => Boolean(x));
  }

  public static findUniqueOutcomeStatus(
    crimeReports: ICrimeReport[]
  ): string[] {
    const uniqueOutcomeStatus: string[] = [];

    crimeReports.forEach((report) => {
      if (
        report.outcome_status &&
        !uniqueOutcomeStatus.includes(report.outcome_status.category)
      ) {
        uniqueOutcomeStatus.push(report.outcome_status.category);
      }
    });

    return uniqueOutcomeStatus.filter((x) => Boolean(x));
  }
}
interface ICrimeBarProps {
  crimeReports: ICrimeReport[][];
  categoryFilt: "all" | "category" | "outcome";
}
export const CrimeBar: React.FC<ICrimeBarProps> = ({
  crimeReports,
  categoryFilt = "all",
}) => {
  if (crimeReports.length < 1) {
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
  const categories = crimeReports.map((x) => {
    const date = new Date(x[0].month);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  });
  const flatCrimes = crimeReports.flat();
  let uniqueCat: string[];
  let propertyName: string;
  switch (categoryFilt) {
    case "all":
      propertyName = "all";
      uniqueCat = ["All searches"];
      break;
    case "category":
      propertyName = "category";
      uniqueCat = CrimeReportUtils.findUniqueCategory(flatCrimes);
      break;
    case "outcome":
      propertyName = "outcome";
      uniqueCat = CrimeReportUtils.findUniqueOutcomeStatus(flatCrimes);
      break;
    default:
      propertyName = "all";
      uniqueCat = ["All searches"];
      break;
  }
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries =
    uniqueCat.map((x: string) => {
      return {
        name: x,
        data: crimeReports.map((y) =>
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
      id: "Recent crime data",
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
      text: "Recent crime data",
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
