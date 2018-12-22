import { Ware } from "./Ware";

describe("Ware Entity", () => {
  const ware = new Ware();
  describe("constructor with no options", () => {
    test("toXml()", () => {
      expect(ware.toXml()).toBe(
        '<ware id="" name="" transport="" volume="1"/>'
      );
    });
    test("toJson()", () => {
      expect(ware.toJson()).toBe(
        '{"Attributes":{"id":"","name":"","transport":"","volume":1}}'
      );
    });
  });
});
