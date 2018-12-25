import { Resolver } from "@@/lib/utils";
import { DefaultsEntity, AddwareEntity } from "@@/XMLTypes/X4WareGenXML";
import createWare from "./createWare";
import {
  WareCollection,
  IndexHash,
  IconCollection,
  BasketCollection,
  ModuleGroupsCollection,
  AssetWareMacro,
  AssetWareProdMacro
} from "@@/lib/entities";

/**
 * Asyncronuosly do all the things
 * @param addWares
 * @param resolver
 * @param defaults
 */
export default async function processWares(
  addWares: AddwareEntity[],
  resolver: Resolver,
  defaults: DefaultsEntity,
  force: boolean
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
  // todo const macrosIndex = createMacroIndex(resolver, defaults, addWares);
  /* Create the Icon Collection */
  // todo const iconCollection = createIcons(resolver, defaults, addWares);
  /* Create Ware Entity and add it to Collection */
  // todo const wareCollection = createWareCollection(resolver, defaults, addWares)
  /* Create the Basket Collection */
  // todo const basketCollection = createBasketCollection(resolver, defaults, addWares)
  /* Create "Module Groups" Collection */
  // todo const moduleGroupsCollection = createModuleGroups(resolver, defaults, addWares)
  /* Create Modules Collection */
  // todo const modulesCollection = createModules(resolver, defaults, addWares)
  /* Create Array of Promises to import Asset Ware Macros and asset Production Macros */
  // todo const importWareAssets = enqueueMacroImports(resolver, addWares, force)
  /* Arry of Promises for gunzipping icons from unpacked to their destination*/
  // todo const importIconTextures = enqueueIconTextureImports(resolver, addWares, force)
  /* Array of Promises for writing the files */
  // todo consider using Object.entries over a setup object instead.
  // todo const fileWrites = enqueueFileWrites([ macrosIndex, iconCollection, wareCollection, basketCollection, moduleGroupsCollection, modulesCollection ], force)
  /* return the promises to be resolved */
  // todo return Promise.all([...fileWrites, ...importWareAssets, ...importIconTextures])
}
