import { useEffect, useState } from "react";
import IAllForce from "../../common/ApiTypes/IAllForces";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { ForceGridTab } from "./ForceGridTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IMatchRange {
  pageNum: number;
  perPage: number;
}
interface IForceGridContainerProps {
  setFocusForce: (data: IAllForce) => void;
  forces: IAllForce[];
}
const calcMaxPages = (len: number, matchRange: IMatchRange) => {
  const remainder = len % matchRange.perPage;
  return (len - remainder) / matchRange.perPage + 1;
};
const allowIndex = (indexNum: number, matchRange: IMatchRange): boolean => {
  const topRange = matchRange.perPage * matchRange.pageNum;
  const bottomRange = topRange - matchRange.perPage;
  return indexNum <= topRange && indexNum > bottomRange ? true : false;
};
export const ForceGridContainer: React.FC<IForceGridContainerProps> = ({
  forces,
  setFocusForce,
}) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [matchRange, setMatchRange] = useState<IMatchRange>({
    pageNum: 1,
    perPage: 5,
  });
  const [shownForces, setShownForces] = useState<IAllForce[]>(forces);
  useEffect(() => {
    setMatchRange({
      pageNum: 1,
      perPage: 5,
    });
  }, [shownForces]);
  useEffect(() => {
    setShownForces((_) => {
      const lowerVal = searchVal.toLowerCase();
      return forces.filter(
        (x) =>
          x.name.toLowerCase().includes(lowerVal) ||
          x.id.toLowerCase().includes(lowerVal)
      );
    });
  }, [searchVal, forces]);
  return (
    <Grid
      container
      direction="column"
      spacing={1}
      aria-label="forceGridMainContainer"
    >
      <Grid item width="100%">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <Grid item width="60%">
            <Typography textAlign="right" variant="subtitle2" fontSize={40}>
              Police forces
            </Typography>
          </Grid>
          <Grid item width="40%">
            <Grid
              container
              justifyContent="flex-end"
              spacing={1}
              direction="row"
            >
              <Grid item>
                <TextField
                  label="Search forces"
                  value={searchVal}
                  onChange={(event) => {
                    setSearchVal(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" size="small">
                          <Cancel
                            onClick={() => {
                              setSearchVal("");
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item width="100%">
        <Divider />
      </Grid>
      <Grid item>
        <Grid
          aria-label="forceItemContainer"
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          minHeight="10vh"
          spacing={4}
          padding={3}
        >
          {shownForces
            .filter((_, index) => allowIndex(index + 1, matchRange))
            .map((x) => {
              return (
                <Grid item width="33%" aria-label={x.id}>
                  <ForceGridTab
                    force={x}
                    setForce={(data: IAllForce) => {
                      setFocusForce(data);
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item width="100%">
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          padding={1}
          direction="row"
        >
          <Grid item width="10%">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Forces per page
              </InputLabel>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={matchRange.perPage}
                value={matchRange.perPage}
                label="Matches per page"
                onChange={(val) => {
                  setMatchRange((_) => ({
                    pageNum: 1,
                    perPage: Number(val.target.value),
                  }));
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ marginLeft: 5, marginRight: 1 }}>
            <Typography variant="subtitle2" fontSize={18}>
              {`${
                matchRange.pageNum === 1
                  ? matchRange.pageNum
                  : (matchRange.pageNum - 1) * matchRange.perPage
              }-${matchRange.pageNum * matchRange.perPage}`}
            </Typography>
          </Grid>
          <Grid item>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setMatchRange((_) =>
                  matchRange.pageNum !== 1
                    ? {
                        pageNum: _.pageNum - 1,
                        perPage: _.perPage,
                      }
                    : _
                );
              }}
            >
              <ArrowBackIcon fontSize="medium" />
            </div>
          </Grid>
          <Grid item>
            <div
              style={{ cursor: "pointer" }}
              aria-label="next-page"
              onClick={() => {
                setMatchRange((_) =>
                  calcMaxPages(shownForces.length, matchRange) !==
                  matchRange.pageNum
                    ? {
                        pageNum: _.pageNum + 1,
                        perPage: _.perPage,
                      }
                    : _
                );
              }}
            >
              <ArrowForwardIcon fontSize="medium" />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
