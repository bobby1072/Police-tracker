import { rest } from "msw";
import IAllForce from "../../src/common/ApiTypes/IAllForces";
import ICrimeStreetDates from "../../src/common/ApiTypes/ICrimeStreetDates";
import { MockDataProvider } from "./MockDataProvider";
import IOfficerBio from "../../src/common/ApiTypes/IOfficerBio";
import ICrimeReport from "../../src/common/ApiTypes/ICrimeReport";
import IPoliceService from "../../src/common/ApiTypes/IPoliceService";
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
  rest.get<IOfficerBio[]>("forces/:force/people", async (req, res, ctx) => {
    return res(ctx.json(await MockDataProvider.OfficerBioMock()));
  }),
  rest.get<ICrimeReport[]>(
    `crimes-no-location?:category&:force`,
    async (req, res, ctx) => {
      return res(ctx.json(await MockDataProvider.CrimeReportMock()));
    }
  ),
  rest.get<IPoliceService>("forces/:force", async (req, res, ctx) => {
    return res(
      ctx.json(
        await MockDataProvider.PoliceServiceMock(
          await MockDataProvider.SingleForceMock()
        )
      )
    );
  }),
];
