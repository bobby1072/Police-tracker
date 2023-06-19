import { useQuery, useQueryClient } from "react-query";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ApiServiceProvider from "./ApiServiceProvider";
import { AxiosError } from "axios";
import ICrimeStreetDates from "../common/ApiTypes/ICrimeStreetDates";
import Constants from "../common/Constants";
import IPersonSearch from "../common/ApiTypes/IPersonSearch";
import { fixDate } from "../components/ForceModal/ForceStopSearchData";
import { Date } from "./ExtendedDate";
const generalRetryFunc = (count: number, error: AxiosError<unknown, any>) =>
  Number(error.response?.status) >= 400 || count >= 3 ? false : true;

export const useAllForces = () => {
  const queryClient = useQueryClient();
  return useQuery<IAllForce[], AxiosError>(
    Constants.QueryKeys.getAllForces,
    async () => {
      const exists = queryClient.getQueryData<IAllForce[]>(
        Constants.QueryKeys.getAllForces
      );
      if (exists) {
        return exists;
      } else {
        return await ApiServiceProvider.GetAllForces();
      }
    },
    {
      retry: generalRetryFunc,
      onSuccess: (data) => {
        return data.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      },
    }
  );
};

export const useForceCrimeInfoAndOfficers = (force: IAllForce) => {
  const queryClient = useQueryClient();
  return useQuery<[ICrimeReport[], IPoliceService, IOfficerBio[]], AxiosError>(
    Constants.QueryKeys.getForceInfo,
    async () => {
      const exists = queryClient.getQueryData<
        [ICrimeReport[], IPoliceService, IOfficerBio[]]
      >(Constants.QueryKeys.getForceInfo);
      if (exists) {
        return exists;
      } else {
        return await Promise.all([
          ApiServiceProvider.ForceCrimes({ force: force }),
          ApiServiceProvider.GetForceInfo(force),
          ApiServiceProvider.ForceOfficers(force),
        ]);
      }
    },
    {
      retry: generalRetryFunc,
    }
  );
};

export const useForceCrimes = (
  force: IAllForce,
  dates: Date[],
  onSuccessFunc?: (data: ICrimeReport[][]) => void,
  fetchedData?: ICrimeReport[][]
) => {
  return useQuery<ICrimeReport[][], AxiosError>(
    Constants.QueryKeys.getForceCrimesWithDate,
    async () => {
      fetchedData = fetchedData || [];
      const existingDates = fetchedData.map(
        (x) => new Date(fixDate(new Date(x[0].month)))
      );

      const filteredExistingData = fetchedData.filter((data) => {
        const dataDate = new Date(fixDate(new Date(data[0].month)));
        const dataDateOnly = new Date(
          dataDate.getFullYear(),
          dataDate.getMonth(),
          dataDate.getDate()
        );
        return dates.some((date) => {
          const dateOnly = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          return dataDateOnly.getTime() === dateOnly.getTime();
        });
      });

      const filteredDatesArray = dates.filter((x) => {
        const check = !existingDates.some((deepX) => {
          const deepXDate = new Date(
            deepX.getFullYear(),
            deepX.getMonth(),
            deepX.getDate()
          );
          const xDate = new Date(x.getFullYear(), x.getMonth(), x.getDate());
          return deepXDate.getTime() === xDate.getTime();
        });
        return check;
      });

      const newData =
        filteredDatesArray.length >= 1
          ? await Promise.all(
              filteredDatesArray.map((x) =>
                ApiServiceProvider.ForceCrimes({ force, date: x })
              )
            )
          : [];

      return [...filteredExistingData, ...newData];
    },
    {
      retry: generalRetryFunc,
      ...(onSuccessFunc && { onSuccess: onSuccessFunc }),
    }
  );
};

export const useForceStopAndSearch = (
  force: IAllForce,
  dates: Date[],
  onSuccessFunc?: (data: IPersonSearch[][]) => void,
  fetchedData?: IPersonSearch[][]
) => {
  return useQuery<IPersonSearch[][], AxiosError>(
    Constants.QueryKeys.getStopSearchInfo,
    async () => {
      fetchedData = fetchedData || [];
      const existingDates = fetchedData.map(
        (x) => new Date(fixDate(new Date(x[0].datetime)))
      );

      const filteredExistingData = fetchedData.filter((data) => {
        const dataDate = new Date(fixDate(new Date(data[0].datetime)));
        const dataDateOnly = new Date(
          dataDate.getFullYear(),
          dataDate.getMonth(),
          dataDate.getDate()
        );
        return dates.some((date) => {
          const dateOnly = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          return dataDateOnly.getTime() === dateOnly.getTime();
        });
      });

      const filteredDatesArray = dates.filter((x) => {
        const check = !existingDates.some((deepX) => {
          const deepXDate = new Date(
            deepX.getFullYear(),
            deepX.getMonth(),
            deepX.getDate()
          );
          const xDate = new Date(x.getFullYear(), x.getMonth(), x.getDate());
          return deepXDate.getTime() === xDate.getTime();
        });
        return check;
      });

      const newData =
        filteredDatesArray.length >= 1
          ? await Promise.all(
              filteredDatesArray.map((x) =>
                ApiServiceProvider.ForceStopSearches(force, x)
              )
            )
          : [];

      return [...filteredExistingData, ...newData];
    },
    {
      retry: generalRetryFunc,
      ...(onSuccessFunc && { onSuccess: onSuccessFunc }),
    }
  );
};

export const useStopSearchAvailability = () => {
  const queryClient = useQueryClient();
  return useQuery<ICrimeStreetDates[], AxiosError>(
    Constants.QueryKeys.getStopSearchAvailability,
    async () => {
      const exists = queryClient.getQueryData<ICrimeStreetDates[]>(
        Constants.QueryKeys.getStopSearchAvailability
      );
      if (exists) {
        return exists;
      } else {
        return await ApiServiceProvider.ForceStopSearchAvailability();
      }
    },
    {
      retry: generalRetryFunc,
    }
  );
};
