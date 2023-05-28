import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen } from "../../../test/utils/test-utils";
import Constants from "../../common/Constants";
import { Date } from "../../utils/ExtendedDate";
import { ForceModal } from "./ForceModal";
const reactQuery = require("react-query");
describe("ForceModal", () => {
  const closeModalFunc = jest.fn();
  it("Check renders", async () => {
    render(
      <ForceModal
        closeModal={closeModalFunc}
        force={await MockDataProvider.SingleForceMock()}
      />
    );
    expect(screen.getByLabelText("forceModal")).toBeInTheDocument();
  });
  it("Checks useQuery call", async () => {
    const useQueryMock = jest.spyOn(reactQuery, "useQuery");
    render(
      <ForceModal
        closeModal={closeModalFunc}
        force={await MockDataProvider.SingleForceMock()}
      />
    );
    expect(useQueryMock).toHaveBeenCalled();
    expect(useQueryMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function),
      expect.any(Object)
    );
    expect(useQueryMock.mock.calls[0][0]).toEqual(
      Constants.QueryKeys.getForceInfo
    );
    useQueryMock.mockRestore();
  });
  it("Checks accordions", async () => {
    render(
      <ForceModal
        closeModal={closeModalFunc}
        force={await MockDataProvider.SingleForceMock()}
        stopSearchDataAvailable={[new Date()]}
      />
    );
    expect(screen.getByLabelText("officerBioAccordion")).toBeInTheDocument();
    expect(screen.getByLabelText("stopSearchAccordion")).toBeInTheDocument();
    expect(screen.getByLabelText("crimeReportAccordion")).toBeInTheDocument();
  });
});
