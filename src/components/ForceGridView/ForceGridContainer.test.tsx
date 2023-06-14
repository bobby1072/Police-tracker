import { ForceGridContainer } from "./ForceGridContainer";
import { MockDataProvider } from "../../../test/mocks/MockDataProvider";
import { fireEvent, render, screen } from "../../../test/utils/test-utils";
import userEvent from "@testing-library/user-event";
describe("ForceGridContainer", () => {
  const setFocusForce = jest.fn();
  it("check container renders", async () => {
    const allForce = await MockDataProvider.AllForceMock();
    render(
      <ForceGridContainer setFocusForce={setFocusForce} forces={allForce} />
    );
    expect(screen.getByLabelText("forceGridMainContainer")).toBeInTheDocument();
  });
  it("check forces are rendered", async () => {
    const allForce = await MockDataProvider.AllForceMock();

    render(
      <ForceGridContainer setFocusForce={setFocusForce} forces={allForce} />
    );
    expect(
      allForce
        .filter((x, index) => index < 5)
        .map((x) => screen.getByLabelText(x.id)).length
    ).toEqual(5);
  });
  it("check state is set when force clicked", async () => {
    const allForce = await MockDataProvider.AllForceMock();

    render(
      <ForceGridContainer forces={allForce} setFocusForce={setFocusForce} />
    );
    expect(screen.getByLabelText(allForce[0].id)).toBeInTheDocument();
    const forceButton = screen.getByLabelText(`${allForce[0].id}-button`);
    expect(forceButton).toBeInTheDocument();
    userEvent.click(forceButton);
    expect(setFocusForce).toBeCalledWith(allForce[0]);
  });
  it("checks other pages", async () => {
    const allForce = await MockDataProvider.AllForceMock();

    render(
      <ForceGridContainer forces={allForce} setFocusForce={setFocusForce} />
    );
    const nextArrow = screen.getByLabelText("next-page");
    expect(nextArrow).toBeInTheDocument();
    fireEvent.click(nextArrow);
    expect(
      allForce
        .filter((x, index) => index >= 5 && index < 10)
        .map((x) => screen.getByLabelText(x.id)).length
    ).toEqual(5);
  });
});
