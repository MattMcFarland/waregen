import { mockGeneratorConfig } from "./util";
import processWares from "../processWares";
import Path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import zlib from "zlib";
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

const pkgIconsPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/assets/fx/gui/textures", p);

const pkgMacrosPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/assets/structures/production/macros", p);

const pkgProdMacrosPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/assets/structures/production/macros", p);

const pkgLibrariesPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/libraries", p);

const pkgIndexPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/libraries", p);

const pkgWareMacrosPath = (p: string = "") =>
  Path.resolve("/test/Game/unpacked/assets/wares/macros", p);

const modIconsPath = (p: string = "") =>
  Path.resolve("/test/Game/extensions/test/assets/fx/gui/textures", p);

const modMacrosPath = (p: string = "") =>
  Path.resolve(
    "/test/Game/extensions/test/assets/structures/production/macros",
    p
  );

const modLibrariesPath = (p: string = "") =>
  Path.resolve("/test/Game/extensions/test/libraries", p);

const modIndexPath = (p: string = "") =>
  Path.resolve("/test/Game/extensions/test/index", p);

const modWareMacroPath = (p: string = "") =>
  Path.resolve("/test/Game/extensions/test/assets/wares/macros", p);

const xml = `<?xml version="1.0" encoding="utf-8"?>
<!--Exported by: Florian (192.168.3.134) at 23.11.2018_17-23-39-->
<macros>
  <macro name="prod_gen_refinedmetals_macro" class="production">
    <component ref="prod_gen_refinedmetals" />
    <properties>
      <identification name="{20104,12301}" shortname="{20104,12303}" description="{20104,12302}" />
      <build>
        <sets>
          <set ref="factory" />
          <set ref="headquarters_player" />
        </sets>
      </build>
      <explosiondamage value="10000" />
      <hull max="210000" />
      <secrecy level="2" />
      <production wares="refinedmetals">
        <queue ware="refinedmetals" />
      </production>
      <workforce max="150" />
    </properties>
  </macro>
</macros>
`;

describe("processWares", () => {
  afterEach(() => {
    EventEmitter.defaultMaxListeners -= 5;
  });
  beforeEach(async done => {
    EventEmitter.defaultMaxListeners += 5;
    fs.reset();
    mkdirp.sync(pkgMacrosPath());
    mkdirp.sync(pkgIconsPath());
    mkdirp.sync(pkgProdMacrosPath());
    mkdirp.sync(pkgLibrariesPath());
    mkdirp.sync(pkgIndexPath());
    mkdirp.sync(pkgWareMacrosPath());
    fs.writeFileSync(pkgMacrosPath("prod_cloned_macro_a.xml"), xml);
    fs.writeFileSync(pkgMacrosPath("prod_cloned_macro_b.xml"), xml);
    fs.writeFileSync(pkgMacrosPath("prod_cloned_macro_c.xml"), xml);
    fs.writeFileSync(pkgMacrosPath("prod_cloned_macro_d.xml"), xml);
    fs.writeFileSync(pkgMacrosPath("prod_cloned_macro_e.xml"), xml);
    const mockSource = Path.resolve("/mocksource.txt");
    fs.writeFileSync(mockSource, "hello world");
    const writestreamA = fs.createWriteStream(
      pkgIconsPath("prod_cloned_macro_a.gz")
    );
    const writestreamB = fs.createWriteStream(
      pkgIconsPath("prod_cloned_macro_b.gz")
    );
    const writestreamC = fs.createWriteStream(
      pkgIconsPath("prod_cloned_macro_c.gz")
    );
    const writestreamD = fs.createWriteStream(
      pkgIconsPath("prod_cloned_macro_d.gz")
    );
    const writestreamE = fs.createWriteStream(
      pkgIconsPath("prod_cloned_macro_e.gz")
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
  test("creates directory and files for {mod}/libraries", async () => {
    const config = mockGeneratorConfig();
    await processWares(config, {
      force: false,
      configXmlPath: ""
    });
    const librariesDir = fs.readdirSync(modLibrariesPath());
    expect(librariesDir).toContain("baskets.xml");
    expect(librariesDir).toContain("icons.xml");
    expect(librariesDir).toContain("wares.xml");
    expect(librariesDir).toContain("modulegroups.xml");
    expect(librariesDir).toContain("modules.xml");
    expect(librariesDir).toContain("wares.xml");
  });
  test("creates directory and files for {mod}/index", async () => {
    const config = mockGeneratorConfig();
    await processWares(config, {
      force: false,
      configXmlPath: ""
    });
    const indexDir = fs.readdirSync(modIndexPath());
    expect(indexDir).toContain("macros.xml");
  });
  test("creates directory and files for {mod}/assets/fx/gui/textures", async () => {
    const config = mockGeneratorConfig();
    await processWares(config, {
      force: false,
      configXmlPath: ""
    });
    const indexDir = fs.readdirSync(modIconsPath());
    expect(indexDir).toContain("pfx_prod_gen_a_macro.dds");
    expect(indexDir).toContain("pfx_prod_gen_b_macro.dds");
    expect(indexDir).toContain("pfx_prod_gen_c_macro.dds");
    expect(indexDir).toContain("pfx_prod_gen_d_macro.dds");
    expect(indexDir).toContain("pfx_prod_gen_e_macro.dds");
  });
  test("creates directory and files for {mod}/assets/structures/production/macros", async () => {
    const config = mockGeneratorConfig();
    await processWares(config, {
      force: false,
      configXmlPath: ""
    });
    const prodMacrosDir = fs.readdirSync(modMacrosPath());
    expect(prodMacrosDir).toContain("pfx_prod_gen_a_macro.xml");
    expect(prodMacrosDir).toContain("pfx_prod_gen_b_macro.xml");
    expect(prodMacrosDir).toContain("pfx_prod_gen_c_macro.xml");
    expect(prodMacrosDir).toContain("pfx_prod_gen_d_macro.xml");
    expect(prodMacrosDir).toContain("pfx_prod_gen_e_macro.xml");
  });
  test("creates directory and files for {mod}/assets/wares/macros", async () => {
    const config = mockGeneratorConfig();
    await processWares(config, {
      force: false,
      configXmlPath: ""
    });
    const wareMacrosDir = fs.readdirSync(modWareMacroPath());
    expect(wareMacrosDir).toContain("ware_pfx_a_macro.xml");
    expect(wareMacrosDir).toContain("ware_pfx_b_macro.xml");
    expect(wareMacrosDir).toContain("ware_pfx_c_macro.xml");
    expect(wareMacrosDir).toContain("ware_pfx_d_macro.xml");
    expect(wareMacrosDir).toContain("ware_pfx_e_macro.xml");
  });
});
