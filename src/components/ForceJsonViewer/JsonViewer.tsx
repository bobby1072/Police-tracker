import { Grid, Paper, Typography, styled } from "@mui/material";
import { ErrorComp } from "../../common/Error";
interface IForceJsonViewerProps {
  maxHeight: string;
  title: string;
  jsonData: Object;
  emptyListMessage?: string;
  emptyObjectMessage?: string;
}
const ScrollableGrid = styled(Grid)`
  overflow: auto;
`;

export const JsonViewer: React.FC<IForceJsonViewerProps> = ({
  maxHeight,
  jsonData,
  title,
  emptyListMessage,
  emptyObjectMessage,
}) => {
  if (
    emptyListMessage &&
    Array.isArray(jsonData) &&
    jsonData.flat().length < 1
  ) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={5}
      >
        <Grid item>
          <ErrorComp error={new Error(emptyListMessage)} />
        </Grid>
      </Grid>
    );
  }
  const objectVals = Object.entries(jsonData);
  if (
    emptyObjectMessage &&
    (objectVals.length < 1 ||
      !objectVals.every(([key, val]) => Boolean(key)) ||
      !objectVals.some(([key, val]) => Boolean(val)))
  ) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={5}
      >
        <Grid item>
          <ErrorComp error={new Error(emptyListMessage)} />
        </Grid>
      </Grid>
    );
  }
  const jsonInfo = JSON.stringify(jsonData, null, 2);
  return (
    <div aria-label="jsonViewer">
      <Paper sx={{ backgroundColor: "#191919" }}>
        <ScrollableGrid
          container
          padding={1}
          maxHeight={maxHeight}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item width="100%">
            <Typography
              sx={{ color: "#00FF00" }}
              textAlign="center"
              variant="subtitle2"
              fontSize={50}
            >
              {title}
            </Typography>
          </Grid>
          <Grid item width="100%" textAlign="start">
            <pre style={{ color: "#00FF00" }}>{jsonInfo}</pre>
          </Grid>
        </ScrollableGrid>
      </Paper>
    </div>
  );
};
