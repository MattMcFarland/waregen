import { AssetWareMacro } from "./AssetWareMacro";

describe("WareMacro", () => {
  test("constructor", () => {
    const wareMacro = new AssetWareMacro("foo", "bar");
    expect(wareMacro.ref).toBe("bar");
    expect(wareMacro.name).toBe("foo");
  });
  test("toXml()", () => {
    const wareMacro = new AssetWareMacro("foo", "bar");
    expect(wareMacro.toXml()).toMatchInlineSnapshot(`
"<macros>
  <macro name=\\"foo\\" class=\\"object\\">
    <component ref=\\"bar\\"/>
    <properties>
      <identification unique=\\"0\\"/>
    </properties>
  </macro>
</macros>"
`);
  });
  test("toJson()", () => {
    const wareMacro = new AssetWareMacro("foo", "bar");
    expect(wareMacro.toJson()).toMatchInlineSnapshot(
      `"{\\"macro\\":[{\\"Attributes\\":{\\"name\\":\\"foo\\",\\"class\\":\\"object\\"},\\"component\\":[{\\"Attributes\\":{\\"ref\\":\\"bar\\"}}],\\"properties\\":[{\\"identification\\":[{\\"Attributes\\":{\\"unique\\":0}}]}]}]}"`
    );
  });
});
