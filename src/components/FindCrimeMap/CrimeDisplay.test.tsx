import userEvent from "@testing-library/user-event";
import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { CrimeDisplay } from "./CrimeDisplay";

describe("CrimeDisplay", () => {
  it("Checks title render", async () => {
    const crime = await MockDataProvider.SingleCrimeData();
    render(<CrimeDisplay crime={crime} />);
    expect(screen.getByText(crime.category)).toBeInTheDocument();
  });
  it("Checks persistent Id to show on click", async () => {
    const crime = await MockDataProvider.SingleCrimeData();
    render(<CrimeDisplay crime={crime} />);
    expect(screen.queryByText(crime.persistent_id)).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("togglePersitentId"));
    await waitFor(() => {
      expect(screen.getByText(crime.persistent_id)).toBeInTheDocument();
    });
  });
});
