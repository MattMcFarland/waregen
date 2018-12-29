import { GeneratorConfig, GeneratorOptions } from "../..";
import contentFile from "../../../../assets/example/content.xml";
import setup from "../../../../assets/example/md/Example_Setup_Gamestarts.xml";
import gamestarts from "../../../../assets/example/libraries/gamestarts.xml";
import mkdirp from "mkdirp";
import { PathBuilder } from "../../../utils/PathBuilder";

import { safeWrite, log } from "../../../utils";

export default async function createExample(
  config: GeneratorConfig,
  options: GeneratorOptions
) {
  if (config.modPrefix === "example") {
    log.note(
      "Creating a custom game because the modPrefix is labelled example!!!"
    );
    const librariesDir = new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .append("libraries")
      .resolve();

    const mdDir = new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .append("md")
      .resolve();

    const gamestartsXmlPath = new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .fileLibrary("gamestarts", "xml")
      .resolve();
    const gameSetupXmlPath = new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .append("md", "Example_Setup_Gamestarts.xml")
      .resolve();

    const contentXmlPath = new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .append("content.xml")
      .resolve();

    mkdirp.sync(librariesDir);
    mkdirp.sync(mdDir);

    log.write(gamestartsXmlPath);
    await safeWrite(gamestartsXmlPath, gamestarts, options);
    log.write(gameSetupXmlPath);
    await safeWrite(gameSetupXmlPath, setup, options);
    log.write(contentXmlPath);
    await safeWrite(contentXmlPath, contentFile, options);
    log.note(
      "This is only because modPrefix is example, otherwise none of the content/gamestart files would be created!"
    );
  }
}
