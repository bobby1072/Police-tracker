import { useQuery } from "react-query";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ApiServiceProvider from "./ApiServiceProvider";
import { AxiosError } from "axios";
import ICrimeStreetDates from "../common/ApiTypes/ICrimeStreetDates";

export const useForceCrimeInfoAndOfficers = (force: IAllForce) => {
  return useQuery<[ICrimeReport[], IPoliceService, IOfficerBio[]], AxiosError>(
    "get-force-info",
    () =>
      Promise.all([
        ApiServiceProvider.ForceCrimes({ force: force }),
        ApiServiceProvider.GetForceInfo(force),
        ApiServiceProvider.ForceOfficers(force),
      ])
  );
};

export const useForceStopAndSearch = (force: IAllForce, dates: Date[]) => {
  return useQuery<any[], AxiosError>(
    "get-stop-search-info",
    () =>
      Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      ),
    {
      retry: (count, error) => (error.response?.status === 502 ? false : true),
    }
  );
};

export const useStopSearchAvailability = () => {
  return useQuery<ICrimeStreetDates[], AxiosError>(
    "get-stop-search-availability",
    () => ApiServiceProvider.ForceStopSearchAvailability(),
    {
      retry: () => false,
    }
  );
};
