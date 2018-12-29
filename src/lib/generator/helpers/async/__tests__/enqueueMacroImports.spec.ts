import { mockGeneratorConfig } from "./util";
import enqueueMacroImports from "../enqueueMacroImports";
import Path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
import Parser from "../../../../utils/xml/Parser";
import { AssetWareProdMacro } from "../../../../entities";

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

describe("helpers/async/enqueueMacroImports", () => {
  const macrosPath = (p: string = "") =>
    Path.resolve("/test/Game/unpacked/assets/structures/production/macros", p);
  const modMacrosPath = (p: string = "") =>
    Path.resolve(
      "/test/Game/extensions/test/assets/structures/production/macros",
      p
    );

  beforeEach(() => {
    fs.reset();
    mkdirp.sync(macrosPath());
    mkdirp.sync(modMacrosPath());

    fs.writeFileSync(macrosPath("prod_cloned_macro_a.xml"), xml);
    fs.writeFileSync(macrosPath("prod_cloned_macro_b.xml"), xml);
    fs.writeFileSync(macrosPath("prod_cloned_macro_c.xml"), xml);
    fs.writeFileSync(macrosPath("prod_cloned_macro_d.xml"), xml);
    fs.writeFileSync(macrosPath("prod_cloned_macro_e.xml"), xml);
  });
  test("creates appropriate AssetWareProdMacro files", async () => {
    const config = mockGeneratorConfig();
    const promises = Promise.all(
      enqueueMacroImports(config, {
        force: false,
        configXmlPath: ""
      })
    );
    await promises;
    const macro = async (p: string) => {
      const data = await new Parser().parseFile(p);
      return new AssetWareProdMacro(data.macros);
    };

    const newMacroA = await macro(modMacrosPath("pfx_prod_gen_a_macro.xml"));
    const newMacroB = await macro(modMacrosPath("pfx_prod_gen_b_macro.xml"));
    const newMacroC = await macro(modMacrosPath("pfx_prod_gen_c_macro.xml"));
    const newMacroD = await macro(modMacrosPath("pfx_prod_gen_d_macro.xml"));
    const newMacroE = await macro(modMacrosPath("pfx_prod_gen_e_macro.xml"));

    expect(newMacroA.id).toBe("pfx_prod_gen_a_macro");
    expect(newMacroA.name).toBe("a");
    expect(newMacroA.shortname).toBe("a");
    expect(newMacroA.production).toBe("pfx_a");

    expect(newMacroB.id).toBe("pfx_prod_gen_b_macro");
    expect(newMacroB.name).toBe("b");
    expect(newMacroB.shortname).toBe("b");
    expect(newMacroB.production).toBe("pfx_b");

    expect(newMacroC.id).toBe("pfx_prod_gen_c_macro");
    expect(newMacroC.name).toBe("c");
    expect(newMacroC.shortname).toBe("c");
    expect(newMacroC.production).toBe("pfx_c");

    expect(newMacroD.id).toBe("pfx_prod_gen_d_macro");
    expect(newMacroD.name).toBe("d");
    expect(newMacroD.shortname).toBe("d");
    expect(newMacroD.production).toBe("pfx_d");

    expect(newMacroE.id).toBe("pfx_prod_gen_e_macro");
    expect(newMacroE.name).toBe("e");
    expect(newMacroE.shortname).toBe("e");
    expect(newMacroE.production).toBe("pfx_e");
  });
});
