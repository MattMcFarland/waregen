import { Ware } from "./Ware";

describe("Ware Entity", () => {
  const ware = new Ware();
  test("constructor with no options", () => {
    expect(ware.toXml()).toBe('<ware id="" name="" transport="" volume=""/>');
    expect(ware.toJson()).toBe(
      '{"Attributes":{"id":"","name":"","transport":"","volume":1},"Children":{}}'
    );
  });
});
