import { resolve as resolvePath } from "path";
import { Config, getConfig } from "@@/generator/Config";
import { end } from "@@/utils/System";
import { GeneratorOptions } from "./";
import processWares from "./helpers/async/processWares";

const asyncProps: { resolved: Bootstrap } = { resolved: {} };

export default class Generator {
  get config(): Config {
    if (!asyncProps.resolved.config) return missing("config");
    return asyncProps.resolved.config;
  }
  get options(): GeneratorOptions {
    if (!asyncProps.resolved.options) return missing("options");
    return asyncProps.resolved.options;
  }
  async initialize(options: GeneratorOptions): Promise<this> {
    asyncProps.resolved = await bootstrap(options);
    return this;
  }
  async processWares() {
    return await processWares(this.config, this.options);
  }
}

function missing(prop: string): never {
  throw new TypeError(`${prop} missing! Did you forget to call initialize() ?`);
}

const bootstrap = async (options: GeneratorOptions): Promise<Bootstrap> => {
  const configXmlFullPath = resolvePath(process.cwd(), options.configXmlPath);
  const config = await getConfig(configXmlFullPath);
  if (!config.addwaresList) {
    end("No wares to generate!");
  }
  return { config, options };
};

interface Bootstrap {
  config?: Config;
  options?: GeneratorOptions;
}
