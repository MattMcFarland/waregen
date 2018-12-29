import { mockGeneratorConfig } from "./util";
import Path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import zlib from "zlib";
import enqueueIconTextureImports from "../enqueueIconTextureImports";

declare module "fs" {
  export function reset(): void;
}

jest.mock(
  "fs",
  () =>
    new (require("metro-memory-fs"))({
      cwd: () => process.cwd(),
      platform: process.platform
    })
);

describe("generator/helpers/async/enqueueIconTextureImports", () => {
  const iconsPath = (p: string = "") =>
    Path.resolve("/test/Game/unpacked/assets/fx/gui/textures", p);
  const modIconsPath = (p: string = "") =>
    Path.resolve("/test/Game/extensions/test/assets/fx/gui/textures", p);
  beforeEach(done => {
    fs.reset();
    mkdirp.sync(iconsPath());
    mkdirp.sync(modIconsPath());
    const mockSource = Path.resolve("/mocksource.txt");
    fs.writeFileSync(mockSource, "hello world");
    const writestreamA = fs.createWriteStream(
      iconsPath("prod_cloned_macro_a.gz")
    );
    const writestreamB = fs.createWriteStream(
      iconsPath("prod_cloned_macro_b.gz")
    );
    const writestreamC = fs.createWriteStream(
      iconsPath("prod_cloned_macro_c.gz")
    );
    const writestreamD = fs.createWriteStream(
      iconsPath("prod_cloned_macro_d.gz")
    );
    const writestreamE = fs.createWriteStream(
      iconsPath("prod_cloned_macro_e.gz")
    );
    const tee = require("tee");

    fs.createReadStream(mockSource)
      .pipe(zlib.createGzip())
      .pipe(
        tee(
          writestreamA,
          writestreamB,
          writestreamC,
          writestreamD,
          writestreamE
        )
      );

    writestreamE.on("close", () => {
      done();
    });
  });

  test("creates appropriate icon textures files", async () => {
    const config = mockGeneratorConfig();
    const promises = enqueueIconTextureImports(config, {
      force: false,
      configXmlPath: ""
    });
    await Promise.all(promises);
    expect(
      fs.readFileSync(modIconsPath("pfx_prod_gen_a_macro.dds"), "utf8")
    ).toBe("hello world");
    expect(
      fs.readFileSync(modIconsPath("pfx_prod_gen_b_macro.dds"), "utf8")
    ).toBe("hello world");
    expect(
      fs.readFileSync(modIconsPath("pfx_prod_gen_c_macro.dds"), "utf8")
    ).toBe("hello world");
    expect(
      fs.readFileSync(modIconsPath("pfx_prod_gen_d_macro.dds"), "utf8")
    ).toBe("hello world");
    expect(
      fs.readFileSync(modIconsPath("pfx_prod_gen_e_macro.dds"), "utf8")
    ).toBe("hello world");
  });
});
