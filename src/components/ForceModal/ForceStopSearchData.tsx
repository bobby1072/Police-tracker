import { Paper, Grid } from "@mui/material";
import { useState } from "react";
import IAllForce from "../../common/ApiTypes/IAllForces";
import { Loading } from "../../common/Loading";
import { Error } from "../../common/Error";
import { useForceStopAndSearch } from "../../utils/Querys";
import { StopSearchChart } from "../CrimeGraphs/StopSearchChart";
interface IForceStopSearchProps {
  stopSearchDates: Date[];
  force: IAllForce;
}
export const ForceStopSearchData: React.FC<IForceStopSearchProps> = ({
  stopSearchDates,
  force,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    stopSearchDates
      .sort((x, y) => x.getTime() - y.getTime())
      .filter((x, index) => index < 3)
  );
  const {
    data: stopSearchData,
    isLoading: stopSearchLoading,
    error: stopSearchError,
  } = useForceStopAndSearch(force, selectedDates);

  return (
    <Paper>
      {stopSearchData && !stopSearchLoading && !stopSearchError ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          padding={3}
          spacing={1}
        >
          <Grid item width="100%" minHeight="60vh">
            <StopSearchChart searches={stopSearchData} />
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" alignItems="center" padding={5}>
          {stopSearchLoading && !stopSearchError && (
            <Grid item>
              <Loading />
            </Grid>
          )}
          {stopSearchError && (
            <Grid item>
              <Error error={stopSearchError} />
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
};
