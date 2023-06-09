import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import IAllForce from "../../common/ApiTypes/IAllForces";
import { Grid } from "@mui/material";
interface IForcesDataArrayProps {
  forces: IAllForce[];
  setForce: (force?: IAllForce) => void;
}
export const ForcesDataArray: React.FC<IForcesDataArrayProps> = (
  props: IForcesDataArrayProps
) => {
  const { forces, setForce } = props;
  const columns: MUIDataTableColumnDef[] = Object.keys(forces[0])
    .map((x) => {
      return { name: x, label: x.toUpperCase() };
    })
    .reverse();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      direction="column"
      padding={2}
      width="100%"
    >
      <Grid item width="100%">
        <MUIDataTable
          title="Police forces"
          columns={columns}
          data={forces}
          options={{
            selectableRows: "none",
            sortOrder: { direction: "asc", name: "name" },
            filter: false,
            onRowClick: (rowData: string[], rowMeta) => {
              setForce(
                forces.find((x, xIndex) => xIndex === rowMeta.dataIndex)
              );
            },
            print: false,
          }}
        />
      </Grid>
    </Grid>
  );
};
