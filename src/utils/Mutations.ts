import { useMutation } from "react-query";
import ApiServiceProvider from "./ApiServiceProvider";
import IAllForce from "../common/ApiTypes/IAllForces";
import { AxiosError } from "axios";

export const useStopSearchMutate = () => {
  return useMutation<any, AxiosError, any>(
    async ({ force, dates }: { force: IAllForce; dates: Date[] }) =>
      await Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      )
  );
};
