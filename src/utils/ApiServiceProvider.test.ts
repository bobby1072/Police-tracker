import { MockDataProvider } from "../../test/mocks/MockDataProvider";
import IPoliceService from "../common/ApiTypes/IPoliceService";
import ApiServiceProvider from "./ApiServiceProvider";

describe("ApiServiceProvider", () => {
  it("Check all force", async () => {
    const response = await ApiServiceProvider.GetAllForces();
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check crime street dates", async () => {
    const response = await ApiServiceProvider.ForceStopSearchAvailability();
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check officerbio", async () => {
    const response = await ApiServiceProvider.ForceOfficers(
      await MockDataProvider.SingleForceMock()
    );
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check crime report", async () => {
    const response = await ApiServiceProvider.ForceCrimes({
      force: await MockDataProvider.SingleForceMock(),
    });
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check police service information", async () => {
    const response = await ApiServiceProvider.GetForceInfo(
      await MockDataProvider.SingleForceMock()
    );
    expect(response).not.toBeNull();
    const objSplit = Object.entries(response);
    expect(objSplit.length).toBeGreaterThanOrEqual(1);
    objSplit.forEach(([key, val]) => {
      expect(Boolean(key)).toBe(true);
    });
  });
});
