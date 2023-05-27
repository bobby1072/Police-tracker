import { rest } from "msw";
import IAllForce from "../../src/common/ApiTypes/IAllForces";
import ICrimeStreetDates from "../../src/common/ApiTypes/ICrimeStreetDates";
import { MockDataProvider } from "./MockDataProvider";
export const handlers = [
  rest.get<IAllForce[]>("/forces", async (req, res, ctx) => {
    return res(ctx.json(await MockDataProvider.AllForceMock()));
  }),
  rest.get<ICrimeStreetDates[]>(
    "/crimes-street-dates",
    async (req, res, ctx) => {
      return res(ctx.json(await MockDataProvider.StopSearchAvailabilityMock()));
    }
  ),
  rest.get("forces/:force/people", async (req, res, ctx) => {
    return res(ctx.json(await MockDataProvider.OfficerBioMock()));
  }),
];
