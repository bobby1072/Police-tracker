import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  styled,
} from "@mui/material";
import ICrimeData from "../../common/ApiTypes/ICrimeData";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const StyledTextField = styled(TextField)(() => ({
  inputProps: {
    style: {
      width: "auto",
    },
  },
}));

interface ICrimeDisplayProps {
  crime: ICrimeData;
}
const getLocationWidthPercent = (crime: ICrimeData) => {
  if (
    crime.location?.street?.name &&
    crime.location.latitude &&
    crime.location.longitude
  ) {
    return "20%";
  } else return "30%";
};
export const CrimeDisplay: React.FC<ICrimeDisplayProps> = ({ crime }) => {
  const [showPeristentId, setShowPeristentId] = useState<boolean>(false);
  return (
    <Paper>
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
          <Grid item width="100%" position="initial">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Grid item>
                <IconButton
                  aria-label="togglePersitentId"
                  onClick={() => {
                    setShowPeristentId(showPeristentId ? false : true);
                  }}
                  edge="end"
                >
                  {showPeristentId ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <Typography fontSize={15} variant="body1">
                  {showPeristentId ? crime.persistent_id : "Persistent id"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        {crime.id && (
          <Grid item>
            <Typography fontSize={15} variant="body1">
              Id: {crime.id}
            </Typography>
          </Grid>
        )}
        {crime.month && (
          <Grid item>
            <Typography variant="body1" fontSize={15}>
              Month: {crime.month}
            </Typography>
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
              {crime.location.latitude && (
                <Grid item width={getLocationWidthPercent(crime)}>
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Latitude"
                    value={crime.location.latitude}
                  />
                </Grid>
              )}
              {crime.location.longitude && (
                <Grid item width={getLocationWidthPercent(crime)}>
                  <StyledTextField
                    fullWidth
                    disabled
                    label="Longitude"
                    value={crime.location.longitude}
                  />
                </Grid>
              )}
              {crime.location.street.name && (
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
                <Grid item width="30%">
                  <StyledTextField
                    disabled
                    fullWidth
                    label="Category of outcome"
                    value={crime.outcome_status.category}
                  />
                </Grid>
              )}
              {crime.outcome_status.date && (
                <Grid item width="30%">
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
    </Paper>
  );
};
