import Path from "path";
import Jetpack from "fs-jetpack";
import { Resolver } from "./PathResolver";
import * as _ from "lodash";

import { die, log } from "./System";
import { setupConfig } from "./config";
import { XMLUtils } from "./XMLUtils";
import { X4WareGenXML } from "../../XMLTypes/X4WareGenXML";
import { X4LibraryWares, WareEntity } from "../../XMLTypes/X4LibraryWares";
import fs from "fs";

export default async (configXmlPath: string, force: boolean) => {
  if (force)
    log.warn("FORCE ENABLED - I sure hope you know what you are doing!");

  const configXmlFullPath = Path.resolve(process.cwd(), configXmlPath);
  const configXmlStat = Jetpack.inspect(configXmlFullPath);

  if (!configXmlStat) die(`${configXmlFullPath} not found!`);

  log.start(`Using ${configXmlPath}`);

  const configSelect = await setupConfig(configXmlFullPath);

  const prefix = <any>configSelect("prefix");
  const unpackedPath = <any>configSelect("unpackedPath");
  const modpath = <any>configSelect("modpath");

  const resolver = new Resolver(prefix, modpath, unpackedPath);

  const addWaresXml = await XMLUtils.readAbsXMLFile<X4WareGenXML>(
    configXmlPath
  );
  const generation = addWaresXml.XMLObject.addwares.generation[0].addware;

  generation.forEach(addWare => {
    const newWareId = addWare.$.id;
    const cloneProductionModuleFrom = addWare.$.cloneProductionModuleFrom;
    const wareName = resolver.getWareName(newWareId);
    log.info(
      `Process ${newWareId} as ${wareName}, production macro to copy ${cloneProductionModuleFrom}`
    );

    const newWare = createWare(
      addWaresXml.XMLObject.addwares.configuration[0].defaults[0],
      addWare,
      wareName
    );
  });
};

function createWare(defaults: any, addWare: any, wareName: string) {
  const newWare = _.cloneDeep(addWare);

  newWare.ware[0].$.id = wareName;

  const merged = _.merge({ ware: {} }, defaults, newWare);

  return merged;
}
