import { mockGeneratorConfig } from "./util";
import Path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import zlib from "zlib";
import enqueueIconTextureImports from "../enqueueIconTextureImports";
import { EventEmitter } from "events";

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
  afterEach(() => {
    EventEmitter.defaultMaxListeners -= 5;
  });
  beforeEach(() => {
    EventEmitter.defaultMaxListeners += 5;
  });
  const iconsPath = (p: string = "") =>
    Path.resolve(
      "/test/Game/unpacked/assets/fx/gui/textures/stationmodules",
      p
    );
  const modIconsPath = (p: string = "") =>
    Path.resolve(
      "/test/Game/extensions/test/assets/fx/gui/textures/stationmodules",
      p
    );
  beforeEach(done => {
    fs.reset();
    mkdirp.sync(iconsPath());
    mkdirp.sync(modIconsPath());
    const mockSource = Path.resolve("/mocksource.txt");
    fs.writeFileSync(mockSource, "hello world");
    const writestreamA = fs.createWriteStream(
      iconsPath("prod_cloned_macro_a_macro.gz")
    );
    const writestreamB = fs.createWriteStream(
      iconsPath("prod_cloned_macro_b_macro.gz")
    );
    const writestreamC = fs.createWriteStream(
      iconsPath("prod_cloned_macro_c_macro.gz")
    );
    const writestreamD = fs.createWriteStream(
      iconsPath("prod_cloned_macro_d_macro.gz")
    );
    const writestreamE = fs.createWriteStream(
      iconsPath("prod_cloned_macro_e_macro.gz")
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
    writestreamA.on("close", () => {
      writestreamA.removeAllListeners();
    });
    writestreamB.on("close", () => {
      writestreamB.removeAllListeners();
    });
    writestreamC.on("close", () => {
      writestreamC.removeAllListeners();
    });
    writestreamD.on("close", () => {
      writestreamD.removeAllListeners();
    });
    writestreamE.on("close", () => {
      writestreamE.removeAllListeners();
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
