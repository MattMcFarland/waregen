import { GeneratorConfig, GeneratorOptions } from "@@/generator";
import { AssetWareProdMacro } from "@@/entities";
import pathBuilder from "@@/utils/PathBuilder";
import { Parser } from "@@/utils/xml";
import { IdRoster } from "@@/utils/IdRoster";
import Mkdirp from "mkdirp";
import FS from "fs";

export default function enqueueMacroImports(
  config: GeneratorConfig,
  options: GeneratorOptions
) {
  const promises = config.addwaresList.map(addware => {
    return new Promise(async (resolve, reject) => {
      const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
      const sourceMacro = addware.Attributes.cloneProductionModuleFrom;
      const sourceMacroPath = pathBuilder(
        config,
        addware.Attributes.cloneProductionModuleFrom
      )
        .dirFullGamepath()
        .dirUnpackedPath()
        .dirProductionMacros()
        .append(sourceMacro + ".xml")
        .resolve();

      const parser = new Parser();
      const data = await parser.parseFile(sourceMacroPath);

      const cloneMacro = await new AssetWareProdMacro(data.macros);
      cloneMacro.id = ids.productionMacro;
      cloneMacro.name = addware.Attributes.id;
      cloneMacro.shortname = addware.Attributes.id;
      cloneMacro.production = ids.ware;

      const destMacroPathDir = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .dirProductionMacros()
        .resolve();

      const destMacroFile = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .fileProductionMacroXML("xml")
        .resolve();

      Mkdirp.sync(destMacroPathDir);

      FS.writeFile(destMacroFile, cloneMacro.toXml(), err => {
        if (err) return reject(err);
        return resolve(destMacroFile);
      });
    });
  });

  return promises;
}
