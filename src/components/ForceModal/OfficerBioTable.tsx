import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
interface IOfficerBioTableProps {
  officerBio: IOfficerBio[];
}
export const OfficerBioTable: React.FC<IOfficerBioTableProps> = ({
  officerBio,
}) => {
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
    <MUIDataTable
      title="Officers"
      columns={Object.keys(officerBio[0]).map((x) => {
        return {
          name: x,
          label: x.toUpperCase(),
          ...(!(x === "name" || x === "rank") && {
            options: { display: "excluded" },
          }),
        };
      })}
      data={muiData}
      options={{
        selectableRows: "none",
        filter: false,
        print: false,
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
                        <Typography fontSize={30} variant="subtitle2">
                          Name: {x.name}
                        </Typography>
                      </Grid>
                    )}
                    {x.rank && (
                      <Grid item>
                        <Typography fontSize={25} variant="subtitle2">
                          Rank: {x.rank}
                        </Typography>
                      </Grid>
                    )}
                    {x.bio && (
                      <Grid item>
                        <Typography fontSize={15} variant="subtitle2">
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
  );
};
