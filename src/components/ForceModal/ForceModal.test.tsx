import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { render, screen } from "../../../test/utils/test-utils";
import IAllForce from "../../common/ApiTypes/IAllForces";
import Constants from "../../common/Constants";
import { Date } from "../../utils/ExtendedDate";
import { ForceModal } from "./ForceModal";
const reactQuery = require("react-query");
describe("ForceModal", () => {
  const closeModalFunc = jest.fn();
  let singleForce: IAllForce;
  beforeAll(async () => {
    singleForce = await MockDataProvider.SingleForceMock();
  });
  it("Check renders", async () => {
    render(<ForceModal closeModal={closeModalFunc} force={singleForce} />);
    expect(screen.getByLabelText("forceModal")).toBeInTheDocument();
  });
  it("Checks useQuery call", async () => {
    const useQueryMock = jest.spyOn(reactQuery, "useQuery");
    render(<ForceModal closeModal={closeModalFunc} force={singleForce} />);
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
        force={singleForce}
        stopSearchDataAvailable={[new Date()]}
      />
    );
    expect(screen.getByLabelText("officerBioAccordion")).toBeInTheDocument();
    expect(screen.getByLabelText("stopSearchAccordion")).toBeInTheDocument();
    expect(screen.getByLabelText("crimeReportAccordion")).toBeInTheDocument();
  });
  it("Checks useQuery error", async () => {
    const useQueryMock = jest.spyOn(reactQuery, "useQuery");
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: MockDataProvider.ExampleAxiosError,
    });
    render(<ForceModal closeModal={closeModalFunc} force={singleForce} />);
    expect(
      screen.getByText(MockDataProvider.ExampleAxiosError.message)
    ).toBeInTheDocument();
    useQueryMock.mockRestore();
  });
});
