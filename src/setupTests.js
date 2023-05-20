import { server } from "../test/mocks/server";
import "cross-fetch/polyfill";
import "@testing-library/jest-dom/extend-expect";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
