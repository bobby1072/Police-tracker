import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { getDate } from "./ForceModalAddOn";
interface ICrimeTableProps {
  sortedCrimeReports: ICrimeReport[];
}
export const CrimeTable: React.FC<ICrimeTableProps> = ({
  sortedCrimeReports,
}) => {
  return (
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
        print: false,
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
  );
};
