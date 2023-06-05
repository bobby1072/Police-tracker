import { Grid, Paper } from "@mui/material";
import { MainAppBar } from "../common/AppBar";

export const CrimeMap: React.FC = () => {
  return (
    <div aria-label="crimeMapPage">
      <MainAppBar />
      <div className="App-header">
        <div style={{ width: "90%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            spacing={1}
          >
            <Grid item width="100%">
              <Paper>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  padding={2}
                  spacing={2}
                ></Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
