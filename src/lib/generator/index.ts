import {
  AddwareEntity,
  WareEntity,
  BlueprintEntity
} from "../XMLTypes/X4WareGenXML";

export { default as generate } from "./generate";
export { getConfig } from "./Config";

export interface GeneratorConfig {
  readonly addwaresList: AddwareEntity[];
  readonly defaultWare: WareEntity;
  readonly defaultBlueprint: BlueprintEntity;
  readonly modPrefix: string;
  readonly gamePath: string;
  readonly modPath: string;
  readonly unpackedPath: string;
}

export interface GeneratorOptions {
  configXmlPath: string;
  force: boolean;
}

export enum ConfigSelector {
  PREFIX = "prefix",
  GAMEPATH = "gamepath",
  MODPATH = "modpath",
  UNPACKEDPATH = "unpackedpath",
  DEFAULTS = "defaults"
}
