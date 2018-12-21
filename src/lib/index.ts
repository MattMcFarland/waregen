import Path from "path";
import Jetpack from "fs-jetpack";
import XML2JS from "xml2js";

import { die, log } from "./System";
import { setupConfig } from "./config";

const parser = new XML2JS.Parser();

export default async (configXmlPath: string, force: boolean) => {
  if (force)
    log.warn("FORCE ENABLED - I sure hope you know what you are doing!");

  const configXmlFullPath = Path.resolve(process.cwd(), configXmlPath);
  const configXmlStat = Jetpack.inspect(configXmlFullPath);

  if (!configXmlStat) die(`${configXmlFullPath} not found!`);

  log.start(`Using ${configXmlPath}`);

  const configSelect = await setupConfig(configXmlFullPath);

  const gamepath = configSelect("gamepath");
  log.info(`gamepath: ${gamepath}`);
};
