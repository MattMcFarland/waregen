import { mockGeneratorConfig } from "./util";
import createBasketCollection from "../createBasketCollection";
import { XMLPatchTypes } from "@@/entities/X4Entity";
describe("generator/helpers", () => {
  describe("createBasketCollection", () => {
    const mockConfig = mockGeneratorConfig();
    const basketCollection = createBasketCollection(mockConfig);
    test("toJson()", () => {
      expect(basketCollection.toJson()).toMatchSnapshot();
    });
    test("toXml()", () => {
      expect(basketCollection.toXml()).toMatchSnapshot();
    });
    test("toXmlPatch()", () => {
      expect(basketCollection.toXmlPatch(XMLPatchTypes.ADD)).toMatchSnapshot();
    });
  });
});
