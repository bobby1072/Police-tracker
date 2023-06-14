import { Grid } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import {
  FindCrimeMapContainer,
  IlatLng,
} from "../components/FindCrimeMap/FindCrimeMapContainer";
import { useCrimeWithLocation } from "../utils/Mutations";
import { useEffect, useState } from "react";
import { Date } from "../utils/ExtendedDate";

export const CrimeMap: React.FC = () => {
  const [crimeDate, setCrimeDate] = useState<Date>();
  const [latLng, setLatLng] = useState<IlatLng>();
  const {
    mutate: crimeMutation,
    isLoading: crimeLoading,
    error: crimeError,
  } = useCrimeWithLocation();
  useEffect(() => {
    if (latLng?.lat && latLng.lng) {
      crimeMutation({
        lat: Number(latLng.lat.toFixed(6)),
        lng: Number(latLng.lng.toFixed()),
        date: crimeDate,
      });
    }
  }, [latLng, crimeDate, crimeMutation]);
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
              <FindCrimeMapContainer latLng={latLng} setLatLng={setLatLng} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
