import MUIDataTable from "mui-datatables";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { Date } from "../../utils/ExtendedDate";
import { ErrorComp } from "../../common/Error";
import { Grid, TableCell, TableRow } from "@mui/material";
import { StopSearchDisplay } from "./StopSearchDisplay";

interface IStopSearchDataTableProps {
  searchData: IPersonSearch[][];
}
export const StopSearchDataTable: React.FC<IStopSearchDataTableProps> = ({
  searchData,
}) => {
  if (searchData.length < 1) {
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
  const flatData = searchData.flat();
  return (
    <MUIDataTable
      columns={Object.keys(flatData[0]).map((x) => ({
        name: x,
        label: x.replaceAll("_", " ").toUpperCase(),
        options: {
          ...((x === "officer_defined_ethnicity" ||
            x === "operation" ||
            x === "operation_name" ||
            x === "removal_of_more_than_outer_clothing" ||
            x === "location" ||
            x === "object_of_search" ||
            x === "outcome_object" ||
            x === "outcome_linked_to_object_of_search" ||
            x === "legislation" ||
            x === "outcome" ||
            x === "involved_person") && {
            display: false,
          }),
          ...(x === "datetime" && {
            sortCompare: (order) => (a, b) => {
              const [aDay, aMonth, aYear] = a.data.split("/");
              const aDateObject = new Date(
                Number(aYear),
                Number(aMonth) - 1,
                Number(aDay)
              );
              const [bDay, bMonth, bYear] = b.data.split("/");
              const bDateObject = new Date(
                Number(bYear),
                Number(bMonth) - 1,
                Number(bDay)
              );
              return (
                (aDateObject.getTime() - bDateObject.getTime()) *
                (order === "desc" ? 1 : -1)
              );
            },
          }),
        },
      }))}
      data={flatData.map(
        ({
          age_range,
          datetime,
          gender,
          officer_defined_ethnicity,
          operation,
          operation_name,
          self_defined_ethnicity,
          type,
        }) => {
          return {
            age_range,
            datetime: new Date(datetime).getPrettyDate(),
            gender,
            officer_defined_ethnicity,
            operation,
            operation_name,
            self_defined_ethnicity,
            type,
          };
        }
      )}
      title="Search data"
      options={{
        selectableRows: "none",
        sort: true,
        sortOrder: { direction: "asc", name: "datetime" },
        filter: false,
        print: false,
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
          const colSpan = rowData.length + 1;
          const record = flatData[rowMeta.dataIndex];
          return (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <StopSearchDisplay stopSearch={record} />
              </TableCell>
            </TableRow>
          );
        },
      }}
    />
  );
};
