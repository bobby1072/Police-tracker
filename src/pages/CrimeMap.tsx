import { Grid } from "@mui/material";
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
import { AxiosError } from "axios";
import { useCrimeLastUpdated } from "../utils/Querys";
import { BorderStyledPaper } from "../common/BorderStyledPaper";
const getErrorMessage = (error: AxiosError): string => {
  if (error.response?.status === 404) {
    return "Not in police jurisdiction";
  } else if (error.response?.status === 502) {
    return "No data for this month";
  } else return error.message;
};
const crimeZeroDate = new Date();
export const CrimeMap: React.FC = () => {
  const { data: crimeUpdate, isLoading: crimeUpdateLoading } =
    useCrimeLastUpdated();
  const [crimeDate, setCrimeDate] = useState<Date>(crimeZeroDate);
  const [latLng, setLatLng] = useState<IlatLng>();
  const {
    mutate: crimeMutation,
    isLoading: crimeLoading,
    reset: crimeSearchReset,
    data: crimeData,
    error: crimeError,
  } = useCrimeWithLocation();
  useEffect(() => {
    if (crimeUpdate) {
      setCrimeDate(crimeUpdate);
    }
  }, [crimeUpdate]);
  useEffect(() => {
    crimeSearchReset();
    if (latLng?.lat && latLng.lng) {
      crimeMutation({
        lat: Number(latLng.lat),
        lng: Number(latLng.lng),
        date: crimeDate,
      });
    }
  }, [latLng, crimeDate, crimeMutation, crimeSearchReset]);
  return (
    <div aria-label="crimeMapPage">
      <MainAppBar />
      <div className="App-header">
        <div style={{ width: "90%" }}>
          {!crimeUpdateLoading && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              spacing={3}
            >
              <Grid item width="100%" minHeight="50vh">
                <FindCrimeMapContainer
                  maxCrimeDate={crimeUpdate}
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
                  <BorderStyledPaper sx={{ backgroundColor: "#f9f9f9" }}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      minHeight="15vh"
                    >
                      <ErrorComp
                        error={new Error(getErrorMessage(crimeError))}
                      />
                    </Grid>
                  </BorderStyledPaper>
                </Grid>
              )}
              {crimeData && crimeData.length === 0 && (
                <Grid item width="100%" minHeight="15vh">
                  <BorderStyledPaper>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      minHeight="15vh"
                    >
                      <ErrorComp error={new Error("No crimes found")} />
                    </Grid>
                  </BorderStyledPaper>
                </Grid>
              )}
              {crimeLoading && (
                <Grid item width="100%" minHeight="15vh">
                  <BorderStyledPaper>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      minHeight="15vh"
                    >
                      <Loading />
                    </Grid>
                  </BorderStyledPaper>
                </Grid>
              )}
              {crimeData &&
                crimeData.length > 0 &&
                crimeData.map((x) => (
                  <Grid item width="100%" key={`crimeDisplay${x.id}`}>
                    <CrimeDisplay crime={x} />
                  </Grid>
                ))}
            </Grid>
          )}
          {crimeUpdateLoading && (
            <BorderStyledPaper>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                padding={3}
                minHeight="50vh"
              >
                <Grid item>
                  <Loading />
                </Grid>
              </Grid>
            </BorderStyledPaper>
          )}
        </div>
      </div>
    </div>
  );
};
