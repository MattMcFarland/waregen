import * as XMLUtils from "./utils/xml/XMLUtils";
import { get } from "lodash";
import { log, die, exhaustiveFail } from "./utils/System";
import Jetpack from "fs-jetpack";

enum WareGenConfigItem {
  PREFIX = "prefix",
  GAMEPATH = "gamepath",
  MODPATH = "modpath",
  UNPACKEDPATH = "unpackedpath",
  DEFAULTS = "defaults"
}

const setupConfig = async (
  configPath: string
): Promise<(selector: WareGenConfigItem) => string> => {
  const configData = await XMLUtils.readAbsXMLFile<string>(configPath);
  return (selector: WareGenConfigItem) => {
    const obj: any = configData.definition;
    const result = <any>(
      get(obj, `addwares.configuration[0].${selector}[0].$.value`)
    );
    if (typeof result === undefined) {
      exhaustiveFail(`<${selector}/> missing in configuration xml`);
    }

    return <string>(
      result.replace(/%(.*)%/gm, (match: string, p1: string) =>
        match.replace(match, <string>process.env[p1])
      )
    );
  };
};

class Config {
  private select: (selector: WareGenConfigItem) => string;
  private configPath: string;
  constructor(configPath: string) {
    this.configPath = configPath;
    this.select = () => "You must call async init function first";
  }
  async init() {
    this.select = await setupConfig(this.configPath);
    return this;
  }
  get prefix() {
    return this.select(WareGenConfigItem.PREFIX);
  }
  get gamepath() {
    return this.select(WareGenConfigItem.GAMEPATH);
  }
  get modpath() {
    return this.select(WareGenConfigItem.MODPATH);
  }
  get unpackedpath() {
    return this.select(WareGenConfigItem.UNPACKEDPATH);
  }
  get defaults() {
    return this.select(WareGenConfigItem.DEFAULTS);
  }
}

export async function getConfig(configPath: string) {
  const configXmlExists = Jetpack.exists(configPath);

  if (!configXmlExists) die(`${configPath} not found!`);

  log.start(`Using ${configPath}`);

  const config = await new Config(configPath).init();
  return config;
}
