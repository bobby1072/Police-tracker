import userEvent from "@testing-library/user-event";
import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen, waitFor } from "../../../test/utils/test-utils";
import { CrimeDisplay } from "./CrimeDisplay";
import ICrimeData from "../../common/ApiTypes/ICrimeData";
describe("CrimeDisplay", () => {
  let crime: ICrimeData;
  beforeAll(async () => {
    crime = await MockDataProvider.SingleCrimeData();
  });
  it("Checks persistent Id to show on click", async () => {
    render(<CrimeDisplay crime={crime} />);
    expect(screen.queryByText(crime.persistent_id)).not.toBeInTheDocument();
    userEvent.click(screen.getByLabelText("togglePersitentId"));
    await waitFor(() => {
      expect(screen.getByText(crime.persistent_id)).toBeInTheDocument();
    });
  });
  it("Check all other relavent details are shown", async () => {
    render(<CrimeDisplay crime={crime} />);
    expect(screen.getByText(crime.category)).toBeInTheDocument();
    expect(screen.getByText(`Id: ${crime.id}`)).toBeInTheDocument();
    expect(screen.getByText(crime.context)).toBeInTheDocument();
    expect(screen.getByText(`Month: ${crime.month}`)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(crime.location.street.name)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(crime.outcome_status.category)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(crime.outcome_status.date)
    ).toBeInTheDocument();
  });
});
