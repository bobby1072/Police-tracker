import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { ForcesDataArray } from "./ForcesDataArray";

describe("ForcesDataArray", () => {
  const allForces = MockDataProvider.AllForceMock();
  const setForce = jest.fn();
  it("check mui-datatable renders", async () => {
    render(<ForcesDataArray forces={allForces} setForce={setForce} />);
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });
  it("check first 10 options", async () => {
    render(<ForcesDataArray forces={allForces} setForce={setForce} />);
    const table = screen.getByRole("grid");
    const text = table.childNodes;
    text.forEach((x) => {
      console.log(x);
    });
  });
});
