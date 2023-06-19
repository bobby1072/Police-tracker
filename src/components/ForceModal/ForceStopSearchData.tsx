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
  Tab,
  Tabs,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Fragment, useEffect, useState } from "react";
import IAllForce from "../../common/ApiTypes/IAllForces";
import { Loading } from "../../common/Loading";
import { useForceStopAndSearch } from "../../utils/Querys";
import { StopSearchChart } from "../CrimeGraphs/StopSearchChart";
import { a11yProps } from "./ForceModalAddOn";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { StopSearchDataTable } from "./StopSearchDataTable";
import { ErrorComp } from "../../common/Error";
import { JsonViewer } from "../ForceJsonViewer/JsonViewer";
import { Date } from "../../utils/ExtendedDate";
interface IForceStopSearchProps {
  stopSearchDates: Date[];
  force: IAllForce;
}
export const fixDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month}`;
};
export const ForceStopSearchData: React.FC<IForceStopSearchProps> = ({
  stopSearchDates,
  force,
}) => {
  const sortedStopSearch = stopSearchDates.sort(
    (x, y) => y.getTime() - x.getTime()
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    sortedStopSearch.filter((x, index) => index < 4)
  );
  const [fetchedData, setFetchedData] = useState<IPersonSearch[][]>();
  const {
    isLoading: stopSearchLoading,
    error: stopSearchError,
    refetch: stopSearchRefetch,
  } = useForceStopAndSearch(
    force,
    selectedDates,
    (data: IPersonSearch[][]) => {
      setFetchedData(data);
    },
    fetchedData
  );
  const [filterOption, setFilterOption] = useState<
    | "all"
    | "age"
    | "race"
    | "law"
    | "gender"
    | "outcome"
    | "officerEthnicity"
    | "type"
    | "objectOfSearch"
  >("all");
  useEffect(() => {
    stopSearchRefetch();
  }, [selectedDates, stopSearchRefetch, fetchedData]);
  const [displayType, setDisplayType] = useState<number>(0);
  return (
    <Paper>
      {fetchedData && !stopSearchLoading && !stopSearchError ? (
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
                      <MenuItem value="age">Age range</MenuItem>
                      <MenuItem value="race">Ethnicity</MenuItem>
                      <MenuItem value="gender">Gender</MenuItem>
                      <MenuItem value="law">Legislation</MenuItem>
                      <MenuItem value="officerEthnicity">
                        Officer ethnicity
                      </MenuItem>
                      <MenuItem value="outcome">Outcome</MenuItem>
                      <MenuItem value="type">Type</MenuItem>
                      <MenuItem value="objectOfSearch">
                        Object of search
                      </MenuItem>
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
                <Tab label="Stop search chart" {...a11yProps(0)} />
                <Tab label="Data table" {...a11yProps(1)} />
                <Tab label="Raw data view" {...a11yProps(2)} />
              </Tabs>
              <Divider />
              {displayType === 0 && (
                <div
                  style={{
                    minHeight: fetchedData.length >= 1 ? "85vh" : undefined,
                  }}
                >
                  <StopSearchChart
                    searches={fetchedData}
                    categoryFilter={filterOption}
                  />
                </div>
              )}
              {displayType === 1 && (
                <StopSearchDataTable searchData={fetchedData} />
              )}
              {displayType === 2 && (
                <JsonViewer
                  maxWidth="150vh"
                  emptyListMessage="No selected dates"
                  jsonData={fetchedData}
                  maxHeight="90vh"
                  title="Stop search data"
                />
              )}
            </Paper>
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
              <ErrorComp error={stopSearchError} />
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
};
