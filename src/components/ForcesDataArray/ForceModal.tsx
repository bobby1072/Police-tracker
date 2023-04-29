import IAllForce from "../../common/ApiTypes/IAllForces";
import Modal from "@mui/material/Modal";
import { Box, Typography, Grid } from "@mui/material";
import { useQuery } from "react-query";
import ApiServiceProvider from "../../utils/ApiServiceProvider";
import IPoliceService from "../../common/ApiTypes/IPoliceService";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import IOfficerBio from "../../common/ApiTypes/IOfficerBio";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  minHeight: "35vh",
  minWidth: "40vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "80%",
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
  closeModal: () => void;
}
interface IForceModalProps {
  force: IAllForce;
  closeModal: () => void;
}
const ModalAddonFunc: React.FC<IModalAddOnFuncProps> = (
  props: IModalAddOnFuncProps
) => {
  const {
    closeModal,
    reports: [crimeReport, policeService, officerBio],
  } = props;
  return (
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
          padding={2}
          spacing={1}
        >
          <Grid item>
            <Typography fontSize={35} variant="subtitle2">
              {policeService.name}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
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
  return isLoading || !data || error ? null : (
    <ModalAddonFunc closeModal={closeModal} reports={data} />
  );
};
