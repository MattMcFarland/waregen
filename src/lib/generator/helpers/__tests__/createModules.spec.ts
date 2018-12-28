import { mockGeneratorConfig } from "./util";
import createModules from "../createModules";
describe("generator/helpers", () => {
  describe("createModules", () => {
    const mockConfig = mockGeneratorConfig();
    const modCollection = createModules(mockConfig);
    test("toJson()", () => {
      expect(modCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(modCollection.toXml()).toMatchSnapshot();
    });
  });
});
