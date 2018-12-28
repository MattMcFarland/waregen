import { mockGeneratorConfig } from "./util";
import createWareCollection from "../createWareCollection";

describe("generator/helpers", () => {
  describe("createWareCollection", () => {
    test("toJson()", () => {
      const mockConfig = mockGeneratorConfig();
      const wareCollection = createWareCollection(mockConfig);
      expect(wareCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      const mockConfig = mockGeneratorConfig();
      const wareCollection = createWareCollection(mockConfig);
      expect(wareCollection.toXml()).toMatchSnapshot();
    });
  });
});
