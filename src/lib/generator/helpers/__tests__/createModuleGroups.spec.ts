import { mockGeneratorConfig } from "./util";
import createModuleGroups from "../createModuleGroups";

describe("generator/helpers", () => {
  describe("createModuleGroups", () => {
    const mockConfig = mockGeneratorConfig();
    const modCollection = createModuleGroups(mockConfig);
    test("toJson()", () => {
      expect(modCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(modCollection.toXml()).toMatchSnapshot();
    });
  });
});
