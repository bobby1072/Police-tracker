import { Grid, Paper } from "@mui/material";
import IAdvancedCrimeData from "../../common/ApiTypes/IAdvancedCrimeData";
interface IAdvancedCrimeDisplayProps {
  advancedData: IAdvancedCrimeData;
}
export const AdvancedCrimeDisplay: React.FC<IAdvancedCrimeDisplayProps> = ({
  advancedData,
}) => {
  return (
    <Paper>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        padding={2}
        spacing={1}
      ></Grid>
    </Paper>
  );
};
