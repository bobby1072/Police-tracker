import axios from "axios";
import IAllForce from "../common/ApiTypes/IAllForces";
import ICrimeReport from "../common/ApiTypes/ICrimeReport";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import ICrimeData from "../common/ApiTypes/ICrimeData";
import IOfficerBio from "../common/ApiTypes/IOfficerBio";
import ICrimeStreetDates from "../common/ApiTypes/ICrimeStreetDates";
export default abstract class ApiServiceProvider {
  private static _httpClient = axios.create({
    baseURL: "https://data.police.uk/api",
  });
  private static _fixDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month}`;
  }
  public static async GetAllForces(): Promise<IAllForce[]> {
    const request = await this._httpClient.get<IAllForce[]>("forces");
    return request.data;
  }
  public static async GetForceInfo(force: IAllForce): Promise<IPoliceService> {
    const request = await this._httpClient.get<IPoliceService>(
      `forces/${force.id}`
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
    const request = await this._httpClient.get<ICrimeReport[]>(
      `crimes-no-location?category=${crime ? crime : "all-crime"}&force=${
        force.id
      }${date ? `&date=${this._fixDate(date)}` : ""}`
    );
    return request.data;
  }
  public static async ForceOfficers(force: IAllForce): Promise<IOfficerBio[]> {
    const request = await this._httpClient.get<IOfficerBio[]>(
      `forces/${force.id}/people`
    );
    return request.data;
  }
  public static async ForceStopSearches(force: IAllForce, date: Date) {
    const request = await this._httpClient.get(
      `stops-force?force=${force.id}&date=${this._fixDate(date)}`
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
