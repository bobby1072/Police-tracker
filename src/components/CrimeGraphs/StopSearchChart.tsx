import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { Bar } from "react-chartjs-2";
import { generateBrightRandomColor } from "./CrimeBarChart";
interface IStopSearchChartProps {
  searches: IPersonSearch[];
}
export const StopSearchChart: React.FC<IStopSearchChartProps> = ({
  searches,
}) => {
  const chartData = {
    labels: [] as string[],
    datasets: [] as any[],
  };

  searches.forEach((record) => {
    const { self_defined_ethnicity, datetime } = record;
    const month = new Date(datetime).toLocaleString("default", {
      month: "long",
    });
    if (!chartData.labels.includes(month)) {
      chartData.labels.push(month);
    }
    let dataset = chartData.datasets.find(
      (d) => d.label === self_defined_ethnicity
    );
    if (!dataset) {
      dataset = {
        label: self_defined_ethnicity,
        data: [] as number[],
        backgroundColor: generateBrightRandomColor(),
      };
      chartData.datasets.push(dataset);
    }
    const monthIndex = chartData.labels.indexOf(month);
    if (dataset.data[monthIndex] === undefined) {
      dataset.data[monthIndex] = 1;
    } else {
      dataset.data[monthIndex]++;
    }
  });
  return <Bar data={chartData} />;
};
