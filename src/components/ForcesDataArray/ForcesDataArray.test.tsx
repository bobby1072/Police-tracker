import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen } from "../../../test/utils/test-utils";
import { ForcesDataArray } from "./ForcesDataArray";

describe("ForcesDataArray", () => {
  const setForce = jest.fn();
  it("check mui-datatable renders", async () => {
    const allForces = await MockDataProvider.AllForceMock();
    render(<ForcesDataArray forces={allForces} setForce={setForce} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
