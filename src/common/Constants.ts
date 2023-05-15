export default abstract class Constants {
  public static invalidForce: string = "That force does not exist";
  public static QueryKeys: { [queryKey: string]: string } = {
    getForceInfo: "get-force-info",
    getStopSearchInfo: "get-stop-search-info",
    getStopSearchAvailability: "get-stop-search-availability",
    getAllForces: "get-all-forces",
  };
}
