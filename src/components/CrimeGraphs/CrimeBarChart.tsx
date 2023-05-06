import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import ReactApexChart from "react-apexcharts";
import { Paper, Typography } from "@mui/material";
interface ICrimeBarChartProps {
  crimes: ICrimeReport[];
}
const generateBrightRandomColor = (): string => {
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return "#" + hex.padStart(6, "0").toUpperCase();
};
export const CrimeBarChart: React.FC<ICrimeBarChartProps> = ({ crimes }) => {
  const categories = crimes.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  const options: ApexCharts.ApexOptions = {
    labels: Object.keys(categories),
    legend: {
      show: true,
      position: "bottom",
      fontSize: "25px",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(2)}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          `${((val / crimes.length) * 100).toFixed(2)}%`,
      },
    },
    colors: Object.entries(categories).map(() => generateBrightRandomColor()),
  };
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography variant="subtitle2" fontSize={25}>
        Recent crime reports
      </Typography>
      <ReactApexChart
        options={options}
        series={Object.values(categories)}
        type="pie"
        height={700}
      />
    </Paper>
  );
};
