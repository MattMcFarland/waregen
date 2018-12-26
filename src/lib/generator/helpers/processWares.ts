import { DefaultsEntity, AddwareEntity } from "@@/XMLTypes/X4WareGenXML";
import createMacroIndex from "./createMacroIndex";

import {
  WareCollection,
  IndexHash,
  IconCollection,
  BasketCollection,
  ModuleGroupsCollection,
  AssetWareMacro,
  AssetWareProdMacro
} from "@@/entities";
import { GeneratorConfig, GeneratorOptions } from "@@/generator";

export default async function processWares(
  config: GeneratorConfig,
  options: GeneratorOptions
) {
  // const iconCollection = new IconCollection();
  // const moduleGroupsCollection = new ModuleGroupsCollection();
  // const importAssetWareMacros: Promise<AssetWareMacro>[] = [];
  // const importAssetWareProdMacros: Promise<AssetWareProdMacro>[] = [];
  /* 
    Create all of the X4Entity types, which will be used later
    for writing to the file system.
    Queue up any of the asyncronous tasks for later, to keep
    our assessment fast.

    (rationale: While we could do more with one loop, the addWare list is
    constant (k) - so worst case scenario is big O of k.
    In fact, it could be much easier to introduce performance issues
    by adding additional logic to a single loop. so we'll just loop over 
    the constant as much as we need to) ;)  
  */
  /* Create the Macros Index */
  const macrosIndex = createMacroIndex(config);
  /* Create the Icon Collection */
  // todo const iconCollection = createIcons(config, options);
  /* Create Ware Entity and add it to Collection */
  // todo const wareCollection = createWareCollection(config, options)
  /* Create the Basket Collection */
  // todo const basketCollection = createBasketCollection(config, options)
  /* Create "Module Groups" Collection */
  // todo const moduleGroupsCollection = createModuleGroups(config, options)
  /* Create Modules Collection */
  // todo const modulesCollection = createModules(config, options)
  /* Create Array of Promises to import Asset Ware Macros and asset Production Macros */
  // todo const importWareAssets = enqueueMacroImports(config, options)
  /* Arry of Promises for gunzipping icons from unpacked to their destination*/
  // todo const importIconTextures = enqueueIconTextureImports(config, options)
  /* Array of Promises for writing the files */
  // todo consider using Object.entries over a setup object instead.
  // todo const fileWrites = enqueueFileWrites([ macrosIndex, iconCollection, wareCollection, basketCollection, moduleGroupsCollection, modulesCollection ], config, options)
  /* return the promises to be resolved */
  // todo return Promise.all([...fileWrites, ...importWareAssets, ...importIconTextures])
}
