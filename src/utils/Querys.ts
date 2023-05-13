import { useQuery } from "react-query";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ApiServiceProvider from "./ApiServiceProvider";

export const useForceCrimeInfoAndOfficers = (force: IAllForce) => {
  return useQuery<[ICrimeReport[], IPoliceService, IOfficerBio[]]>(
    "get-force-info",
    () =>
      Promise.all([
        ApiServiceProvider.ForceCrimes({ force: force }),
        ApiServiceProvider.GetForceInfo(force),
        ApiServiceProvider.ForceOfficers(force),
      ])
  );
};
