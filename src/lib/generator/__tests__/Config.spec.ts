import { getConfig } from "../Config";
import Path from "path";
import mkdirp from "mkdirp";
import fs from "fs";

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

const mockConfig = `
<?xml version="1.0" encoding="utf-8"?>
<addwares>
  <configuration>
    <prefix value="example"/>
    <gamepath value="%PROGRAMFILES(X86)%\Steam\steamapps\common\X4 Foundations"/>
    <modpath value="extensions\example"/>
    <unpackedpath value="unpacked-150"/>
    <defaults>
      <ware transport="container" volume="" tags="container economy">
        <price min="735" average="865" max="994" />
        <production time="300" amount="60" method="default">
          <primary>
            <ware ware="energycells" amount="20" />
            <ware ware="silicon" amount="40" />
          </primary>
          <effects>
            <effect type="work" product="0.2" />
          </effects>
        </production>
        <icon active="ware_default" video="ware_noicon_macro" />
      </ware>
      <blueprint description="{20104,12302}" transport="container" volume="1" tags="module">
        <price min="197231" average="232036" max="266841" />
        <production time="791" amount="1" method="default" name="{20206,101}">
          <primary>
            <ware ware="claytronics" amount="36" />
            <ware ware="energycells" amount="73" />
            <ware ware="hullparts" amount="135" />
          </primary>
        </production>
        <research time="10">
          <research>
            <ware ware="research_module_production" />
          </research>
        </research>
        <restriction licence="station_gen_basic" />
        <owner faction="antigone" />
        <owner faction="argon" />
        <owner faction="holyorder" />
        <owner faction="paranid" />
        <owner faction="teladi" />
      </blueprint>
    </defaults>
  </configuration>
  <generation>
    <addware id="glass" cloneProductionModuleFrom="prod_gen_refinedmetals" baskets="[refined, pirate_container, all_container, all]">
      <ware name="Glass" group="refined" transport="container" volume="32" tags="container economy">
        <price min="735" average="865" max="994" />
        <production time="300" amount="60" method="default" name="Glass">
          <primary>
            <ware ware="energycells" amount="50" />
            <ware ware="silicon" amount="80" />
          </primary>
          <effects>
            <effect type="work" product="0.2" />
          </effects>
        </production>
      </ware>
    </addware>
    <addware id="plastic" cloneProductionModuleFrom="prod_gen_refinedmetals" baskets="[refined, pirate_container, all_container, all]">
      <ware name="Plastic" group="refined" transport="container" volume="8" tags="container economy">
        <price min="456" average="567" max="786" />
        <production time="100" amount="60" method="default" name="Plastic">
          <primary>
            <ware ware="energycells" amount="300" />
            <ware ware="silicon" amount="20" />
          </primary>
          <effects>
            <effect type="work" product="0.2" />
          </effects>
        </production>
      </ware>
      <blueprint name="Glass Production" description="{20104,12302}" transport="container" volume="1" tags="module">
        <price min="197231" average="232036" max="266841" />
        <production time="791" amount="1" method="default" name="{20206,101}">
          <primary>
            <ware ware="claytronics" amount="36" />
            <ware ware="energycells" amount="73" />
            <ware ware="hullparts" amount="135" />
          </primary>
        </production>
      </blueprint>
    </addware>
  </generation>
</addwares>

`;

const configPath = (p: string = "") => Path.resolve("/test/xml", p);

describe("Config", () => {
  describe("getConfig", () => {
    beforeEach(() => {
      fs.reset();
      mkdirp.sync(configPath());
      fs.writeFileSync(configPath("config.xml"), mockConfig);
    });

    test("addwaresList is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.addwaresList).toBeDefined();
    });
    test("defaultBlueprint is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.defaultBlueprint).toBeDefined();
    });
    test("defaultWare is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.defaultWare).toBeDefined();
    });
    test("gamePath is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.gamePath).toBeDefined();
    });
    test("modPath is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.modPath).toBeDefined();
    });
    test("modPrefix is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.modPrefix).toBeDefined();
    });
    test("modPrefix is defined", async () => {
      const config = await getConfig(configPath("config.xml"));
      expect(config.unpackedPath).toBeDefined();
    });
  });
});
