import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import ReactApexChart from "react-apexcharts";
import { Typography } from "@mui/material";
import { BorderStyledPaper } from "../../common/BorderStyledPaper";
interface ICrimeBarChartProps {
  crimes: ICrimeReport[];
}
export const generateBrightRandomColor = (): any => {
  const minBrightness = 70;
  const maxBrightness = 255;
  const minSaturation = 50;
  const maxSaturation = 100;
  const maxLuminance = 0.75;
  let h = Math.floor(Math.random() * 360);
  let s = Math.floor(
    Math.random() * (maxSaturation - minSaturation + 1) + minSaturation
  );
  let b = Math.floor(
    Math.random() * (maxBrightness - minBrightness + 1) + minBrightness
  );
  const c = (1 - Math.abs(2 * (b / 255) - 1)) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = b / 255 - c / 2;
  let r: number, g: number, bl: number;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    bl = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    bl = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    bl = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    bl = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    bl = c;
  } else {
    r = c;
    g = 0;
    bl = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  bl = Math.round((bl + m) * 255);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * bl) / 255;
  if (luminance < 0.4 || (r === g && g === bl) || luminance > maxLuminance) {
    return generateBrightRandomColor();
  }
  const hex = ((r << 16) | (g << 8) | bl).toString(16);

  return "#" + hex.padStart(6, "0");
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
    <BorderStyledPaper sx={{ padding: 1 }}>
      <Typography variant="subtitle2" fontSize={25}>
        Recent crime reports
      </Typography>
      <ReactApexChart
        options={options}
        series={Object.values(categories)}
        type="pie"
        height={700}
      />
    </BorderStyledPaper>
  );
};
