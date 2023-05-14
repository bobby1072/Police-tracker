import { AxiosError } from "axios";
import { Typography } from "@mui/material";
interface IErrorProps {
  error: Error | AxiosError;
}
export const Error: React.FC<IErrorProps> = ({ error }) => {
  return (
    <Typography fontSize={35} variant="subtitle2" textAlign="center">
      {error.message}
    </Typography>
  );
};
