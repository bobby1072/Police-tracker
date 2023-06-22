import userEvent from "@testing-library/user-event";
import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import ICrimeData from "../../common/ApiTypes/ICrimeData";
import ICrimeReport from "../../common/ApiTypes/ICrimeReport";
import { CrimeDisplay } from "./CrimeDisplay";
describe("CrimeDisplay", () => {
  let advancedCrime: ICrimeData;
  let regularCrime: ICrimeReport;
  beforeAll(async () => {
    const [reg, advanced] = await Promise.all([
      MockDataProvider.SingleCrimeReport(),
      MockDataProvider.SingleCrimeData(),
    ]);
    regularCrime = reg;
    advancedCrime = advanced;
  });
  it("Checks persistent Id to show on click", async () => {
    render(<CrimeDisplay crime={regularCrime} />);
    expect(
      screen.queryByText(regularCrime.persistent_id)
    ).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("togglePersitentId"));
    await waitFor(() => {
      expect(
        screen.getByDisplayValue(regularCrime.persistent_id)
      ).toBeInTheDocument();
    });
  });
});
