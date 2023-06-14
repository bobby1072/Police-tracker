import { Grid, Paper, TextField } from "@mui/material";
import { LatLngMap } from "../MapComponents/LatLngMap";
export interface IlatLng {
  lat?: number;
  lng?: number;
}
interface IFindCrimeMApContainerProps {
  setLatLng: (value: React.SetStateAction<IlatLng | undefined>) => void;
  latLng?: IlatLng;
}
export const FindCrimeMapContainer: React.FC<IFindCrimeMApContainerProps> = ({
  latLng,
  setLatLng,
}) => {
  return (
    <Paper>
      <Grid
        container
        justifyContent="center"
        direction="row"
        padding={3}
        spacing={1}
      >
        <Grid item width="25%">
          <Paper sx={{ backgroundColor: "#F6F6F6" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              padding={1}
              spacing={1}
            >
              <Grid item>
                <TextField
                  defaultValue={latLng?.lat ?? ""}
                  label="lat"
                  value={latLng?.lat ?? ""}
                  onChange={(event) => {
                    setLatLng((_) => {
                      const numVal = Number(event.target.value);
                      if (_) {
                        _.lat = numVal;
                        return _;
                      } else {
                        return { lat: numVal, lng: undefined };
                      }
                    });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  defaultValue={latLng?.lng ?? ""}
                  label="lng"
                  value={latLng?.lng ?? ""}
                  onChange={(event) => {
                    setLatLng((_) => {
                      const numVal = Number(event.target.value);
                      if (_) {
                        _.lng = numVal;
                        return _ as IlatLng;
                      } else {
                        return { lng: numVal, lat: undefined } as IlatLng;
                      }
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item width="75%" height="50vh">
          <LatLngMap
            lat={latLng?.lat}
            lng={latLng?.lng}
            setLatLng={(latLng: IlatLng) => {
              setLatLng(latLng);
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
