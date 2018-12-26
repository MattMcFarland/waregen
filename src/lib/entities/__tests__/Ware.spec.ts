import { Ware } from "../Ware";

describe("Ware Entity", () => {
  const ware = new Ware();
  describe("constructor with no options", () => {
    test("toXml()", () => {
      expect(ware.toXml()).toMatchInlineSnapshot(`
"<ware id=\\"default\\" name=\\"default\\" transport=\\"container\\" volume=\\"1\\">
  <price min=\\"1\\" average=\\"1\\" max=\\"1\\"/>
  <production time=\\"10\\" amount=\\"1\\" method=\\"default\\" name=\\"{20206, 101}\\">
    <primary>
      <ware ware=\\"energycells\\" amount=\\"50\\"/>
    </primary>
    <effects>
      <effect type=\\"efficiency\\" product=\\"1\\"/>
    </effects>
  </production>
  <container ref=\\"sm_gen_pickup_container_01_macro\\"/>
  <icon active=\\"ware_default\\" video=\\"ware_noicon_macro\\"/>
</ware>"
`);
    });
    test("toJson()", () => {
      expect(ware.toJson()).toBe(
        '{"Attributes":{"id":"default","name":"default","transport":"container","volume":1},"price":[{"Attributes":{"min":1,"average":1,"max":1}}],"production":[{"Attributes":{"time":10,"amount":1,"method":"default","name":"{20206, 101}"},"primary":[{"ware":[{"Attributes":{"ware":"energycells","amount":50}}]}],"effects":[{"effect":[{"Attributes":{"type":"efficiency","product":1}}]}]}],"container":[{"Attributes":{"ref":"sm_gen_pickup_container_01_macro"}}],"icon":[{"Attributes":{"active":"ware_default","video":"ware_noicon_macro"}}]}'
      );
    });
  });
});
