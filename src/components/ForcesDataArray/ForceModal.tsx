import IAllForce from "../../common/ApiTypes/IAllForces";
import Modal from "@mui/material/Modal";
import { Box, Typography, Grid, TableRow, TableCell } from "@mui/material";
import { useQuery } from "react-query";
import ApiServiceProvider from "../../utils/ApiServiceProvider";
import IPoliceService from "../../common/ApiTypes/IPoliceService";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
import MUIDataTable, {
  MUIDataTableColumnDef,
  TableBodyCell,
  TableBodyRow,
} from "mui-datatables";
const style = {
  position: "absolute",
  top: "50%",
  minHeight: "50vh",
  maxHeight: "80vh",
  maxWidth: "100vh",
  minWidth: "100vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
  padding: 2,
  overflowY: "auto",
};
interface IModalAddOnFuncProps {
  reports: [ICrimeReport[], IPoliceService, IOfficerBio[]];
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
  } = props;
  const sortedCrimeReports = crimeReport.sort((a, b) => {
    const [aTimeStamp, bTimeStamp] = [getDate(a.month), getDate(b.month)];
    return aTimeStamp - bTimeStamp;
  });
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={1}
    >
      <Grid item>
        <Typography fontSize={35} variant="subtitle2">
          {policeService.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontSize={25} variant="subtitle2">
          {policeService.id}
        </Typography>
      </Grid>
      {policeService.description && (
        <Grid item>
          <Typography fontSize={15} variant="subtitle2">
            <div
              dangerouslySetInnerHTML={{ __html: policeService.description }}
            />
          </Typography>
        </Grid>
      )}
      <Grid item sx={{ mb: 2 }}>
        <Typography fontSize={15} variant="subtitle2">
          Phone number: {policeService.telephone}
        </Typography>
      </Grid>
      {crimeReport.length > 0 && (
        <Grid item width="100%">
          <MUIDataTable
            columns={Object.keys(sortedCrimeReports[0]).map((x) => {
              return {
                name: x,
                label: x,
                ...(!(x === "category" || x === "month" || x === "id") && {
                  options: {
                    display: "excluded",
                    ...(x === "month" && {
                      sortCompare: (order: string) => (a: any, b: any) => {
                        const [aTimeStamp, bTimeStamp] = [
                          getDate(a.month),
                          getDate(b.month),
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
                console.log(rowData);
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
                        spacing={1}
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
          padding={4}
        >
          {isLoading || !data ? (
            <Grid item>
              <Typography fontSize={35} variant="subtitle2">
                Loading...
              </Typography>
            </Grid>
          ) : (
            <Grid item width="100%">
              <ModalAddonFunc reports={data} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
