import { Parser } from "./utils/xml";
import { safeRead as readAbsXMLFile } from "./utils/fs";
import idx from "idx";
import { log, die, exhaustiveFail } from "./utils/System";
import Jetpack from "fs-jetpack";
import {
  X4WareGenXML,
  Addwares as AddwaresList,
  DefaultsEntity
} from "@@/XMLTypes/X4WareGenXML";

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
  const configData = await new Parser<X4WareGenXML>().parseFile(configPath);
  return (selector: WareGenConfigItem) => {
    const result = <string>(
      (<unknown>idx(configData, _ => _.addwares.configuration[0][selector]))
    );
    if (typeof result !== "string") {
      exhaustiveFail(`<${selector}/> missing in configuration xml`);
    }
    return <string>(
      result.replace(/%(.*)%/gm, (match: string, p1: string) =>
        match.replace(match, <string>process.env[p1])
      )
    );
  };
};

export class Config {
  private select: (selector: WareGenConfigItem) => string;
  private configPath: string;
  private configData: X4WareGenXML | undefined;
  constructor(configPath: string) {
    this.configPath = configPath;
    this.select = () => "You must call async init function first";
  }
  async init() {
    this.select = await setupConfig(this.configPath);
    return this;
  }
  get addwaresList() {
    return <AddwaresList>(
      idx(this.configData, _ => _.addwares.generation[0].addware)
    );
  }
  get defaultWare() {
    return <DefaultsEntity>(
      idx(this.configData, _ => _.addwares.configuration[0].defaults[0])
    );
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
}

export async function getConfig(configPath: string) {
  const configXmlExists = Jetpack.exists(configPath);

  if (!configXmlExists) die(`${configPath} not found!`);

  log.start(`Using ${configPath}`);

  const config = await new Config(configPath).init();
  return config;
}
