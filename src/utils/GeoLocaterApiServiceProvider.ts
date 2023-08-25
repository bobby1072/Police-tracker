import axios from "axios";
import { IGeoLocateReverseData } from "../common/ApiTypes/IGeoLocateReverseData";
import { DeepPartial } from "./DeepPartial";

export default abstract class GeoLocaterApiServiceProvider {
  private static readonly _httpClient = axios.create({
    baseURL: process.env.NODE_ENV === "test" ? "" : "https://geocode.maps.co/",
  });
  public static async ReverseLocate({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }): Promise<DeepPartial<IGeoLocateReverseData>> {
    const request = await this._httpClient.get<
      DeepPartial<IGeoLocateReverseData>
    >(`reverse/lat=${lat}&lon=${lng}`);
    return request.data;
  }
}
