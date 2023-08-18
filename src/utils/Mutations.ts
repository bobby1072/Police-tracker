import { useMutation } from "react-query";
import ApiServiceProvider from "./ApiServiceProvider";
import IAllForce from "../common/ApiTypes/IAllForces";
import { AxiosError } from "axios";
import IPersonSearch from "../common/ApiTypes/IPersonSearch";
import ICrimeData from "../common/ApiTypes/ICrimeData";
import { Date } from "./ExtendedDate";
import IAdvancedCrimeData from "../common/ApiTypes/IAdvancedCrimeData";

export const useStopSearchMutate = () =>
  useMutation<IPersonSearch[][], AxiosError, any>(
    ({ force, dates }: { force: IAllForce; dates: Date[] }) =>
      Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      )
  );

export const useCrimeWithLocation = (
  onErrorFunc?: (error: AxiosError) => void
) =>
  useMutation<
    ICrimeData[],
    AxiosError,
    { lat: number; lng: number; date?: Date }
  >(
    ({ lat, lng, date }: { lat: number; lng: number; date?: Date }) =>
      ApiServiceProvider.CrimeWithLocation(lat, lng, date),
    { ...(onErrorFunc && { onError: onErrorFunc }) }
  );

export const useAdvancedCrimeSearch = () =>
  useMutation<IAdvancedCrimeData, AxiosError, { persistentId: string }>(
    ({ persistentId }: { persistentId: string }) =>
      ApiServiceProvider.OutcomeForSpecificCrime(persistentId)
  );
