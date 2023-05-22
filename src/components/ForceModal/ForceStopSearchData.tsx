import {
  Paper,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Fragment, useEffect, useState } from "react";
import IAllForce from "../../common/ApiTypes/IAllForces";
import { Loading } from "../../common/Loading";
import { Error } from "../../common/Error";
import { useForceStopAndSearch } from "../../utils/Querys";
import { StopSearchChart } from "../CrimeGraphs/StopSearchChart";
interface IForceStopSearchProps {
  stopSearchDates: Date[];
  force: IAllForce;
}
export const fixDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month}`;
};
const getUniqueDates = (dates: Date[]): Date[] => {
  const uniqueDates: Date[] = [];

  dates.forEach((date) => {
    if (!uniqueDates.some((d) => d.getTime() === date.getTime())) {
      uniqueDates.push(date);
    }
  });

  return uniqueDates;
};
export const ForceStopSearchData: React.FC<IForceStopSearchProps> = ({
  stopSearchDates,
  force,
}) => {
  const sortedStopSearch = stopSearchDates.sort(
    (x, y) => y.getTime() - x.getTime()
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    sortedStopSearch
      .filter((x, index) => index < 3)
      .sort((x, y) => x.getTime() - y.getTime())
  );
  const {
    data: stopSearchData,
    isLoading: stopSearchLoading,
    error: stopSearchError,
    refetch: stopSearchRefetch,
  } = useForceStopAndSearch(force, selectedDates);
  const [filterOption, setFilterOption] = useState<
    "all" | "age" | "race" | "law" | "gender"
  >("all");
  useEffect(() => {
    stopSearchRefetch();
  }, [selectedDates, stopSearchRefetch]);
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
              <Grid item width="60%">
                <Paper>
                  <Autocomplete
                    clearIcon={
                      <IconButton
                        aria-hidden={false}
                        aria-label="clear search"
                        onClick={() => {
                          setSelectedDates([]);
                        }}
                        edge="end"
                        size="small"
                        sx={{
                          padding: "0 !important",
                          "& svg": {
                            fontSize: "1.5rem",
                          },
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    }
                    multiple
                    fullWidth
                    disableCloseOnSelect
                    onChange={(event, val, reason) => {
                      setSelectedDates(val);
                    }}
                    id="dates"
                    data-testid="dates"
                    options={stopSearchDates}
                    value={selectedDates}
                    isOptionEqualToValue={(option, value) => {
                      return option === value;
                    }}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Fragment key={index}>
                          <Chip
                            color="primary"
                            label={`${fixDate(option)}`}
                            {...getTagProps({ index })}
                            onDelete={() => {
                              setSelectedDates((_) =>
                                _.filter((x) => x !== option)
                              );
                            }}
                          />
                        </Fragment>
                      ))
                    }
                    getOptionLabel={(option) => fixDate(option)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Available months"
                        placeholder="Type to select month"
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" fontSize={15}>
              *{selectedDates.length} months of data*
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
