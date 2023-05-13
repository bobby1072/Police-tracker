import {
  Typography,
  Grid,
  Button,
  Link,
  Paper,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useState } from "react";
import IPoliceService from "../../common/ApiTypes/IPoliceService";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
import { CrimeBarChart } from "../CrimeGraphs/CrimeBarChart";
import { OfficerBioTable } from "./OfficerBioTable";
import { CrimeTable } from "./CrimeTable";
interface IModalAddOnFuncProps {
  reports: [ICrimeReport[], IPoliceService, IOfficerBio[]];
  closeModal: () => void;
}
const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
export const getDate = (dateString: string) => {
  const dateArray: string[] = dateString.split("-");
  const year: number = parseInt(dateArray[0]);
  const month: number = parseInt(dateArray[1]);
  const date: Date = new Date(Date.UTC(year, month - 1));
  const timestamp: number = Math.floor(date.getTime() / 1000);
  return timestamp;
};
export const ModalAddonFunc: React.FC<IModalAddOnFuncProps> = (
  props: IModalAddOnFuncProps
) => {
  const {
    reports: [crimeReport, policeService, officerBio],
    closeModal,
  } = props;
  const sortedCrimeReports = crimeReport.sort((a, b) => {
    const [aTimeStamp, bTimeStamp] = [getDate(a.month), getDate(b.month)];
    return aTimeStamp - bTimeStamp;
  });
  const [crimeDisplay, setCrimeDisplay] = useState<number>(0);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography fontSize={45} variant="subtitle2">
          {policeService.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontSize={35} variant="subtitle2">
          {policeService.id}
        </Typography>
      </Grid>
      {policeService.description && (
        <Grid item>
          <Typography fontSize={19} variant="subtitle2">
            <div
              dangerouslySetInnerHTML={{ __html: policeService.description }}
            />
          </Typography>
        </Grid>
      )}
      <Grid item sx={{ mb: 2 }}>
        <Typography fontSize={19} variant="subtitle2">
          Phone number: {policeService.telephone}
        </Typography>
      </Grid>
      {policeService.url && (
        <Link href={policeService.url} fontSize={25}>
          Police force website
        </Link>
      )}
      <Grid item>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Grid item>
            <Button variant="outlined" onClick={closeModal}>
              Close
            </Button>
          </Grid>
          {policeService.engagement_methods
            .filter((x) => x.type !== "telephone" && x.type !== "web")
            .map((x) => (
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.location.href = x.url;
                  }}
                >
                  {x.title}
                </Button>
              </Grid>
            ))}
        </Grid>
      </Grid>
      {officerBio.length > 0 &&
        (officerBio[0].bio || officerBio[0].contact_details) && (
          <Grid item width="100%">
            <OfficerBioTable officerBio={officerBio} />
          </Grid>
        )}
      {crimeReport.length > 0 && (
        <Grid item width="100%" minHeight="60vh">
          <Paper>
            <Tabs
              value={crimeDisplay}
              onChange={(event: React.SyntheticEvent, newValue: number) => {
                setCrimeDisplay(newValue);
              }}
              aria-label="basic tabs example"
              sx={{ mb: 2 }}
            >
              <Tab label="Data table" {...a11yProps(0)} />
              <Tab label="Pie chart" {...a11yProps(1)} />
            </Tabs>
            <Divider />
            <div style={{ padding: 7 }}>
              {crimeDisplay !== 0 ? (
                <CrimeBarChart crimes={crimeReport} />
              ) : (
                <CrimeTable sortedCrimeReports={sortedCrimeReports} />
              )}
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
