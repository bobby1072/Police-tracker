enum QueryKeys {
  getForceInfo = "get-force-info",
  getStopSearchInfo = "get-stop-search-info",
  getStopSearchAvailability = "get-stop-search-availability",
  getAllForces = "get-all-forces",
  getForceCrimesWithDate = "get-force-crimes-with-date",
  getCrimeLastUpdated = "get-crime-last-updated",
}
enum MutationKeys {
  getAdvancedCrimeData = "get-advanced-crime-data",
  getCrimeWithLocation = "get-crime-with-location",
}
export default abstract class Constants {
  public static invalidForce: string = "That force does not exist";
  public static QueryKeys: typeof QueryKeys = QueryKeys;
  public static MutationKeys: typeof MutationKeys = MutationKeys;
}
