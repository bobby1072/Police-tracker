import { Grid, TextField } from "@mui/material";
import { LatLngMap } from "../MapComponents/LatLngMap";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Date } from "../../utils/ExtendedDate";
import { BorderStyledPaper } from "../../common/BorderStyledPaper";
const checkNumber = (val: any): val is number => {
  return typeof val === "number" && !isNaN(val);
};
export interface IlatLng {
  lat?: number;
  lng?: number;
}
interface IFindCrimeMApContainerProps {
  setDate: (data: Date) => void;
  date?: Date;
  setLatLng: (value: IlatLng | undefined) => void;
  latLng?: IlatLng;
  maxCrimeDate?: Date;
}
export const FindCrimeMapContainer: React.FC<IFindCrimeMApContainerProps> = ({
  latLng,
  setLatLng,
  setDate,
  date,
  maxCrimeDate,
}) => {
  return (
    <BorderStyledPaper sx={{ backgroundColor: "#f9f9f9" }}>
      <Grid
        container
        justifyContent="center"
        direction="row"
        padding={3}
        spacing={1}
      >
        <Grid item width="25%">
          <BorderStyledPaper>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              padding={1}
              spacing={1}
            >
              <Grid item width="100%">
                <TextField
                  fullWidth
                  label="latitude"
                  value={latLng?.lat ?? ""}
                  onChange={(event) => {
                    const numVal = Number(event.target.value);
                    if (!checkNumber(numVal)) return;
                    if (numVal === 0) {
                      setLatLng({
                        lat: undefined,
                        lng: latLng?.lng ?? undefined,
                      });
                      return;
                    }
                    setLatLng({ lat: numVal, lng: latLng?.lng ?? undefined });
                  }}
                />
              </Grid>
              <Grid item width="100%">
                <TextField
                  fullWidth
                  label="longitude"
                  value={latLng?.lng ?? ""}
                  onChange={(event) => {
                    const numVal = Number(event.target.value);
                    if (!checkNumber(numVal)) return;
                    if (numVal === 0) {
                      setLatLng({
                        lat: latLng?.lat ?? undefined,
                        lng: undefined,
                      });
                      return;
                    }
                    setLatLng({ lat: latLng?.lat ?? undefined, lng: numVal });
                  }}
                />
              </Grid>
              <Grid item width="100%">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"Month"}
                    maxDate={maxCrimeDate ? dayjs(maxCrimeDate) : undefined}
                    value={date ? dayjs(date) : undefined}
                    onChange={(value: any) => {
                      setDate(value.$d as Date);
                    }}
                    views={["month", "year"]}
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </BorderStyledPaper>
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
    </BorderStyledPaper>
  );
};
