import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../test/utils/test-utils";
import { ForceLocater } from "./ForceLocater";
import Constants from "../common/Constants";
const reactQuery = require("react-query");
describe("ForceLocater", () => {
  it("test page render", async () => {
    render(<ForceLocater />);
    expect(screen.getByLabelText("forceLocaterPage")).toBeInTheDocument();
  });
  it("test useQuery call", async () => {
    const useQueryMock = jest.spyOn(reactQuery, "useQuery");
    render(<ForceLocater />);
    expect(useQueryMock).toHaveBeenCalledTimes(2);
    expect(useQueryMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function),
      expect.any(Object)
    );
    expect(useQueryMock.mock.calls[0][0]).toEqual(
      Constants.QueryKeys.getAllForces
    );
    expect(useQueryMock.mock.calls[1][0]).toEqual(
      Constants.QueryKeys.getStopSearchAvailability
    );
    useQueryMock.mockRestore();
  });
  it("you can change the display option", async () => {
    const useQueryMock = jest.spyOn(reactQuery, "useQuery");
    render(<ForceLocater />);
    expect(useQueryMock).toHaveReturnedTimes(2);
    const gridTab = screen.getByLabelText("gridViewForces");
    const dataTab = screen.getByLabelText("dataViewForces");
    expect(gridTab).toHaveAttribute("aria-selected", "true");
    expect(dataTab).toHaveAttribute("aria-selected", "false");
    userEvent.click(dataTab);
    await waitFor(() => {
      expect(gridTab).toHaveAttribute("aria-selected", "false");
    });
    await waitFor(() => {
      expect(dataTab).toHaveAttribute("aria-selected", "true");
    });
  });
});
