import { useMutation, useQueryClient } from "react-query";
import ApiServiceProvider from "./ApiServiceProvider";
import IAllForce from "../common/ApiTypes/IAllForces";
import { AxiosError } from "axios";
import IPersonSearch from "../common/ApiTypes/IPersonSearch";
import ICrimeData from "../common/ApiTypes/ICrimeData";
import { Date } from "./ExtendedDate";
import IAdvancedCrimeData from "../common/ApiTypes/IAdvancedCrimeData";
import Constants from "../common/Constants";

export const useStopSearchMutate = () =>
  useMutation<IPersonSearch[][], AxiosError, any>(
    async ({ force, dates }: { force: IAllForce; dates: Date[] }) =>
      await Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      )
  );

export const useCrimeWithLocation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ICrimeData[],
    AxiosError,
    { lat: number; lng: number; date?: Date }
  >(
    async ({ lat, lng, date }: { lat: number; lng: number; date?: Date }) => {
      const exists = queryClient
        .getMutationCache()
        .find<
          ICrimeData[],
          AxiosError,
          { lat: number; lng: number; date?: Date }
        >({ mutationKey: Constants.MutationKeys.getCrimeWithLocation });
      if (exists?.state.data) {
        return exists.state.data;
      } else return await ApiServiceProvider.CrimeWithLocation(lat, lng, date);
    },
    { mutationKey: Constants.MutationKeys.getCrimeWithLocation }
  );
};

export const useAdvancedCrimeSearch = () => {
  const queryClient = useQueryClient();
  return useMutation<IAdvancedCrimeData, AxiosError, { persistentId: string }>(
    async ({ persistentId }: { persistentId: string }) => {
      const exists = queryClient
        .getMutationCache()
        .find<IAdvancedCrimeData, AxiosError, { persistentId: string }>({
          mutationKey: Constants.MutationKeys.getAdvancedCrimeData,
        });
      if (exists?.state.data) {
        return exists.state.data;
      } else
        return await ApiServiceProvider.OutcomeForSpecificCrime(persistentId);
    },
    { mutationKey: Constants.MutationKeys.getAdvancedCrimeData }
  );
};
