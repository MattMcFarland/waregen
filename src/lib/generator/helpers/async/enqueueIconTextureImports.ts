import zlib from "zlib";
import fs from "fs";
import pathBuilder from "@@/utils/PathBuilder";
import { IdRoster } from "@@/utils/IdRoster";
import { GeneratorConfig, GeneratorOptions } from "@@/generator";
import Mkdirp from "mkdirp";

export default function enqueueIconTextureImports(
  config: GeneratorConfig,
  options: GeneratorOptions
): Promise<string>[] {
  return config.addwaresList.map(addware => {
    return new Promise(resolve => {
      const sourcePath = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirUnpackedPath()
        .dirIcons()
        .append(addware.Attributes.cloneProductionModuleFrom + ".gz")
        .resolve();

      const destIconDir = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .dirIcons()
        .resolve();

      const destinationPath = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirModPath()
        .fileIconDDS("dds")
        .resolve();

      Mkdirp.sync(destIconDir);

      const writestream = fs.createWriteStream(destinationPath);

      fs.createReadStream(sourcePath)
        .pipe(zlib.createGunzip())
        .pipe(writestream);

      writestream.on("close", () => {
        resolve(destinationPath);
      });
    });
  });
}
