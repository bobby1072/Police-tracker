import { Grid } from "@mui/material";
import { MainAppBar } from "../common/AppBar";
import { ForcesDataArray } from "../components/ForcesDataArray/ForcesDataArray";
import forces from "../common/AllForces.json";
import IAllForce from "../common/ApiTypes/IAllForces";
import { useState } from "react";
import { ForceModal } from "../components/ForcesDataArray/ForceModal";
export const ForceLocater: React.FC = () => {
  const allForces: IAllForce[] = forces;
  const [focusForce, setFocusForce] = useState<IAllForce>();
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
            spacing={2}
          >
            <Grid item width="100%">
              <ForcesDataArray
                forces={allForces}
                setForce={(force?: IAllForce) => {
                  setFocusForce(force);
                }}
              />
            </Grid>
          </Grid>
        </div>
        {focusForce ? (
          <ForceModal
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
