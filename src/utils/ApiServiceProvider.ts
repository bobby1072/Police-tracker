import axios from "axios";
import allForces from "../common/AllForces.json";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import Constants from "../common/Constants";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import ICrimeData from "../common/ApiTypes/ICrimeData";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ICrimeStreetDates from "../common/ApiTypes/ICrimeStreetDates";
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
  private static _forceExist(force: IAllForce): IAllForce {
    const foundForce = this._allForces.find(
      (x) => x.id === force.id || x.name === force.name
    );
    if (!foundForce) {
      throw new Error(Constants.invalidForce);
    }
    return foundForce;
  }
  public static async GetForceInfo(force: IAllForce): Promise<IPoliceService> {
    const foundForce = this._forceExist(force);
    const request = await this._httpClient.get<IPoliceService>(
      `forces/${foundForce.id}`
    );
    return request.data;
  }
  public static async CrimeWithLocation(
    date: Date,
    lat: number,
    lng: number
  ): Promise<ICrimeData[]> {
    const request = await this._httpClient.get<ICrimeData[]>(
      `crimes-at-location?date=${this._fixDate(date)}&lat=${lat}&lng=${lng}`
    );
    return request.data;
  }
  public static async ForceCrimes({
    force,
    crime,
    date,
  }: {
    force: IAllForce;
    crime?: string;
    date?: Date;
  }): Promise<ICrimeReport[]> {
    const foundForce = this._forceExist(force);
    const request = await this._httpClient.get<ICrimeReport[]>(
      `crimes-no-location?category=${crime ? crime : "all-crime"}&force=${
        foundForce.id
      }${date ? `&date=${this._fixDate(date)}` : ""}`
    );
    return request.data;
  }
  public static async ForceOfficers(force: IAllForce): Promise<IOfficerBio[]> {
    const foundForce = this._forceExist(force);
    const request = await this._httpClient.get<IOfficerBio[]>(
      `forces/${foundForce.id}/people`
    );
    return request.data;
  }
  public static async ForceStopSearches(force: IAllForce, date: Date) {
    const foundForce = this._forceExist(force);
    const request = await this._httpClient.get(
      `stops-force?force=${foundForce.id}&date=${this._fixDate(date)}`
    );
    return request.data;
  }
  public static async ForceStopSearchAvailability(): Promise<
    ICrimeStreetDates[]
  > {
    const request = await this._httpClient.get<ICrimeStreetDates[]>(
      "crimes-street-dates"
    );
    return request.data;
  }
}
