import IAllForce from "../../common/ApiTypes/IAllForces";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import { useForceCrimeInfoAndOfficers } from "../../utils/Querys";
import { ModalAddonFunc } from "./ForceModalAddOn";
import { Loading } from "../../common/Loading";
import { Date } from "../../utils/ExtendedDate";
const style = {
  position: "absolute",
  top: "50%",
  minHeight: "50vh",
  maxHeight: "80vh",
  minWidth: "150vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#F6F6F6",
  border: "2px solid #000",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};
interface IForceModalProps {
  force: IAllForce;
  closeModal: () => void;
  stopSearchDataAvailable?: Date[];
}
export const ForceModal: React.FC<IForceModalProps> = ({
  closeModal,
  force,
  stopSearchDataAvailable,
}) => {
  const { data, isLoading, error } = useForceCrimeInfoAndOfficers(force);
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
          {isLoading && !data ? (
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
              <Loading />
            </Grid>
          ) : (
            <Grid item width="100%">
              <ModalAddonFunc
                force={force}
                reports={data!}
                closeModal={closeModal}
                stopSearchDataAvailable={stopSearchDataAvailable}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
