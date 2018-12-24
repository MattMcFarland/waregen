import { X4Entity, X4EntityType } from "./X4Entity";

const testDefaults = {
  Attributes: {
    id: "entity",
    name: "entity"
  }
};

describe("X4Entity", () => {
  const entity = new X4Entity(X4EntityType.BASE_ENTITY, "entity", testDefaults);
  describe("constructor with no options", () => {
    test("toXml()", () => {
      expect(entity.toXml()).toMatchInlineSnapshot(
        `"<entity id=\\"entity\\" name=\\"entity\\"/>"`
      );
    });
    test("toJson()", () => {
      expect(entity.toJson()).toBe(
        '{"Attributes":{"id":"entity","name":"entity"}}'
      );
    });
  });
  describe("using merge", () => {
    const entityA = new X4Entity(X4EntityType.BASE_ENTITY, "entityA", {
      Attributes: {
        id: "entityA",
        name: "entityA",
        transport: "entityA",
        volume: 1,
        entityA: "entityA"
      }
    });
    const entityB = new X4Entity(X4EntityType.BASE_ENTITY, "entityB", {
      Attributes: {
        id: "entityB",
        name: "entityB",
        transport: "entityB",
        volume: 2,
        entityB: "entityB"
      }
    });
    test("merges right to left", () => {
      const newEntity: X4Entity<any> = entityA.merge(entityB);
      expect(newEntity).toBeDefined();
      expect(newEntity.__xmlDef.Attributes.volume).toBe(2);
      expect(newEntity.__xmlDef.Attributes.entityB).toBe("entityB");
    });
  });
  describe("using clone", () => {
    const entity = new X4Entity(X4EntityType.BASE_ENTITY, "entity", {
      Attributes: {
        id: "copyMe",
        name: "copyMe",
        transport: "container",
        volume: 1
      }
    });
    const copy = <any>entity.clone();
    test("not identical", () => {
      expect(copy).not.toBe(entity);
    });
    test("toJson()", () => {
      expect(entity.toJson()).toMatchInlineSnapshot(
        `"{\\"Attributes\\":{\\"id\\":\\"copyMe\\",\\"name\\":\\"copyMe\\",\\"transport\\":\\"container\\",\\"volume\\":1}}"`
      );
      expect(copy.toJson()).toMatchInlineSnapshot(
        `"{\\"Attributes\\":{\\"id\\":\\"copyMe\\",\\"name\\":\\"copyMe\\",\\"transport\\":\\"container\\",\\"volume\\":1}}"`
      );
    });
    test("toXml()", () => {
      expect(entity.toXml()).toMatchInlineSnapshot(
        `"<entity id=\\"copyMe\\" name=\\"copyMe\\" transport=\\"container\\" volume=\\"1\\"/>"`
      );
    });
  });

  describe("using import", () => {
    const xmlString = `<entity id="antimattercells" name="{20201,201}" description="{20201,202}" factoryname="{20201,204}" group="refined" transport="container" volume="18" tags="container economy"><price min="181" average="202" max="222"/><production time="120" amount="110" method="default" name="{20206,101}"><primary><entity entity="energycells" amount="100"/><entity entity="hydrogen" amount="320"/></primary><effects><effect type="work" product="0.21"/></effects></production><icon active="entity_antimattercells" video="entity_antimattercells_macro"/></entity>`;
    test("import a child node", async () => {
      const entity = await new X4Entity(
        X4EntityType.BASE_ENTITY,
        "entity",
        testDefaults
      ).import(xmlString, "production");
      expect(entity.toXml()).toMatchInlineSnapshot(`
"<production time=\\"120\\" amount=\\"110\\" method=\\"default\\" name=\\"{20206,101}\\">
  <primary>
    <entity entity=\\"energycells\\" amount=\\"100\\"/>
    <entity entity=\\"hydrogen\\" amount=\\"320\\"/>
  </primary>
  <effects>
    <effect type=\\"work\\" product=\\"0.21\\"/>
  </effects>
</production>"
`);
    });
    test("toJson()", async () => {
      const entity = await new X4Entity(
        X4EntityType.BASE_ENTITY,
        "entity",
        testDefaults
      ).import(xmlString);
      expect(entity.toJson()).toBe(
        '{"Attributes":{"id":"antimattercells","name":"{20201,201}","description":"{20201,202}","factoryname":"{20201,204}","group":"refined","transport":"container","volume":18,"tags":"container economy"},"price":[{"Attributes":{"min":181,"average":202,"max":222}}],"production":[{"Attributes":{"time":120,"amount":110,"method":"default","name":"{20206,101}"},"primary":[{"entity":[{"Attributes":{"entity":"energycells","amount":100}},{"Attributes":{"entity":"hydrogen","amount":320}}]}],"effects":[{"effect":[{"Attributes":{"type":"work","product":0.21}}]}]}],"icon":[{"Attributes":{"active":"entity_antimattercells","video":"entity_antimattercells_macro"}}]}'
      );
    });
    test("toXml(), pretty: false", async () => {
      const entity = await new X4Entity(
        X4EntityType.BASE_ENTITY,
        "entity",
        testDefaults
      ).import(xmlString);
      expect(entity.toXml(false)).toEqual(xmlString);
    });
    test("toXml(), pretty: true (default)", async () => {
      const entity = await new X4Entity(
        X4EntityType.BASE_ENTITY,
        "entity",
        testDefaults
      ).import(xmlString);
      expect(entity.toXml()).toMatchInlineSnapshot(`
"<entity id=\\"antimattercells\\" name=\\"{20201,201}\\" description=\\"{20201,202}\\" factoryname=\\"{20201,204}\\" group=\\"refined\\" transport=\\"container\\" volume=\\"18\\" tags=\\"container economy\\">
  <price min=\\"181\\" average=\\"202\\" max=\\"222\\"/>
  <production time=\\"120\\" amount=\\"110\\" method=\\"default\\" name=\\"{20206,101}\\">
    <primary>
      <entity entity=\\"energycells\\" amount=\\"100\\"/>
      <entity entity=\\"hydrogen\\" amount=\\"320\\"/>
    </primary>
    <effects>
      <effect type=\\"work\\" product=\\"0.21\\"/>
    </effects>
  </production>
  <icon active=\\"entity_antimattercells\\" video=\\"entity_antimattercells_macro\\"/>
</entity>"
`);
    });
  });
});
