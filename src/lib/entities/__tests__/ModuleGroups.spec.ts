import { ModuleGroup, findInXmlDef, ModuleGroupEntity } from "../ModuleGroup";
import { Basket } from "../Basket";

const testGroupOps = {
  name: "test_group",
  macros: ["foo", "bar", "baz"]
};

describe("ModuleGroup", () => {
  describe("constructor", () => {
    test("instance.macros are set", () => {
      const testGroup = new ModuleGroup(testGroupOps);
      expect(testGroup.macros).toContain("foo");
      expect(testGroup.macros).toContain("bar");
      expect(testGroup.macros).toContain("baz");
    });
    test("instance.macros mutates __xmlDef.select", () => {
      const testGroup = new ModuleGroup(testGroupOps);
      const groupEntity = <ModuleGroupEntity>testGroup.__xmlDef;
      const fooMacro = findInXmlDef(groupEntity, "foo");
      const barMacro = findInXmlDef(groupEntity, "bar");
      const bazMacro = findInXmlDef(groupEntity, "baz");
      expect(fooMacro).toHaveProperty("Attributes");
      expect(barMacro).toHaveProperty("Attributes");
      expect(bazMacro).toHaveProperty("Attributes");
      expect(fooMacro && fooMacro.Attributes.macro).toBe("foo");
      expect(barMacro && barMacro.Attributes.macro).toBe("bar");
      expect(bazMacro && bazMacro.Attributes.macro).toBe("baz");
    });
    test("converts to xml", () => {
      const testGroup = new ModuleGroup(testGroupOps);
      expect(testGroup.toXml()).toMatchInlineSnapshot(`
"<group name=\\"test_group\\">
  <select macro=\\"foo\\"/>
  <select macro=\\"bar\\"/>
  <select macro=\\"baz\\"/>
</group>"
`);
    });
  });
});
