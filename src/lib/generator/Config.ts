import { log } from "../utils/System";
import { GeneratorConfig } from ".";
import Path from "path";
import idx from "idx";
import Parser from "../utils/xml/Parser";
import {
  X4WareGenXML,
  AddwareEntity,
  WareEntity,
  BlueprintEntity
} from "../XMLTypes/X4WareGenXML";
export const getConfig = async (path: string): Promise<GeneratorConfig> => {
  log.start(`Using ${path}`);
  const absPath = Path.resolve(path);
  const configData = await new Parser().parseFile(absPath);
  return new Config(configData);
};

class Config implements GeneratorConfig {
  private _addwaresList: AddwareEntity[];
  private _defaultWare: WareEntity;
  private _defaultBlueprint: BlueprintEntity;
  private _modPrefix: string;
  private _gamePath: string;
  private _modPath: string;
  private _unpackedPath: string;

  get addwaresList() {
    return this._addwaresList;
  }
  get defaultWare() {
    return this._defaultWare;
  }
  get defaultBlueprint() {
    return this._defaultBlueprint;
  }
  get modPrefix() {
    return this._modPrefix;
  }
  get gamePath() {
    return this._gamePath;
  }
  get modPath() {
    return this._modPath;
  }
  get unpackedPath() {
    return this._unpackedPath;
  }
  constructor(cfg: X4WareGenXML) {
    this._addwaresList = <AddwareEntity[]>(
      idx(cfg, _ => _.addwares.generation[0].addware)
    );
    const configuration = cfg.addwares.configuration;
    if (!configuration) {
      throw new TypeError("<configuration> Node missing from xml file");
    }
    if (!configuration[0]) {
      throw new TypeError("<configuration> Node empty!");
    }

    const defaults = configuration[0].defaults;

    if (!defaults) {
      throw new TypeError("<defaults> Node missing!");
    }
    if (!defaults[0]) {
      throw new TypeError("<defaults> Node empty!!");
    }
    if (!defaults[0].ware) {
      throw new TypeError("default <ware> Node missing!");
    }
    if (!defaults[0].ware[0]) {
      throw new TypeError("default <ware> Node empty!");
    }

    this._defaultWare = defaults[0].ware[0];

    if (!defaults[0].blueprint) {
      throw new TypeError("default <blueprint> Node missing!");
    }

    if (!defaults[0].blueprint[0]) {
      throw new TypeError("default <blueprint> Node empty!");
    }

    this._defaultBlueprint = defaults[0].blueprint[0];

    if (!configuration[0].prefix) {
      throw new TypeError("<prefix> node missing!");
    }

    this._modPrefix = transformEnvVars(
      configuration[0].prefix[0].Attributes.value
    );

    if (!configuration[0].gamepath) {
      throw new TypeError("<gamepath> node missing!");
    }

    this._gamePath = transformEnvVars(
      configuration[0].gamepath[0].Attributes.value
    );

    if (!configuration[0].modpath) {
      throw new TypeError("<modpath> node missing!");
    }

    this._modPath = transformEnvVars(
      configuration[0].modpath[0].Attributes.value
    );

    if (!configuration[0].unpackedpath) {
      throw new TypeError("<unpackedpath> node missing!");
    }

    this._unpackedPath = transformEnvVars(
      configuration[0].unpackedpath[0].Attributes.value
    );
  }
}

function transformEnvVars(str: string) {
  return <string>(
    str.replace(/%(.*)%/gm, (match: string, p1: string) =>
      match.replace(match, <string>process.env[p1])
    )
  );
}
