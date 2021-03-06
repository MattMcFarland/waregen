import { mockGeneratorConfig } from "./util";
import createIcons from "../createIcons";

describe("generator/helpers", () => {
  describe("createIcons", () => {
    test("toJson()", () => {
      const mockConfig = mockGeneratorConfig();
      const macroIndex = createIcons(mockConfig);
      expect(macroIndex.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      const mockConfig = mockGeneratorConfig();
      const macroIndex = createIcons(mockConfig);
      expect(macroIndex.toXml()).toMatchSnapshot();
    });
  });
});
