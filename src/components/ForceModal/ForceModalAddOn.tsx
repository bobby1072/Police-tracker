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
import { CrimeTable } from "./CrimeTable";
import { OfficerBioTable } from "./OfficerBioTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ForceStopSearchData } from "./ForceStopSearchData";
import IAllForce from "../../common/ApiTypes/IAllForces";
interface IModalAddOnFuncProps {
  reports: [ICrimeReport[], IPoliceService, IOfficerBio[]];
  closeModal: () => void;
  stopSearchDataAvailable?: Date[];
  force: IAllForce;
}
interface IAccordionExpanded {
  officerBio: boolean;
  recentCrimes: boolean;
  stopSearch: boolean;
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
export const ModalAddonFunc: React.FC<IModalAddOnFuncProps> = ({
  closeModal,
  reports: [crimeReport, policeService, officerBio],
  stopSearchDataAvailable,
  force,
}) => {
  const [accordionData, setAccordionData] = useState<IAccordionExpanded>({
    officerBio: false,
    recentCrimes: false,
    stopSearch: false,
  });
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
      <Grid item>
        <Typography fontSize={19} variant="subtitle2">
          Phone number: {policeService.telephone}
        </Typography>
      </Grid>
      {policeService.url && (
        <Grid item>
          <Link href={policeService.url} fontSize={25}>
            Police force website
          </Link>
        </Grid>
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
            <Accordion
              expanded={accordionData.officerBio}
              onChange={(event, expand) =>
                setAccordionData((_) => ({
                  officerBio: expand,
                  recentCrimes: _.recentCrimes,
                  stopSearch: _.stopSearch,
                }))
              }
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="subtitle2" fontSize={30}>
                  Officer information
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {accordionData.officerBio && (
                  <OfficerBioTable officerBio={officerBio} />
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      {stopSearchDataAvailable && (
        <Grid item width="100%">
          <Accordion
            expanded={accordionData.stopSearch}
            onChange={(event, expanded) =>
              setAccordionData((_) => ({
                officerBio: _.officerBio,
                recentCrimes: _.recentCrimes,
                stopSearch: expanded,
              }))
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle2" fontSize={30}>
                Stop search data
              </Typography>
            </AccordionSummary>
            <Divider sx={{ mb: 1 }} />
            <AccordionDetails sx={{ padding: 1 }}>
              {accordionData.stopSearch && (
                <ForceStopSearchData
                  force={force}
                  stopSearchDates={stopSearchDataAvailable}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}
      {crimeReport.length > 0 && (
        <Grid item width="100%">
          <Accordion
            expanded={accordionData.recentCrimes}
            onChange={(event, expand) =>
              setAccordionData((_) => ({
                officerBio: _.officerBio,
                recentCrimes: expand,
                stopSearch: _.stopSearch,
              }))
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle2" fontSize={30}>
                Recent crime reports
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              {accordionData.recentCrimes && (
                <Paper>
                  <Tabs
                    value={crimeDisplay}
                    onChange={(
                      event: React.SyntheticEvent,
                      newValue: number
                    ) => {
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
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}
    </Grid>
  );
};
