import { MockDataProvider } from "../../test/mocks/MockDataProvider";
import IAllForce from "../common/ApiTypes/IAllForces";
import ApiServiceProvider from "./ApiServiceProvider";

describe("ApiServiceProvider", () => {
  let singleForce: IAllForce;
  beforeAll(async () => {
    singleForce = await MockDataProvider.SingleForceMock();
  });
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
    const response = await ApiServiceProvider.ForceOfficers(singleForce);
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check crime report", async () => {
    const response = await ApiServiceProvider.ForceCrimes({
      force: singleForce,
    });
    expect(response).not.toBeNull();
    expect(Array.isArray(response)).toBe(true);
  });
  it("Check police service information", async () => {
    const response = await ApiServiceProvider.GetForceInfo(singleForce);
    expect(response).not.toBeNull();
    const objSplit = Object.entries(response);
    expect(objSplit.length).toBeGreaterThanOrEqual(1);
    objSplit.forEach(([key, val]) => {
      expect(Boolean(key)).toBe(true);
    });
  });
});
