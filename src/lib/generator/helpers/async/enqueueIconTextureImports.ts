import zlib from "zlib";
import fs from "fs";
import pathBuilder from "../../../utils/PathBuilder";
import { GeneratorConfig, GeneratorOptions } from "../../../generator";
import Mkdirp from "mkdirp";
import { EventEmitter } from "events";

export default function enqueueIconTextureImports(
  config: GeneratorConfig,
  options: GeneratorOptions
): Promise<string>[] {
  return config.addwaresList.map(addware => {
    EventEmitter.defaultMaxListeners += 1;
    return new Promise(resolve => {
      const sourcePath = pathBuilder(config, addware.Attributes.id)
        .dirFullGamepath()
        .dirUnpackedPath()
        .dirIcons()
        .append(addware.Attributes.cloneProductionModuleFrom + "_macro.gz")
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
      fs.writeFileSync(destinationPath, "");
      const writestream = fs.createWriteStream(destinationPath);

      fs.createReadStream(sourcePath)
        .pipe(zlib.createGunzip())
        .pipe(writestream);

      writestream.on("close", () => {
        EventEmitter.defaultMaxListeners -= 1;
        writestream.removeAllListeners();
        resolve(destinationPath);
      });
    });
  });
}
