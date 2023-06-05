import { render, screen } from "../../test/utils/test-utils";
import { CrimeMap } from "./CrimeMap";

describe("CrimeMap", () => {
  it("Checks render", async () => {
    render(<CrimeMap />);
    expect(screen.getByLabelText("crimeMapPage")).toBeInTheDocument();
  });
});
