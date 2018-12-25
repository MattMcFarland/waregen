import { ModuleGroupCollection } from "./ModuleGroupCollection";
import { ModuleGroup, ModuleGroupConstructOptions } from "./ModuleGroup";

const groupTest = (
  name: string,
  macros: string[]
): ModuleGroupConstructOptions => ({
  name,
  macros
});

describe("ModuleGroupCollection", () => {
  describe("constructor", () => {
    const testCollection = new ModuleGroupCollection([
      new ModuleGroup(groupTest("group_1", ["foo", "bar"])),
      new ModuleGroup(groupTest("group_2", ["foo", "bar"])),
      new ModuleGroup(groupTest("group_3", ["foo", "bar"]))
    ]);
    test("success", () => {
      expect(testCollection.extract("group_1")).toBeDefined();
      expect(testCollection.extract("group_2")).toBeDefined();
      expect(testCollection.extract("group_3")).toBeDefined();
    });
    test("instance.toXml()", () => {
      expect(testCollection.toXml()).toMatchInlineSnapshot(`
"<groups>
  <group name=\\"group_1\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
  <group name=\\"group_2\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
  <group name=\\"group_3\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
</groups>"
`);
    });
    test("instance.toJson()", () => {
      expect(testCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"group\\":[{\\"Attributes\\":{\\"name\\":\\"group_1\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]},{\\"Attributes\\":{\\"name\\":\\"group_2\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]},{\\"Attributes\\":{\\"name\\":\\"group_3\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]}]}"`
      );
    });
  });
  describe("instance.add()", () => {
    const testCollection = new ModuleGroupCollection();
    testCollection.add(new ModuleGroup(groupTest("group_1", ["foo", "bar"])));
    test("instance.toXml()", () => {
      expect(testCollection.toXml()).toMatchInlineSnapshot(`
"<groups>
  <group name=\\"group_1\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
</groups>"
`);
    });
    test("instance.toJson()", () => {
      expect(testCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"group\\":[{\\"Attributes\\":{\\"name\\":\\"group_1\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]}]}"`
      );
    });
  });
  describe("instance.remove()", () => {
    const testCollection = new ModuleGroupCollection();
    testCollection.add(new ModuleGroup(groupTest("group_1", ["foo", "bar"])));
    testCollection.add(new ModuleGroup(groupTest("group_2", ["foo", "bar"])));
    testCollection.remove("group_1");
    test("instance.toXml()", () => {
      expect(testCollection.toXml()).toMatchInlineSnapshot(`
"<groups>
  <group name=\\"group_2\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
</groups>"
`);
    });
    test("instance.toJson()", () => {
      expect(testCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"group\\":[{\\"Attributes\\":{\\"name\\":\\"group_2\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]}]}"`
      );
    });
  });
  describe("instance.replace()", () => {
    const testCollection = new ModuleGroupCollection();
    testCollection.add(new ModuleGroup(groupTest("group_1", ["foo", "bar"])));
    testCollection.add(new ModuleGroup(groupTest("group_2", ["foo", "bar"])));
    const replacement = new ModuleGroup(groupTest("group_2", ["replaced!!"]));
    testCollection.replace(replacement);
    test("instance.toXml()", () => {
      expect(testCollection.toXml()).toMatchInlineSnapshot(`
"<groups>
  <group name=\\"group_1\\">
    <select macro=\\"foo\\"/>
    <select macro=\\"bar\\"/>
  </group>
  <group name=\\"group_2\\">
    <select macro=\\"replaced!!\\"/>
  </group>
</groups>"
`);
    });
    test("instance.toJson()", () => {
      expect(testCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"group\\":[{\\"Attributes\\":{\\"name\\":\\"group_1\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"foo\\"}},{\\"Attributes\\":{\\"macro\\":\\"bar\\"}}]},{\\"Attributes\\":{\\"name\\":\\"group_2\\"},\\"select\\":[{\\"Attributes\\":{\\"macro\\":\\"replaced!!\\"}}]}]}"`
      );
    });
  });
  describe("instance.import()", () => {
    const testXml = () => {
      return `
      <groups>
        <group name="group_1">
          <select macro="group_1_macro" />
        </group>
        <group name="group_2">
          <select macro="group_2_macro" />
          <select macro="group_2_macro2" />
          <select macro="group_2_macro3" />
        </group>
        <group name="group_3">
          <select macro="group_3_macro" />
          <select macro="group_3_macro2" />
          <select macro="group_3_macro3" />
        </group>
        <group name="group_4">
        <select macro="group_4_macro" />
        <select macro="group_4_macro2" />
        <select macro="group_4_macro3" />
        </group>
        <group name="group_5">
          <select macro="group_5_macro" />
          <select macro="group_5_macro2" />
          <select macro="group_5_macro3" />
        </group>
      </groups>
      `;
    };
    test("toXml()", async () => {
      const testCollection = new ModuleGroupCollection();
      await testCollection.import(testXml());
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("toJson()", async () => {
      const testCollection = new ModuleGroupCollection();
      await testCollection.import(testXml());
      expect(testCollection.toJson()).toMatchSnapshot();
    });
  });
});
