import {
  createBasketCollection,
  createIcons,
  createMacroIndex,
  createModuleGroups,
  createModules,
  createWareCollection
} from "..";

import {
  enqueueMacroImports,
  enqueueIconTextureImports,
  enqueueFileWrites,
  enqueueMacroWareImports,
  createExample
} from ".";

import { GeneratorConfig, GeneratorOptions } from "../../../generator";

export default async function processWares(
  config: GeneratorConfig,
  options: GeneratorOptions
) {
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
  const iconCollection = createIcons(config);

  /* Create Ware Entity and add it to Collection */
  const wareCollection = createWareCollection(config);

  /* Create "Module Groups" Collection */
  const moduleGroupsCollection = createModuleGroups(config);

  /* Create Modules Collection */
  const modulesCollection = createModules(config);

  /* Create the Basket Collection */
  const basketCollection = createBasketCollection(config);

  /* Create Array of Promises to import asset Production Macros */
  const importWareProdAssets = enqueueMacroImports(config, options);

  /* Create Array of Promises to create asset Ware Macros */

  const importWareAssets = enqueueMacroWareImports(config, options);

  /* Arry of Promises for gunzipping icons from unpacked to their destination*/
  const importIconTextures = enqueueIconTextureImports(config, options);

  /* Array of Promises for writing the files */
  const fileWrites = enqueueFileWrites(
    [
      macrosIndex,
      iconCollection,
      wareCollection,
      basketCollection,
      moduleGroupsCollection,
      modulesCollection
    ],
    config,
    options
  );
  createExample(config, options);
  // /* return the promises to be resolved */
  return Promise.all([
    ...fileWrites,
    ...importWareAssets,
    ...importIconTextures,
    ...importWareProdAssets
  ]);
}
