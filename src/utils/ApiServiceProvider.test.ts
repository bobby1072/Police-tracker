import { MockDataProvider } from "../../test/mocks/MockDataProvider";
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
  });
});
