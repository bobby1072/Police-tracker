import { useQuery } from "react-query";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ApiServiceProvider from "./ApiServiceProvider";
import { AxiosError } from "axios";
import ICrimeStreetDates from "../common/ApiTypes/ICrimeStreetDates";
import Constants from "../common/Constants";
import IPersonSearch from "../common/ApiTypes/IPersonSearch";

export const useAllForces = () => {
  return useQuery<IAllForce[], AxiosError>(
    Constants.QueryKeys.getAllForces,
    () => ApiServiceProvider.GetAllForces(),
    {
      retry: (failureCount, error) => failureCount >= 5,
    }
  );
};

export const useForceCrimeInfoAndOfficers = (force: IAllForce) => {
  return useQuery<[ICrimeReport[], IPoliceService, IOfficerBio[]], AxiosError>(
    Constants.QueryKeys.getForceInfo,
    () =>
      Promise.all([
        ApiServiceProvider.ForceCrimes({ force: force }),
        ApiServiceProvider.GetForceInfo(force),
        ApiServiceProvider.ForceOfficers(force),
      ]),
    {
      retry: (count, error) =>
        error.response?.status === 502 ||
        error.response?.status === 429 ||
        count >= 5
          ? false
          : true,
    }
  );
};

export const useForceStopAndSearch = (force: IAllForce, dates: Date[]) => {
  return useQuery<IPersonSearch[][], AxiosError>(
    Constants.QueryKeys.getStopSearchInfo,
    () =>
      Promise.all(
        dates.map((x) => ApiServiceProvider.ForceStopSearches(force, x))
      ),
    {
      retry: (count, error) =>
        error.response?.status === 502 ||
        error.response?.status === 429 ||
        count >= 5
          ? false
          : true,
    }
  );
};

export const useStopSearchAvailability = () => {
  return useQuery<ICrimeStreetDates[], AxiosError>(
    Constants.QueryKeys.getStopSearchAvailability,
    () => ApiServiceProvider.ForceStopSearchAvailability(),
    {
      retry: (count, error) =>
        error.response?.status === 502 ||
        error.response?.status === 429 ||
        count >= 5
          ? false
          : true,
    }
  );
};
