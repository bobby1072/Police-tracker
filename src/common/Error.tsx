import { AxiosError } from "axios";
import { Typography } from "@mui/material";
interface IErrorProps {
  error: Error | AxiosError;
}
export const ErrorComp: React.FC<IErrorProps> = ({ error }) => {
  return (
    <Typography
      fontSize={35}
      variant="subtitle2"
      textAlign="center"
      color="error"
    >
      {error.message}
    </Typography>
  );
};
