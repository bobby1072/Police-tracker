import { Grid, Paper } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import {
  FindCrimeMapContainer,
  IlatLng,
} from "../components/FindCrimeMap/FindCrimeMapContainer";
import { useCrimeWithLocation } from "../utils/Mutations";
import { useEffect, useState } from "react";
import { Date } from "../utils/ExtendedDate";
import { ErrorComp } from "../common/Error";
import { CrimeDisplay } from "../components/FindCrimeMap/CrimeDisplay";
import { Loading } from "../common/Loading";
export const CrimeMap: React.FC = () => {
  const [crimeDate, setCrimeDate] = useState<Date>(new Date());
  const [latLng, setLatLng] = useState<IlatLng>();
  const {
    mutate: crimeMutation,
    isLoading: crimeLoading,
    reset: crimeSearchReset,
    data: crimeData,
    error: crimeError,
  } = useCrimeWithLocation();
  useEffect(() => {
    crimeSearchReset();
    if (latLng?.lat && latLng.lng) {
      crimeMutation({
        lat: Number(latLng.lat.toFixed(6)),
        lng: Number(latLng.lng.toFixed(6)),
        date: crimeDate,
      });
    }
  }, [latLng, crimeDate, crimeMutation, crimeSearchReset]);
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
            spacing={3}
          >
            <Grid item width="100%" minHeight="30vh">
              <FindCrimeMapContainer
                latLng={latLng}
                setLatLng={setLatLng}
                setDate={(data: Date) => {
                  setCrimeDate(data);
                }}
                date={crimeDate}
              />
            </Grid>
            {crimeError && (
              <Grid item width="100%">
                <Paper>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                  >
                    <ErrorComp
                      error={
                        new Error(
                          crimeError.status === 404
                            ? "Not in police jurisdiction"
                            : crimeError.message
                        )
                      }
                    />
                  </Grid>
                </Paper>
              </Grid>
            )}
            {crimeData && crimeData.length === 0 && (
              <Grid item width="100%" minHeight="30vh">
                <Paper>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                  >
                    <ErrorComp error={new Error("No crimes found")} />
                  </Grid>
                </Paper>
              </Grid>
            )}
            {crimeLoading && (
              <Grid item width="100%" minHeight="30vh">
                <Paper>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    minHeight="30vh"
                  >
                    <Loading />
                  </Grid>
                </Paper>
              </Grid>
            )}
            {crimeData &&
              crimeData.length > 0 &&
              crimeData.map((x) => (
                <Grid item width="100%">
                  <CrimeDisplay crime={x} />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};
