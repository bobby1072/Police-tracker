import MUIDataTable from "mui-datatables";
import IPersonSearch from "../../common/ApiTypes/IPersonSearch";
import { Date } from "../../utils/ExtendedDate";

interface IStopSearchDataTableProps {
  searchData?: IPersonSearch[][];
  disabled?: boolean;
}
export const StopSearchDataTable: React.FC<IStopSearchDataTableProps> = ({
  searchData,
  disabled,
}) => {
  if (disabled || !searchData) {
    return null;
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
            display: "excluded",
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
          const newDatetime = new Date(datetime).getPrettyDate();
          return {
            age_range,
            datetime: newDatetime,
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
        expandableRows: false,
      }}
    />
  );
};
