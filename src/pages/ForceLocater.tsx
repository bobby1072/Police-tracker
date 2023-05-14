import { Grid, Paper, Tabs, Tab, Divider } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import { ForcesDataArray } from "../components/ForcesDataArray/ForcesDataArray";
import IAllForce from "../common/ApiTypes/IAllForces";
import { useState } from "react";
import { ForceModal } from "../components/ForcesDataArray/ForceModal";
import { useAllForces, useStopSearchAvailability } from "../utils/Querys";
import { ForceGridContainer } from "../components/ForceGridView/ForceGridContainer";
import { Loading } from "../common/Loading";
import { Error } from "../common/Error";
const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
export const ForceLocater: React.FC = () => {
  const [focusForce, setFocusForce] = useState<IAllForce>();
  const [displayOption, setDisplayOptions] = useState<number>(0);
  const {
    data: allForce,
    isLoading: forceLoading,
    error: forceErrors,
  } = useAllForces();
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
                {allForce && !forceLoading && !forceErrors && (
                  <div>
                    <Tabs
                      value={displayOption}
                      onChange={(
                        event: React.SyntheticEvent,
                        newValue: number
                      ) => {
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
                          forces={allForce}
                          setFocusForce={(data: IAllForce) => {
                            setFocusForce(data);
                          }}
                        />
                      ) : (
                        <ForcesDataArray
                          forces={allForce}
                          setForce={(force?: IAllForce) => {
                            setFocusForce(force);
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                {(forceLoading || forceErrors) && (
                  <Grid
                    container
                    direction="column"
                    padding={10}
                    justifyContent="center"
                    alignItems="center"
                    minHeight="60vh"
                  >
                    {forceLoading && !forceErrors && (
                      <Grid item>
                        <Loading />
                      </Grid>
                    )}
                    {forceErrors && (
                      <Grid item>
                        <Error error={forceErrors} />
                      </Grid>
                    )}
                  </Grid>
                )}
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
