import { mockGeneratorConfig } from "@@/__test__utils__";
import pathBuilder, { PathBuilder } from "../PathBuilder";
import Path from "path";

describe("PathBuilder", () => {
  const mockConfig = mockGeneratorConfig();
  describe("generic append method", () => {
    test("append takes N args", () => {
      const result = new PathBuilder(mockConfig, "my_mod")
        .append("foo", "bar", "baz")
        .toArray();
      expect(result).toContain("foo");
      expect(result).toContain("bar");
      expect(result).toContain("baz");
    });
    test("chaining", () => {
      const result = new PathBuilder(mockConfig, "id")
        .append("foo")
        .append("bar")
        .append("baz")
        .toArray();
      expect(result).toContain("foo");
      expect(result).toContain("bar");
      expect(result).toContain("baz");
    });
  });
  describe("building paths from mod", () => {
    test("fileLibrary(arg) -> extensions/test/libraries/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirModPath()
        .fileLibrary("arg")
        .toArray()
        .join("\\");
      expect(result).toBe("extensions\\test\\libraries\\arg.xml");
    });
    test("fileIndex(arg) -> extensions/test/index/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirModPath()
        .fileIndex("arg")
        .toArray()
        .join("\\");
      expect(result).toBe("extensions\\test\\index\\arg.xml");
    });
    test("fileProductionMacroXML() -> extensions/test...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirModPath()
        .fileProductionMacroXML()
        .toArray()
        .join("/");
      expect(result).toBe(
        "extensions/test/assets/structures/production/macros/pfx_prod_gen_fooware_macro.xml"
      );
    });
    test("fileIconDDS() -> extensions/fooware/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirModPath()
        .fileIconDDS()
        .toArray()
        .join("/");
      expect(result).toBe(
        "extensions/test/assets/fx/gui/textures/pfx_prod_gen_fooware_macro.dds"
      );
    });
  });
  describe("building paths from unpacked", () => {
    test("fileLibrary(arg) -> unpacked/libraries/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirUnpackedPath()
        .fileLibrary("arg")
        .toArray()
        .join("/");

      expect(result).toBe("unpacked/libraries/arg.xml");
    });
    test("fileIndex(arg) -> unpacked/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirUnpackedPath()
        .fileIndex("arg")
        .toArray()
        .join("/");
      expect(result).toBe("unpacked/index/arg.xml");
    });
    test("fileProductionMacroXML() -> unpacked/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirUnpackedPath()
        .fileProductionMacroXML()
        .toArray()
        .join("/");
      expect(result).toBe(
        "unpacked/assets/structures/production/macros/pfx_prod_gen_fooware_macro.xml"
      );
    });
    test("fileIconGZ() -> unpacked/...", () => {
      const result = new PathBuilder(mockConfig, "fooware")
        .dirUnpackedPath()
        .fileIconGZ()
        .toArray()
        .join("/");
      expect(result).toBe(
        "unpacked/assets/fx/gui/textures/pfx_prod_gen_fooware_macro.gz"
      );
    });
  });
  describe("pathBuilder factory", () => {
    test("arity 1", () => {
      const p = pathBuilder(mockConfig)("fooware")
        .append("foo")
        .append("bar")
        .toArray()
        .join("/");
      expect(p).toBe("foo/bar");
    });
    test("arity 2", () => {
      const p = pathBuilder(mockConfig, "fooware")
        .append("foo")
        .append("bar")
        .toArray()
        .join(".");
      expect(p).toBe("foo.bar");
    });
  });
  describe("immutability", () => {
    test("frozen after toHostString()", () => {
      expect(() => {
        const p = pathBuilder(mockConfig, "fooware").dirModPath();
        p.toHostString();
        p.append("boom");
      }).toThrow();
    });
    test("frozen after resolve()", () => {
      expect(() => {
        const p = pathBuilder(mockConfig, "fooware").dirModPath();
        p.resolve();
        p.append("boom");
      }).toThrow();
    });
    test("frozen after toString()", () => {
      expect(() => {
        const p = pathBuilder(mockConfig, "fooware").dirModPath();
        p.toString();
        p.append("boom");
      }).toThrow();
    });
    test("frozen after toArray()", () => {
      expect(() => {
        const p = pathBuilder(mockConfig, "fooware").dirModPath();
        p.toArray();
        p.append("boom");
      }).toThrow();
    });
  });
  describe("transforms", () => {
    test("toHostString()", () => {
      const p = pathBuilder(mockConfig, "fooware")
        .append("foo", "bar")
        .toHostString()
        .split(Path.sep)
        .join(".");
      expect(p).toBe("foo.bar");
    });
    test("resolve()", () => {
      const p = pathBuilder(mockConfig, "fooware")
        .append("foo", "bar")
        .resolve()
        .split(Path.sep);
      expect(p).toContain("foo");
      expect(p).toContain("bar");
    });
    test("toString()", () => {
      const p = pathBuilder(mockConfig, "fooware")
        .append("foo", "bar")
        .toString()
        .split("\\")
        .join(".");
      expect(p).toBe("foo.bar");
    });
    test("toArray()", () => {
      const p = pathBuilder(mockConfig, "fooware")
        .append("foo", "bar")
        .toArray()
        .join(".");
      expect(p).toBe("foo.bar");
    });
  });
});
