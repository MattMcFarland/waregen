import { Parser } from "../utils/xml";

import idx from "idx";
import { log, die, exhaustiveFail } from "../utils/System";
import Jetpack from "fs-jetpack";
import {
  X4WareGenXML,
  AddwareEntity,
  WareEntity
} from "@@/XMLTypes/X4WareGenXML";
import {
  DefaultWareEntity,
  BlueprintWareEntity,
  WareOrBlueprintEntity,
  DefaultBlueprintEntity
} from "@@/entities/Ware";
import { GeneratorConfig, ConfigSelector } from ".";

const setupConfig = async (
  configPath: string
): Promise<(selector: ConfigSelector) => string> => {
  const configData = await new Parser<X4WareGenXML>().parseFile(configPath);
  return (selector: ConfigSelector) => {
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

export class Config implements GeneratorConfig {
  private select: (selector: ConfigSelector) => string;
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
    return <AddwareEntity[]>(
      idx(this.configData, _ => _.addwares.generation[0].addware)
    );
  }
  get defaultWare() {
    return <DefaultWareEntity>(
      idx(this.configData, _ => _.addwares.configuration[0].defaults[0].ware[0])
    );
  }
  get defaultBlueprint() {
    return <DefaultBlueprintEntity>(
      idx(
        this.configData,
        _ => _.addwares.configuration[0].defaults[0].blueprint[0]
      )
    );
  }
  get modPrefix() {
    return this.select(ConfigSelector.PREFIX);
  }
  get gamePath() {
    return this.select(ConfigSelector.GAMEPATH);
  }
  get modPath() {
    return this.select(ConfigSelector.MODPATH);
  }
  get unpackedPath() {
    return this.select(ConfigSelector.UNPACKEDPATH);
  }
}

export async function getConfig(configPath: string) {
  const configXmlExists = Jetpack.exists(configPath);

  if (!configXmlExists) die(`${configPath} not found!`);

  log.start(`Using ${configPath}`);

  const config = await new Config(configPath).init();
  return config;
}
