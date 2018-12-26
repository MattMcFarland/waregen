import { IndexHash, findInXmlDef } from "../IndexHash";
import { EntryEntity, Index as IndexItems } from "@@/XMLTypes/X4Index";

describe("IndexHash", () => {
  describe("constructor(hash)", () => {
    test("instance.entries are set", () => {
      const testIndex = new IndexHash({
        foo: "bar",
        aNumber: 55,
        aBool: true
      });
      expect(testIndex.entries).toHaveProperty("foo");
      expect(testIndex.entries.foo).toBe("bar");
      expect(testIndex.entries).toHaveProperty("aNumber");
      expect(testIndex.entries.aNumber).toBe(55);
      expect(testIndex.entries).toHaveProperty("aBool");
      expect(testIndex.entries.aBool).toBe(true);
    });
    test("instance.entries mutate __xmlDef", () => {
      const testIndex = new IndexHash({
        foo: "bar",
        aNumber: 55,
        aBool: true
      });
      expect(findInXmlDef(testIndex.__xmlDef, "foo")).toBeDefined();
      const items = <IndexItems>testIndex.__xmlDef;
      expect(items.entry).toBeDefined();
      expect(items.entry && items.entry[0].Attributes.name).toBeTruthy();
      const atts = items.entry && items.entry[0].Attributes;
      expect(atts && atts.name).toEqual("foo");
      expect(atts && atts.value).toEqual("bar");
    });
  });

  test("converts js hash to name/value xml", () => {
    const testIndex = new IndexHash({
      foo: "bar",
      aNumber: 55,
      aBool: true
    });
    expect(testIndex.toXml()).toMatchInlineSnapshot(`
"<index>
  <entry name=\\"foo\\" value=\\"bar\\"/>
  <entry name=\\"aNumber\\" value=\\"55\\"/>
  <entry name=\\"aBool\\" value=\\"true\\"/>
</index>"
`);
  });
});
