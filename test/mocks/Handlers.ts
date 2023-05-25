import { rest } from "msw";
import IAllForce from "../../src/common/ApiTypes/IAllForces";
import ICrimeStreetDates from "../../src/common/ApiTypes/ICrimeStreetDates";
import { MockDataProvider } from "./MockDataProvider";
export const handlers = [
  rest.get<IAllForce[]>("/forces", (req, res, ctx) => {
    return res(ctx.json(MockDataProvider.AllForceMock()));
  }),
  rest.get<ICrimeStreetDates[]>("/crime-street-dates", (req, res, ctx) => {
    return res(ctx.json(MockDataProvider.StopSearchAvailabilityMock()));
  }),
];
