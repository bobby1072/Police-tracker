import { useMutation } from "react-query";
import ApiServiceProvider from "./ApiServiceProvider";
import IAllForce from "../common/ApiTypes/IAllForces";
import { AxiosError } from "axios";
import IPersonSearch from "../common/ApiTypes/IPersonSearch";
import ICrimeData from "../common/ApiTypes/ICrimeData";

export const useStopSearchMutate = () => {
  return useMutation<IPersonSearch[][], AxiosError, any>(
    async ({ force, dates }: { force: IAllForce; dates: Date[] }) =>
      await Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      )
  );
};

export const useCrimeWithLocation = () => {
  return useMutation<
    ICrimeData[],
    AxiosError,
    { lat: number; lng: number; date?: Date }
  >(
    async ({ lat, lng, date }: { lat: number; lng: number; date?: Date }) =>
      await ApiServiceProvider.CrimeWithLocation(lat, lng, date)
  );
};
