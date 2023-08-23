import { Grid, Typography, Divider } from "@mui/material";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { StyledTextField } from "../FindCrimeMap/CrimeDisplay";
import { Date } from "../../utils/ExtendedDate";
import { BorderStyledPaper } from "../../common/BorderStyledPaper";
interface IStopSearchDisplayProps {
  stopSearch: IPersonSearch;
}
const getItemWidth = (search: IPersonSearch, action: string) => {
  if (action === "personInfo") {
    const filteredList = Object.entries(search).filter(
      ([key, val]) =>
        (key === "self_defined_ethnicity" ||
          key === "gender" ||
          key === "age_range") &&
        Boolean(val)
    );
    return (90 / filteredList.length).toString() + "%";
  } else {
    return "90%";
  }
};
export const StopSearchDisplay: React.FC<IStopSearchDisplayProps> = ({
  stopSearch,
}) => {
  const wholeStop = stopSearch;
  const {
    age_range,
    datetime,
    gender,
    legislation,
    location,
    outcome,
    outcome_linked_to_object_of_search,
    self_defined_ethnicity,
    type,
  } = stopSearch;
  return (
    <BorderStyledPaper>
      <Grid
        container
        alignItems="center"
        textAlign="center"
        direction="column"
        padding={3}
        spacing={2}
      >
        <Grid item width="100%">
          <Typography fontSize={45} variant="inherit">
            {type}
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Divider />
        </Grid>
        {datetime && (
          <Grid item>
            <StyledTextField
              label="Month"
              disabled
              fullWidth
              value={new Date(datetime).getPrettyDate()}
            />
          </Grid>
        )}
        <Grid item sx={{ mb: 4 }} />
        {(age_range || gender || self_defined_ethnicity) && (
          <Grid item width="100%">
            <Typography fontSize={28} variant="body1">
              Person
            </Typography>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              direction="row"
              padding={1}
              spacing={2}
            >
              {age_range && (
                <Grid item width={getItemWidth(wholeStop, "personInfo")}>
                  <StyledTextField
                    label="Age range"
                    value={age_range}
                    disabled
                    fullWidth
                  />
                </Grid>
              )}
              {gender && (
                <Grid item width={getItemWidth(wholeStop, "personInfo")}>
                  <StyledTextField
                    label="Gender"
                    value={gender}
                    disabled
                    fullWidth
                  />
                </Grid>
              )}
              {self_defined_ethnicity && (
                <Grid item width={getItemWidth(wholeStop, "personInfo")}>
                  <StyledTextField
                    label="Ethnicity"
                    value={self_defined_ethnicity}
                    disabled
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        <Grid item sx={{ mb: 4 }} />
        <Grid item width="100%">
          {outcome && (
            <StyledTextField
              label="Outcome"
              value={outcome}
              disabled
              fullWidth
            />
          )}
        </Grid>
        <Grid item width="100%">
          {outcome_linked_to_object_of_search && (
            <StyledTextField
              label="Outcome Linked to Object of Search"
              value={outcome_linked_to_object_of_search}
              disabled
              fullWidth
            />
          )}
        </Grid>
        <Grid item width="100%">
          {legislation && (
            <StyledTextField
              label="Legislation"
              value={legislation}
              disabled
              fullWidth
            />
          )}
        </Grid>
        {location && (
          <>
            <Grid item sx={{ mb: 4 }} />
            <Grid item width="100%">
              <Typography fontSize={28} variant="body1">
                Location
              </Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                direction="row"
                padding={1}
                spacing={2}
              >
                {location.latitude && (
                  <Grid item width="35%">
                    <StyledTextField
                      label="Latitude"
                      value={location.latitude}
                      disabled
                      fullWidth
                    />
                  </Grid>
                )}
                {location.longitude && (
                  <Grid item width="35%">
                    <StyledTextField
                      label="Longitude"
                      value={location.longitude}
                      disabled
                      fullWidth
                    />
                  </Grid>
                )}
                {location.street.name && (
                  <Grid item width="70%">
                    <StyledTextField
                      label="Street name"
                      value={location.street.name}
                      disabled
                      fullWidth
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </BorderStyledPaper>
  );
};
