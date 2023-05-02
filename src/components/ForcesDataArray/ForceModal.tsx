import IAllForce from "../../common/ApiTypes/IAllForces";
import Modal from "@mui/material/Modal";
import {
  Box,
  Typography,
  Grid,
  TableRow,
  TableCell,
  Button,
  Link,
} from "@mui/material";
import { useQuery } from "react-query";
import ApiServiceProvider from "../../utils/ApiServiceProvider";
import IPoliceService from "../../common/ApiTypes/IPoliceService";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
import MUIDataTable from "mui-datatables";
import { CrimeBarChart } from "../CrimeGraphs/CrimeBarChart";
const style = {
  position: "absolute",
  top: "50%",
  minHeight: "50vh",
  maxHeight: "80vh",
  minWidth: "150vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};
interface IModalAddOnFuncProps {
  reports: [ICrimeReport[], IPoliceService, IOfficerBio[]];
  closeModal: () => void;
}
interface IForceModalProps {
  force: IAllForce;
  closeModal: () => void;
}
const getDate = (dateString: string) => {
  const dateArray: string[] = dateString.split("-");
  const year: number = parseInt(dateArray[0]);
  const month: number = parseInt(dateArray[1]);
  const date: Date = new Date(Date.UTC(year, month - 1));
  const timestamp: number = Math.floor(date.getTime() / 1000);
  return timestamp;
};
const ModalAddonFunc: React.FC<IModalAddOnFuncProps> = (
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
  const muiData = officerBio
    .filter(
      (officer, index, self) =>
        index === self.findIndex((o) => o.name === officer.name)
    )
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
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
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              textAlign="center"
              spacing={1}
            >
              <Grid item width="100%">
                <MUIDataTable
                  title="Officers"
                  columns={Object.keys(officerBio[0]).map((x) => {
                    return {
                      name: x,
                      label: x,
                      ...(!(x === "name" || x === "rank") && {
                        options: { display: "excluded" },
                      }),
                    };
                  })}
                  data={muiData}
                  options={{
                    selectableRows: "none",
                    filter: false,
                    expandableRows: true,
                    renderExpandableRow: (rowData, rowMeta) => {
                      const x = muiData[rowMeta.dataIndex];
                      const colSpan = rowData.length + 1;
                      return (
                        <TableRow>
                          <TableCell colSpan={colSpan}>
                            <Grid
                              width="100%"
                              container
                              justifyContent="center"
                              alignItems="center"
                              direction="column"
                              padding={1}
                              textAlign="center"
                            >
                              <div>
                                {x.name && (
                                  <Grid item>
                                    <Typography
                                      fontSize={30}
                                      variant="subtitle2"
                                    >
                                      Name: {x.name}
                                    </Typography>
                                  </Grid>
                                )}
                                {x.rank && (
                                  <Grid item>
                                    <Typography
                                      fontSize={25}
                                      variant="subtitle2"
                                    >
                                      Rank: {x.rank}
                                    </Typography>
                                  </Grid>
                                )}
                                {x.bio && (
                                  <Grid item>
                                    <Typography
                                      fontSize={15}
                                      variant="subtitle2"
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: x.bio,
                                        }}
                                      />
                                    </Typography>
                                  </Grid>
                                )}
                              </div>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      );
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

      {crimeReport.length > 0 && (
        <Grid item width="100%" minHeight="80vh">
          <CrimeBarChart crimes={crimeReport} />
        </Grid>
      )}
      {crimeReport.length > 0 && (
        <Grid item width="100%">
          <MUIDataTable
            columns={Object.keys(sortedCrimeReports[0]).map((x) => {
              return {
                name: x,
                label: x,
                ...(!(x === "category" || x === "id") && {
                  options: {
                    display: x === "month" ? "true" : "excluded",
                    ...(x === "month" && {
                      sortCompare: (order: string) => (a: any, b: any) => {
                        const [aTimeStamp, bTimeStamp] = [
                          getDate(a.data),
                          getDate(b.data),
                        ];
                        if (order === "asc") {
                          return aTimeStamp - bTimeStamp;
                        } else {
                          return aTimeStamp + bTimeStamp;
                        }
                      },
                    }),
                  },
                }),
              };
            })}
            data={sortedCrimeReports}
            title="Recent crime reports"
            options={{
              selectableRows: "none",
              filter: false,
              expandableRows: true,
              renderExpandableRow: (rowData, rowMeta) => {
                const crime = sortedCrimeReports[rowMeta.dataIndex];
                const colSpan = rowData.length + 1;
                return (
                  <TableRow>
                    <TableCell colSpan={colSpan}>
                      <Grid
                        width="100%"
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                        padding={1}
                        textAlign="center"
                      >
                        <Grid item width="100%">
                          <Typography fontSize={30} variant="subtitle2">
                            {crime.category}
                          </Typography>
                          <Grid item>
                            <Typography fontSize={18} variant="subtitle2">
                              {crime.month}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              fontSize={18}
                              variant="subtitle2"
                              sx={{ mb: 3 }}
                            >
                              {crime.id}
                            </Typography>
                          </Grid>
                          {crime.context && (
                            <Grid item>
                              <Typography fontSize={18} variant="subtitle2">
                                {crime.context}
                              </Typography>
                            </Grid>
                          )}
                          {crime.outcome_status?.category && (
                            <Grid item>
                              <Typography fontSize={18} variant="subtitle2">
                                {crime.outcome_status.category}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};
export const ForceModal: React.FC<IForceModalProps> = (
  props: IForceModalProps
) => {
  const { closeModal, force } = props;
  const { data, isLoading, error } = useQuery<
    [ICrimeReport[], IPoliceService, IOfficerBio[]]
  >("get-force-info", () =>
    Promise.all([
      ApiServiceProvider.ForceCrimes({ force: force }),
      ApiServiceProvider.GetForceInfo(force),
      ApiServiceProvider.ForceOfficers(force),
    ])
  );
  return error ? (
    <div onLoad={closeModal}></div>
  ) : (
    <Modal
      open
      keepMounted
      onClose={closeModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={style} textAlign="center">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          {isLoading || !data ? (
            <Grid
              item
              sx={{
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
                top: "50%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography fontSize={35} variant="subtitle2">
                Loading...
              </Typography>
            </Grid>
          ) : (
            <Grid item width="100%">
              <ModalAddonFunc reports={data} closeModal={closeModal} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
