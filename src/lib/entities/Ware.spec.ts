import { Ware } from "./Ware";

describe("Ware Entity", () => {
  const ware = new Ware();
  test("constructor with no options", () => {
    expect(ware.toJson()).toBe(
      '{"$":{"id":"","name":"","transport":"","volume":""}}'
    );
    expect(ware.toXml()).toBe('<ware id="" name="" transport="" volume=""/>');
  });
});
