import { mockGeneratorConfig } from "./util";
import createMacroIndex from "../createMacroIndex";

describe("generator/helpers", () => {
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
