import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import ReactApexChart from "react-apexcharts";
import { Paper, useTheme } from "@mui/material";
interface ICrimeBarChartProps {
  crimes: ICrimeReport[];
}
export const CrimeBarChart: React.FC<ICrimeBarChartProps> = ({ crimes }) => {
  const theme = useTheme();
  const categories = crimes.map((crime) => crime.category);
  const categoryCounts: Record<string, number> = {};
  categories.forEach((category) => {
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  const series = [
    {
      name: "Crime count",
      data: Object.values(categoryCounts),
      color: theme.palette.primary.main,
    },
  ];
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 600,
    },
    xaxis: {
      categories: Object.keys(categoryCounts),
      labels: {
        style: {
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
        },
      },
      title: {
        text: "Number of crimes",
        style: {
          fontSize: "20px",
        },
      },
    },
  };
  return (
    <Paper sx={{ padding: 1, height: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="96%"
      />
    </Paper>
  );
};
