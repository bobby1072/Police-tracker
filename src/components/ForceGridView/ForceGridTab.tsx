import { useTheme, Grid, Paper, Typography, Button } from "@mui/material";
import IAllForce from "../../common/ApiTypes/IAllForces";
interface IForceGridTabProps {
  force: IAllForce;
  setForce: (data: IAllForce) => void;
}
export const ForceGridTab: React.FC<IForceGridTabProps> = ({
  force,
  setForce,
}) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: "28vh",
      }}
    >
      <Grid
        container
        alignItems="center"
        textAlign="center"
        direction="column"
        padding={2}
        spacing={1}
      >
        <Grid item>
          <Typography
            variant="subtitle2"
            fontSize={30}
            sx={{ color: "#ffffff" }}
          >
            {force.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            aria-label={`${force.id}-button`}
            variant="contained"
            sx={{ backgroundColor: "#ffffff" }}
            onClick={() => {
              setForce(force);
            }}
          >
            <Typography sx={{ color: theme.palette.primary.main }}>
              View force
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
