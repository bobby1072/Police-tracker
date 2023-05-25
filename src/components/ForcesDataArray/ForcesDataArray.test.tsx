import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { ForcesDataArray } from "./ForcesDataArray";

describe("ForcesDataArray", () => {
  const allForces = MockDataProvider.AllForceMock();
  const setForce = jest.fn();
  it("check mui-datatable renders", async () => {
    render(<ForcesDataArray forces={allForces} setForce={setForce} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });
});
