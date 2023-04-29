import axios from "axios";
import allForces from "../common/AllForces.json";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import Constants from "../common/Constants";
import IPoliceService from "../common/ApiTypes/IPoliceService";
export default abstract class ApiServiceProvider {
  private static _httpClient = axios.create({
    baseURL: "https://data.police.uk/api",
  });
  private static _allForces: IAllForce[] = allForces;
  private static _fixDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month}`;
  }
  private static _forceExist(force: IAllForce): boolean {
    return Boolean(
      this._allForces.find((x) => x.id === force.id && x.name === force.name)
    );
  }
  public static async GetForceInfo(force: IAllForce): Promise<IPoliceService> {
    if (!this._forceExist(force)) {
      throw new Error(Constants.invalidForce);
    }
    const request = await this._httpClient.get<IPoliceService>(
      `forces/${force.id}`
    );
    return request.data;
  }
  public static async ForceCrimes(
    force: IAllForce,
    crime?: string
  ): Promise<ICrimeReport[]> {
    if (!this._forceExist(force)) {
      throw new Error(Constants.invalidForce);
    }
    const request = await this._httpClient.get<ICrimeReport[]>(
      `crimes-no-location?category=${crime ? crime : "all-crime"}&force=${
        force.id
      }`
    );
    return request.data;
  }
}
