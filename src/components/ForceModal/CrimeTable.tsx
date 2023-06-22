import { Grid, TableCell, TableRow } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { Date } from "../../utils/ExtendedDate";
import { ErrorComp } from "../../common/Error";
import { CrimeDisplay } from "../FindCrimeMap/CrimeDisplay";
interface ICrimeTableProps {
  sortedCrimeReports: ICrimeReport[][];
}
export const CrimeTable: React.FC<ICrimeTableProps> = ({
  sortedCrimeReports,
}) => {
  if (sortedCrimeReports.length < 1) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        padding={5}
      >
        <Grid item>
          <ErrorComp error={new Error("No selected dates")} />
        </Grid>
      </Grid>
    );
  }
  const flatData = sortedCrimeReports.flat();
  return (
    <MUIDataTable
      columns={Object.keys(flatData[0]).map((x) => {
        return {
          name: x,
          label: x.toUpperCase(),
          ...(!(x === "category" || x === "id") && {
            options: {
              display: x === "month" ? true : false,
              ...(x === "month" && {
                sortCompare: (order: string) => (a: any, b: any) => {
                  const [aTimeStamp, bTimeStamp] = [
                    Date.getNumberDate(a.data),
                    Date.getNumberDate(b.data),
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
      data={flatData}
      title="Recent crime reports"
      options={{
        print: false,
        selectableRows: "none",
        filter: false,
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
          const crime = flatData[rowMeta.dataIndex];
          const colSpan = rowData.length + 1;
          return (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <CrimeDisplay crime={crime} />
              </TableCell>
            </TableRow>
          );
        },
      }}
    />
  );
};
