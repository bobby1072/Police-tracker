import { Grid } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import { FindCrimeMapContainer } from "../components/FindCrimeMap/FindCrimeMapContainer";

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
            <Grid item width="100%" minHeight="105vh">
              <FindCrimeMapContainer />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
