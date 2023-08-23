import {
  Divider,
  Grid,
  IconButton,
  Typography,
  TextField,
  styled,
  InputAdornment,
} from "@mui/material";
import ICrimeData from "../../common/ApiTypes/ICrimeData";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { BorderStyledPaper } from "../../common/BorderStyledPaper";
export const StyledTextField = styled(TextField)(() => ({
  inputProps: {
    style: {
      width: "auto",
    },
  },
}));

interface ICrimeDisplayProps {
  crime: ICrimeData | ICrimeReport;
}
const getLocationWidthPercent = (crime: ICrimeData) => {
  const filterList = Object.entries(crime.location).filter(
    ([key, val]) =>
      ((key === "latitude" || key === "longitude") && Boolean(val)) ||
      (key === "street" && typeof val !== "string" && Boolean(val.name))
  );
  return (90 / filterList.length).toString() + "%";
};

const crimeIdentify = (crime: any): crime is ICrimeData =>
  crime?.location &&
  !(typeof crime.location === "string") &&
  "latitude" in crime.location &&
  "longitude" in crime.location &&
  "street" in crime.location;
export const CrimeDisplay: React.FC<ICrimeDisplayProps> = ({ crime }) => {
  const [showPeristentId, setShowPeristentId] = useState<boolean>(false);
  const isAdvancedCrime = crimeIdentify(crime);
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
            {crime.category.replaceAll("-", " ")}
          </Typography>
        </Grid>
        <Grid item width="100%">
          <Divider />
        </Grid>
        {crime.persistent_id && (
          <Grid
            item
            width={showPeristentId ? "90%" : undefined}
            position="initial"
          >
            <StyledTextField
              fullWidth
              disabled
              label="Persistent id"
              value={showPeristentId ? crime.persistent_id : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label="togglePersitentId"
                      onClick={() => {
                        setShowPeristentId(showPeristentId ? false : true);
                      }}
                    >
                      {showPeristentId ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
        {crime.id && (
          <Grid item>
            <StyledTextField label="Id" disabled fullWidth value={crime.id} />
          </Grid>
        )}
        {crime.month && (
          <Grid item>
            <StyledTextField
              label="Month"
              disabled
              fullWidth
              value={crime.month}
            />
          </Grid>
        )}
        {crime.context && (
          <Grid item>
            <Typography fontSize={15} variant="body1">
              {crime.context}
            </Typography>
          </Grid>
        )}
        <Grid item sx={{ mb: 4 }} />
        {crime.location && (
          <Grid item width="100%">
            <Typography fontSize={28} variant="body1">
              Location
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              padding={1}
              spacing={2}
              direction="row"
            >
              {typeof crime.location === "string" && (
                <Grid item width="100%">
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Location"
                    value={crime.location}
                  />
                </Grid>
              )}
              {isAdvancedCrime && crime.location.latitude && (
                <Grid item width={getLocationWidthPercent(crime)}>
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Latitude"
                    value={crime.location.latitude}
                  />
                </Grid>
              )}
              {isAdvancedCrime && crime.location.longitude && (
                <Grid item width={getLocationWidthPercent(crime)}>
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Longitude"
                    value={crime.location.longitude}
                  />
                </Grid>
              )}
              {isAdvancedCrime && crime.location.street.name && (
                <Grid item width={getLocationWidthPercent(crime)}>
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Street"
                    value={crime.location.street.name}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        {crime.outcome_status && (
          <Grid item width="100%">
            <Typography fontSize={28} variant="body1">
              Outcome status
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              padding={1}
              spacing={2}
              direction="row"
            >
              {crime.outcome_status.category && (
                <Grid item width="45%">
                  <StyledTextField
                    disabled
                    fullWidth
                    label="Category of outcome"
                    value={crime.outcome_status.category}
                  />
                </Grid>
              )}
              {crime.outcome_status.date && (
                <Grid item width="45%">
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Date of outcome"
                    value={crime.outcome_status.date}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </BorderStyledPaper>
  );
};
