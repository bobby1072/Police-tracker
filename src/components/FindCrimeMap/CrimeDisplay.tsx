import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import ICrimeData from "../../common/ApiTypes/ICrimeData";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface ICrimeDisplayProps {
  crime: ICrimeData;
}
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
          <Typography fontSize={40} variant="inherit">
            {crime.category}
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
      </Grid>
    </Paper>
  );
};
