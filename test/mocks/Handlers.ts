import { rest } from "msw";
import IAllForce from "../../common/ApiTypes/IAllForces";
export const handlers = [
  rest.get<IAllForce[]>("/forces", (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
