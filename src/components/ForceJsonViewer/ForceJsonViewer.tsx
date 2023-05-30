import { Grid, Paper, styled } from "@mui/material";
interface IForceJsonViewerProps {
  maxHeight: string;
  jsonData: Object;
}
const ScrollableGrid = styled(Grid)`
  overflow: auto;
`;

export const ForceJsonViewer: React.FC<IForceJsonViewerProps> = ({
  maxHeight,
  jsonData,
}) => {
  return (
    <Paper sx={{ backgroundColor: "#000000" }}>
      <ScrollableGrid
        container
        padding={1}
        maxHeight={maxHeight}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item width="100%">
          <pre style={{ color: "#00FF00" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </Grid>
      </ScrollableGrid>
    </Paper>
  );
};
