import { GeneratorConfig, GeneratorOptions } from "../../../generator";
import { AssetWareMacro } from "../../../entities";
import pathBuilder from "../../../utils/PathBuilder";

import { IdRoster } from "../../../utils/IdRoster";
import Mkdirp from "mkdirp";
import FS from "fs";

export default function enqueueMacroWareImports(
  config: GeneratorConfig,
  options: GeneratorOptions
) {
  const promises = config.addwaresList.map(addware => {
    return new Promise(async (resolve, reject) => {
      const ids = new IdRoster(addware.Attributes.id, config.modPrefix);

      const wareMacro = await new AssetWareMacro(ids.wareMacro, "ware_default");

      const destMacroPathDir = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .dirWareMacro()
        .resolve();

      const destMacroFile = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .fileWareMacroXML("xml")
        .resolve();

      Mkdirp.sync(destMacroPathDir);

      FS.writeFile(destMacroFile, wareMacro.toXml(), err => {
        if (err) return reject(err);
        return resolve(destMacroFile);
      });
    });
  });

  return promises;
}
