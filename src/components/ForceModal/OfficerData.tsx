import { Divider, Grid, Tab, Tabs } from "@mui/material";
import { a11yProps } from "./ForceModalAddOn";
import { useState } from "react";
import { OfficerBioTable } from "./OfficerBioTable";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
import { JsonViewer } from "../ForceJsonViewer/JsonViewer";
import { BorderStyledPaper } from "../../common/BorderStyledPaper";
interface IOfficerDataProps {
  officers: IOfficerBio[];
}
export const OfficerData: React.FC<IOfficerDataProps> = ({ officers }) => {
  const [displayType, setDisplayType] = useState<number>(0);
  return (
    <BorderStyledPaper>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        direction="column"
      >
        <Grid item width="100%">
          <Tabs
            value={displayType}
            onChange={(event: React.SyntheticEvent, newValue: number) => {
              setDisplayType(newValue);
            }}
            aria-label="basic tabs example"
            sx={{ mb: 2 }}
          >
            <Tab label="Data table" {...a11yProps(0)} />
            <Tab label="Raw data view" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item width="100%">
          <Divider />
        </Grid>
        <Grid item width="100%">
          {displayType === 0 && <OfficerBioTable officerBio={officers} />}
          {displayType === 1 && (
            <JsonViewer
              maxWidth="150vh"
              maxHeight="85vh"
              title="Officer table"
              jsonData={officers}
            />
          )}
        </Grid>
      </Grid>
    </BorderStyledPaper>
  );
};
