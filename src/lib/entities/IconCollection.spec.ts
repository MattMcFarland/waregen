import { IconCollection } from "./IconCollection";
import { Icon, IconAttributes } from "./Icon";

const iconTest = (name: string): IconAttributes => ({
  name,
  texture: `assets/${name}`
});

describe("IconCollection", () => {
  describe("constructor", () => {
    const iconCollection = new IconCollection([
      new Icon(iconTest("A")),
      new Icon(iconTest("B")),
      new Icon(iconTest("C"))
    ]);
    test("success", () => {
      expect(iconCollection.extract("A")).toBeDefined();
      expect(iconCollection.extract("B")).toBeDefined();
      expect(iconCollection.extract("C")).toBeDefined();
    });
    test("instance.toXml()", () => {
      expect(iconCollection.toXml()).toMatchInlineSnapshot(`
"<icons>
  <icon name=\\"A\\" texture=\\"assets/A\\"/>
  <icon name=\\"B\\" texture=\\"assets/B\\"/>
  <icon name=\\"C\\" texture=\\"assets/C\\"/>
</icons>"
`);
    });
    test("instance.toJson()", () => {
      expect(iconCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"icon\\":[{\\"Attributes\\":{\\"name\\":\\"A\\",\\"texture\\":\\"assets/A\\"}},{\\"Attributes\\":{\\"name\\":\\"B\\",\\"texture\\":\\"assets/B\\"}},{\\"Attributes\\":{\\"name\\":\\"C\\",\\"texture\\":\\"assets/C\\"}}]}"`
      );
    });
  });
  describe("instance.add()", () => {
    test("instance.toXml()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      iconCollection.add(new Icon(iconTest("B")));
      expect(iconCollection.toXml()).toMatchInlineSnapshot(`
"<icons>
  <icon name=\\"A\\" texture=\\"assets/A\\"/>
  <icon name=\\"B\\" texture=\\"assets/B\\"/>
</icons>"
`);
    });
    test("instance.toJson()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      iconCollection.add(new Icon(iconTest("B")));
      expect(iconCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"icon\\":[{\\"Attributes\\":{\\"name\\":\\"A\\",\\"texture\\":\\"assets/A\\"}},{\\"Attributes\\":{\\"name\\":\\"B\\",\\"texture\\":\\"assets/B\\"}}]}"`
      );
    });
  });
  describe("instance.remove()", () => {
    test("instance.toXml()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      iconCollection.add(new Icon(iconTest("B")));
      iconCollection.remove("A");
      expect(iconCollection.toXml()).toMatchInlineSnapshot(`
"<icons>
  <icon name=\\"B\\" texture=\\"assets/B\\"/>
</icons>"
`);
    });
    test("instance.toJson()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      iconCollection.add(new Icon(iconTest("B")));
      iconCollection.remove("A");
      expect(iconCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"icon\\":[{\\"Attributes\\":{\\"name\\":\\"B\\",\\"texture\\":\\"assets/B\\"}}]}"`
      );
    });
  });
  describe("instance.replace()", () => {
    test("instance.toXml()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      const replacement = new Icon(iconTest("A"));
      replacement.texture = "REPLACED!";
      iconCollection.replace(replacement);
      expect(iconCollection.toXml()).toMatchInlineSnapshot(`
"<icons>
  <icon name=\\"A\\" texture=\\"REPLACED!\\"/>
</icons>"
`);
    });
    test("instance.toJson()", () => {
      const iconCollection = new IconCollection();
      iconCollection.add(new Icon(iconTest("A")));
      const replacement = new Icon(iconTest("A"));
      replacement.texture = "REPLACED!";
      iconCollection.replace(replacement);
      expect(iconCollection.toJson()).toMatchInlineSnapshot(
        `"{\\"icon\\":[{\\"Attributes\\":{\\"name\\":\\"A\\",\\"texture\\":\\"REPLACED!\\"}}]}"`
      );
    });
  });
  describe("instance.import()", () => {
    const testXml = () => {
      return `
      <icons>
      <icon name="missile_dumbfire_mk1" texture="assets/fx/gui/textures/PlayerHud/hud_ms_dumbfire_mk1.tga" height="32" width="64"></icon>
      <icon name="missile_dumbfire_mk2" texture="assets/fx/gui/textures/PlayerHud/hud_ms_dumbfire_mk2.tga" height="32" width="64"></icon>
      <icon name="missile_dumbfire_mk3" texture="assets/fx/gui/textures/PlayerHud/hud_ms_dumbfire_mk3.tga" height="32" width="64"></icon>
    
      <icon name="missile_guided_mk1" texture="assets/fx/gui/textures/PlayerHud/hud_ms_guided_mk1.tga" height="32" width="64"></icon>
      <icon name="missile_guided_mk2" texture="assets/fx/gui/textures/PlayerHud/hud_ms_guided_mk2.tga" height="32" width="64"></icon>
      <icon name="missile_guided_mk3" texture="assets/fx/gui/textures/PlayerHud/hud_ms_guided_mk3.tga" height="32" width="64"></icon>
    
      <icon name="missile_torpedo_mk1" texture="assets/fx/gui/textures/PlayerHud/hud_ms_torpedo_mk1.tga" height="32" width="64"></icon>
      <icon name="missile_torpedo_mk2" texture="assets/fx/gui/textures/PlayerHud/hud_ms_torpedo_mk2.tga" height="32" width="64"></icon>
      <icon name="missile_torpedo_mk3" texture="assets/fx/gui/textures/PlayerHud/hud_ms_torpedo_mk3.tga" height="32" width="64"></icon>
    
      <icon name="weapon_beam_mk1" texture="assets/fx/gui/textures/PlayerHud/hud_wp_beam_mk1.tga" height="32" width="64"></icon>
      <icon name="weapon_beam_mk2" texture="assets/fx/gui/textures/PlayerHud/hud_wp_beam_mk2.tga" height="32" width="64"></icon>
      <icon name="weapon_beam_mk3" texture="assets/fx/gui/textures/PlayerHud/hud_wp_beam_mk3.tga" height="32" width="64"></icon>            
      </icons>
      `;
    };
    test("toXML()", async () => {
      const testCollection = new IconCollection();
      await testCollection.import(testXml());
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with add", async () => {
      const testCollection = new IconCollection();
      await testCollection.import(testXml());
      testCollection.add(new Icon(iconTest("A")));
      expect(testCollection.toXml()).toMatchSnapshot();
    });
    test("with remove", async () => {
      const testCollection = new IconCollection();
      await testCollection.import(testXml());
      testCollection.remove("weapon_beam_mk1");
      testCollection.remove("weapon_beam_mk2");
      testCollection.remove("weapon_beam_mk3");
      expect(testCollection.toXml()).toMatchSnapshot();
    });
  });
});
