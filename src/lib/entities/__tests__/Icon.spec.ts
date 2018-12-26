import { Icon } from "../Icon";

describe("Icon", () => {
  describe("constructor", () => {
    test("minimum toXml()", () => {
      const icon = new Icon();
      expect(icon.toXml()).toMatchInlineSnapshot(
        `"<icon name=\\"\\" texture=\\"\\" height=\\"16\\" width=\\"16\\"/>"`
      );
    });
    test("no options toJson()", () => {
      const icon = new Icon();
      expect(icon.toJson()).toMatchInlineSnapshot(
        `"{\\"Attributes\\":{\\"name\\":\\"\\",\\"texture\\":\\"\\",\\"height\\":16,\\"width\\":16}}"`
      );
    });
    test("toXml()", () => {
      const icon = new Icon({
        name: "my_icon",
        texture: `assets/foo/bar/my_icon.dds`
      });
      expect(icon.toXml()).toMatchInlineSnapshot(
        `"<icon name=\\"my_icon\\" texture=\\"assets/foo/bar/my_icon.dds\\"/>"`
      );
    });
    test("toJson()", () => {
      const icon = new Icon({
        name: "my_icon",
        texture: "assets/foo/bar/my_icon.dds"
      });
      expect(icon.toJson()).toMatchInlineSnapshot(
        `"{\\"Attributes\\":{\\"name\\":\\"my_icon\\",\\"texture\\":\\"assets/foo/bar/my_icon.dds\\"}}"`
      );
    });
  });
  describe("accessors", () => {
    const icon = new Icon();
    icon.name = "test";
    icon.texture = "path/to/test";
    icon.width = 256;
    icon.height = 256;
    icon.selected = "selected";
    icon.active = "active";
    icon.inactive = "inactive";
    test("toXml()", () => {
      expect(icon.toXml()).toMatchInlineSnapshot(
        `"<icon name=\\"test\\" texture=\\"path/to/test\\" height=\\"256\\" width=\\"256\\" selected=\\"selected\\" active=\\"active\\" inactive=\\"inactive\\"/>"`
      );
    });
    test("toJson()", () => {
      expect(icon.toJson()).toMatchInlineSnapshot(
        `"{\\"Attributes\\":{\\"name\\":\\"test\\",\\"texture\\":\\"path/to/test\\",\\"height\\":256,\\"width\\":256,\\"selected\\":\\"selected\\",\\"active\\":\\"active\\",\\"inactive\\":\\"inactive\\"}}"`
      );
    });
  });
});
