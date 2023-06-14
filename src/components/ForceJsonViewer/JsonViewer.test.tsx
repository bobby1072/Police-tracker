import { faker } from "@faker-js/faker";
import { render, screen } from "../../../test/utils/test-utils";
import { JsonViewer } from "./JsonViewer";
const randomJson = () => {
  let object = {};
  for (let i = 0; i < faker.number.int({ min: 1, max: 100 }); i++) {
    object = { ...object, [faker.word.noun()]: faker.music.genre() };
  }
  return object;
};
describe("JsonViewer", () => {
  const fakeJson = randomJson();
  it("Checks main Render", async () => {
    render(<JsonViewer jsonData={fakeJson} maxHeight="100vh" title="mock" />);
    expect(screen.getByLabelText("jsonViewer")).toBeInTheDocument();
  });
  it("Checks error on empty object", async () => {
    const emptyObj = "mock empty obj";
    render(
      <JsonViewer
        jsonData={{}}
        title="mock"
        emptyObjectMessage={emptyObj}
        maxHeight="100vh"
      />
    );
    expect(screen.getByText(emptyObj)).toBeInTheDocument();
  });
  it("Checks error on empty array", async () => {
    const emptyList = "mock empty list";
    render(
      <JsonViewer
        jsonData={[]}
        maxHeight="100vh"
        title="mock"
        emptyListMessage={emptyList}
      />
    );
    expect(screen.getByText(emptyList)).toBeInTheDocument();
  });
  it("Check object renders in text", async () => {
    render(<JsonViewer jsonData={fakeJson} maxHeight="100vh" title="mock" />);
    const pre = screen.getByLabelText("jsonPre");
    expect(pre).toBeInTheDocument();
    expect(pre.textContent).toEqual(JSON.stringify(fakeJson, null, 2));
  });
});
