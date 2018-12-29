import { AssetWareProdMacro } from "../AssetWareProdMacro";

describe("AssetWareProdMacro", () => {
  describe("using import", () => {
    const xmlString = `
    <?xml version="1.0" encoding="utf-8"?>
    <!--Exported by: Florian (192.168.3.134) at 23.11.2018_17-23-25-->
    <macros>
      <macro name="prod_arg_foodrations_macro" class="production">
        <component ref="prod_arg_foodrations" />
        <properties>
          <identification name="{20104,13401}" shortname="{20104,13403}" makerrace="argon" description="{20104,13402}" />
          <build>
            <sets>
              <set ref="factory" />
              <set ref="headquarters_player" />
            </sets>
          </build>
          <explosiondamage value="10000" />
          <hull max="133000" />
          <secrecy level="2" />
          <production wares="foodrations">
            <queue ware="foodrations" method="argon" />
          </production>
          <workforce max="90" />
        </properties>
      </macro>
    </macros>    
    `;
    test("has correct id", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.id).toBe("prod_arg_foodrations_macro");
    });
    test("can change id", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      macro.id = "foo";
      expect(macro.__xmlDef.macro[0].Attributes.name).toBe("foo");
    });
    test("has correct name", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.name).toBe("{20104,13401}");
    });
    test("can change name", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      macro.name = "foo";
      expect(
        macro.__xmlDef.macro[0].properties[0].identification[0].Attributes.name
      ).toBe("foo");
    });
    test("has correct shortname", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.shortname).toBe("{20104,13403}");
    });
    test("can change shortname", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      macro.shortname = "foo";
      expect(
        macro.__xmlDef.macro[0].properties[0].identification[0].Attributes
          .shortname
      ).toBe("foo");
    });
    test("has correct description", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.description).toBe("{20104,13402}");
    });
    test("can change description", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      macro.description = "foo";
      expect(
        macro.__xmlDef.macro[0].properties[0].identification[0].Attributes
          .description
      ).toBe("foo");
    });
    test("has correct production", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.production).toBe("foodrations");
    });
    test("can change production", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      macro.production = "foo";
      expect(
        macro.__xmlDef.macro[0].properties[0].production[0].Attributes.wares
      ).toBe("foo");
      expect(
        macro.__xmlDef.macro[0].properties[0].production[0].queue[0].Attributes
          .ware
      ).toBe("foo");
    });
    test("toXml()", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.toXml()).toMatchSnapshot();
    });
    test("tJson()", async () => {
      const macro = await new AssetWareProdMacro().import(xmlString);
      expect(macro.toJson()).toMatchSnapshot();
    });
  });
});
