import { mockGeneratorConfig } from "@@/__test__utils__";
import createMacroIndex from "../createMacroIndex";

describe("generator/helper", () => {
  describe("createMacroIndex", () => {
    test("toJson()", () => {
      const mockConfig = mockGeneratorConfig();
      const macroIndex = createMacroIndex(mockConfig);
      expect(macroIndex.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      const mockConfig = mockGeneratorConfig();
      const macroIndex = createMacroIndex(mockConfig);
      expect(macroIndex.toXml()).toMatchSnapshot();
    });
  });
});
