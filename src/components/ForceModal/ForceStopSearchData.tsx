import {
  Paper,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
  const [filterOption, setFilterOption] = useState<
    "all" | "age" | "race" | "law" | "gender"
  >("all");
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
          <Grid item width="100%">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              padding={1}
              spacing={2}
            >
              <Grid item width="20%">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category Filter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category Filter"
                    value={filterOption}
                    onChange={(event) => {
                      setFilterOption(event.target.value as any);
                    }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="gender">Gender</MenuItem>
                    <MenuItem value="law">Legislation</MenuItem>
                    <MenuItem value="race">Ethnicity</MenuItem>
                    <MenuItem value="age">Age range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" fontSize={12}>
              *Last 3 months of data*
            </Typography>
          </Grid>
          <Grid item width="100%">
            <Divider />
          </Grid>
          <Grid item width="100%" minHeight="80vh">
            <StopSearchChart
              searches={stopSearchData}
              categoryFilter={filterOption}
            />
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
