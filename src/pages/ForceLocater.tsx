import { Grid, Paper, Tabs, Tab, Divider } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import { ForcesDataArray } from "../components/ForcesDataArray/ForcesDataArray";
import forces from "../common/AllForces.json";
import IAllForce from "../common/ApiTypes/IAllForces";
import { useState } from "react";
import { ForceModal } from "../components/ForcesDataArray/ForceModal";
import { useStopSearchAvailability } from "../utils/Querys";
import { ForceGridContainer } from "../components/ForceGridView/ForceGridContainer";
const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
export const ForceLocater: React.FC = () => {
  const allForces: IAllForce[] = forces;
  const [focusForce, setFocusForce] = useState<IAllForce>();
  const [displayOption, setDisplayOptions] = useState<number>(0);
  const { data: stopSearchAvailability } = useStopSearchAvailability();
  return (
    <div>
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
                <Tabs
                  value={displayOption}
                  onChange={(event: React.SyntheticEvent, newValue: number) => {
                    setDisplayOptions(newValue);
                  }}
                  aria-label="basic tabs example"
                  sx={{ mb: 2 }}
                >
                  <Tab label="Grid view" {...a11yProps(0)} />
                  <Tab label="Data view" {...a11yProps(1)} />
                </Tabs>
                <Divider />
                <div style={{ padding: 7 }}>
                  {displayOption === 0 ? (
                    <ForceGridContainer
                      forces={allForces}
                      setFocusForce={(data: IAllForce) => {
                        setFocusForce(data);
                      }}
                    />
                  ) : (
                    <ForcesDataArray
                      forces={allForces}
                      setForce={(force?: IAllForce) => {
                        setFocusForce(force);
                      }}
                    />
                  )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
        {focusForce ? (
          <ForceModal
            stopSearchDataAvailable={stopSearchAvailability
              ?.filter((x) =>
                x["stop-and-search"].find((deepX) => deepX === focusForce.id)
              )
              .map((x) => new Date(x.date))}
            force={focusForce}
            closeModal={() => {
              setFocusForce(undefined);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
