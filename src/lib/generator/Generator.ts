import { Config, getConfig } from "@@/Config";
import { Resolver } from "@@/utils/PathResolver";
import {
  DefaultsEntity,
  Addwares as AddwaresList
} from "@@/XMLTypes/X4WareGenXML";

const asyncProps: { resolved: Bootstrap } = { resolved: {} };

export class Generator {
  get config(): Config {
    if (!asyncProps.resolved.config) return missing("config");
    return asyncProps.resolved.config;
  }
  get resolver(): Resolver {
    if (!asyncProps.resolved.resolver) return missing("resolver");
    return asyncProps.resolved.resolver;
  }
  async initialize(configXmlPath: string): Promise<this> {
    asyncProps.resolved = await bootstrap(configXmlPath);
    return this;
  }
  async processWares() {}
}

function missing(prop: string): never {
  throw new TypeError(`${prop} missing! Did you forget to call initialize() ?`);
}

const bootstrap = async (configXmlPath: string): Promise<Bootstrap> => {
  const configXmlFullPath = Resolver.resolveConfigPath(configXmlPath);
  const config = await getConfig(configXmlFullPath);
  const { gamepath, prefix, modpath, unpackedpath } = config;
  return {
    config,
    resolver: new Resolver(gamepath, prefix, modpath, unpackedpath)
  };
};

interface Bootstrap {
  config?: Config;
  resolver?: Resolver;
}
