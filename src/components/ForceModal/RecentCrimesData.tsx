import {
  Autocomplete,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IAllForce from "../../common/ApiTypes/IAllForces";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { useForceCrimes } from "../../utils/Querys";
import { Date } from "../../utils/ExtendedDate";
import { Fragment, useEffect, useState } from "react";
import { Loading } from "../../common/Loading";
import { ErrorComp } from "../../common/Error";
import { fixDate } from "./ForceStopSearchData";
import { CrimeBar } from "../CrimeGraphs/CrimeBar";
import { CrimeTable } from "./CrimeTable";
import { a11yProps } from "./ForceModalAddOn";

interface IRecentCrimesDataProps {
  stopSearchDate: Date;
  force: IAllForce;
  existingCrimeReports: ICrimeReport[];
}
const getLastTwoYearsMonthsBeforeDate = (inputDate: Date): Date[] => {
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth();

  const result: Date[] = [];

  let year = inputYear;
  let month = inputMonth;

  for (let i = 0; i < 24; i++) {
    result.unshift(new Date(year, month));

    month--;

    if (month < 0) {
      month = 11;
      year--;
    }
  }

  return result;
};
export const RecentCrimesData: React.FC<IRecentCrimesDataProps> = ({
  force,
  stopSearchDate,
  existingCrimeReports,
}) => {
  const [filterOption, setFilterOption] = useState<"all" | "category">("all");
  const [fetchedData, setFetchedData] = useState<ICrimeReport[][]>([
    existingCrimeReports,
  ]);
  const lastTwoYears = getLastTwoYearsMonthsBeforeDate(stopSearchDate);
  const sortedStopSearch = lastTwoYears.sort(
    (x, y) => y.getTime() - x.getTime()
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    sortedStopSearch.filter((x, index) => index < 4)
  );
  const {
    refetch: crimeRefetch,
    isLoading: crimeLoading,
    error: crimeError,
  } = useForceCrimes(
    force,
    selectedDates,
    (data: ICrimeReport[][]) => {
      setFetchedData(data);
    },
    fetchedData
  );
  useEffect(() => {
    crimeRefetch();
  }, [selectedDates, crimeRefetch, fetchedData]);
  const [displayType, setDisplayType] = useState<number>(0);

  return (
    <Paper>
      {fetchedData && !crimeLoading && !crimeError ? (
        <Grid
          aria-label="recentCrimeData"
          container
          justifyContent="center"
          alignItems="center"
          padding={3}
          spacing={1}
          direction="column"
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
              {displayType === 0 && (
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
                      <MenuItem value="category">Type</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
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
                    options={lastTwoYears}
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
                    filterOptions={(options) =>
                      options.filter((date) => {
                        return selectedDates.every(
                          (x) => x.getTime() !== date.getTime()
                        );
                      })
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
          <Grid
            item
            width="100%"
            minHeight={fetchedData.length >= 1 ? "90vh" : undefined}
          >
            <Paper>
              <Tabs
                value={displayType}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                  setDisplayType(newValue);
                }}
                aria-label="basic tabs example"
                sx={{ mb: 2 }}
              >
                <Tab label="Recent crime bar" {...a11yProps(0)} />
                <Tab label="Data table" {...a11yProps(1)} />
              </Tabs>
              <Divider />
              {displayType === 0 ? (
                <div
                  style={{
                    minHeight: fetchedData.length >= 1 ? "85vh" : undefined,
                  }}
                >
                  <CrimeBar
                    categoryFilt={filterOption}
                    crimeReports={fetchedData}
                  />
                </div>
              ) : (
                <CrimeTable sortedCrimeReports={fetchedData} />
              )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" alignItems="center" padding={5}>
          {crimeLoading && !crimeError && (
            <Grid item>
              <Loading />
            </Grid>
          )}
          {crimeError && (
            <Grid item>
              <ErrorComp error={crimeError} />
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
};
