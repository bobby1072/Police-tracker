enum QueryKeys {
  getForceInfo = "get-force-info",
  getStopSearchInfo = "get-stop-search-info",
  getStopSearchAvailability = "get-stop-search-availability",
  getAllForces = "get-all-forces",
}
export default abstract class Constants {
  public static invalidForce: string = "That force does not exist";
  public static QueryKeys: typeof QueryKeys = QueryKeys;
}
