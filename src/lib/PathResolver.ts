import { resolve as resolvePath } from "path";
import { log } from "./System";
export enum Sources {
  FromMod,
  FromUnpacked
}
type OneOfSources = Sources.FromMod | Sources.FromUnpacked;

export class Resolver {
  gamepath: string;
  modPrefix: string;
  modPath: string;
  unpackedPath: string;

  /**
   * @param wareId: ware id as described in config xml
   */
  getWareName = (wareId: string) => `${this.modPrefix}_${wareId}`;

  /**
   * @param wareId: ware id as described in config xml
   */
  getProductionName = (wareId: string) =>
    `${this.modPrefix}_prod_gen_${wareId}`;

  /**
   * @param wareId: ware id as described in config xml
   */
  getProductionMacroName = (wareId: string) =>
    `${this.modPrefix}_prod_gen_${wareId}_macro`;

  /**
   * @param wareId: ware id as described in config xml
   */
  getWareMacroName = (wareId: string) =>
    `${this.modPrefix}_ware_${wareId}_macro`;

  /**
   * @param path: resolves path from contetx of mod folder
   */
  resolveFromMod = (path: string) =>
    resolvePath(this.gamepath + "/" + this.modPath, path);

  /**
   * @param path: resolves path from contetx of unpacked folder
   */
  resolveFromUnpacked = (path: string) =>
    resolvePath(this.gamepath + "/" + this.unpackedPath, path);

  /**
   * @param source: Either mod or unpacked
   */
  maybeModOrUnpacked = (source: OneOfSources) =>
    /**
     * @param whenMod: When resolving the path for this item in the mod
     * @param whenUnpacked: When resolving the path for this item in unpacked
     */
    (whenMod: () => string, whenUnpacked: () => string) => {
      switch (source) {
        case Sources.FromMod:
          return this.resolveFromMod(whenMod());
        case Sources.FromUnpacked:
          return this.resolveFromUnpacked(whenUnpacked());
        default:
          log.error(`Unspecified Source`);
      }
    };

  /**
   * Retrieves file from assets/wares/macros
   * @param {OneOfSources} source -  FromMod | FromUnpacked
   * @param {string} wareId
   * @returns {string} `FULL_PATH/assets/wares/macros/$FILE`
   */
  resolveWareMacroPath = (source: OneOfSources, wareId: string) => {
    const wareMacroName = this.getWareMacroName(wareId);
    return this.maybeModOrUnpacked(source)(
      () => `assets/wares/macros/${wareMacroName}.xml`,
      () => `assets/wares/macros/ware_default_macro.xml`
    );
  };

  /**
   * Retreives file from libraries
   * @param {OneOfSources} source FromMod | FromUnpacked
   * @param {string} name filename without extension
   * @returns {string} `FULL_PATH/libraries/$FILE`
   */
  resolveLibraryPath = (source: OneOfSources, name: string) => {
    const relPath = `libraries/${name}`;
    return this.maybeModOrUnpacked(source)(() => relPath, () => relPath);
  };

  /**
   * Retrieves file from assets/fx/gui/textures/stationmodules
   * @param {OneOfSources} source - FromMod | FromUnpacked
   * @param {string} wareId
   * @param {string} cloneProductionModuleFrom
   * @returns {string} `FULL_PATH/assets/fx/gui/textures/stationmodules/$FILE`
   */
  resolveProductionModuleIconPath = (
    source: OneOfSources,
    wareId: string,
    cloneProductionModuleFrom: string
  ) => {
    return this.maybeModOrUnpacked(source)(
      () => {
        const prodMacroName = this.getProductionMacroName(wareId);
        return `assets/fx/gui/textures/stationmodules/${prodMacroName}.dds`;
      },
      () =>
        `assets/fx/gui/textures/stationmodules/${cloneProductionModuleFrom}_macro.gz`
    );
  };

  /**
   * Retrieves file from assets/structures/production/macros/
   * @param {OneOfSources} source - FromMod | FromUnpacked
   * @param {string} wareId
   * @param {string} cloneProductionModuleFrom
   * @returns {string} `FULL_PATH/assets/structures/production/macros/$FILE`
   */
  resolveProductionModuleFromPath = (
    source: OneOfSources,
    wareId: string,
    cloneProductionModuleFrom: string
  ) => {
    return this.maybeModOrUnpacked(source)(
      () => {
        const prodMacroName = this.getProductionMacroName(wareId);
        return `assets/structures/production/macros/${prodMacroName}.xml`;
      },
      () =>
        `assets/structures/production/macros/${cloneProductionModuleFrom}_macro.xml`
    );
  };

  constructor(
    gamepath: string,
    modPrefix: string,
    modPath: string,
    unpackedPath: string
  ) {
    this.gamepath = gamepath;
    this.modPrefix = modPrefix;
    this.modPath = modPath;
    this.unpackedPath = unpackedPath;
  }
}
