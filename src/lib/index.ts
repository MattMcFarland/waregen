import Path from "path";
import Jetpack from "fs-jetpack";
import { Resolver, Sources } from "./PathResolver";
import * as _ from "lodash";

import { die, log } from "./System";
import { setupConfig } from "./config";
import { XMLUtils } from "./XMLUtils";
import { X4WareGenXML } from "../../XMLTypes/X4WareGenXML";
import jetpack from "fs-jetpack";

const MSG_FORCE = "Use option -force to overwrite";

export default async (configXmlPath: string, force: boolean) => {
  if (force)
    log.warn("FORCE ENABLED - I sure hope you know what you are doing!");

  const configXmlFullPath = Path.resolve(process.cwd(), configXmlPath);
  const configXmlStat = Jetpack.inspect(configXmlFullPath);

  if (!configXmlStat) die(`${configXmlFullPath} not found!`);

  log.start(`Using ${configXmlPath}`);

  const configSelect = await setupConfig(configXmlFullPath);
  const gamepath = <any>configSelect("gamepath");
  const prefix = <any>configSelect("prefix");
  const unpackedPath = <any>configSelect("unpackedPath");
  const modpath = <any>configSelect("modpath");
  const resolver = new Resolver(gamepath, prefix, modpath, unpackedPath);
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

    publishWareMacro(resolver, newWareId, force);
  });
};

function createWare(defaults: any, addWare: any, wareName: string) {
  const newWare = _.cloneDeep(addWare);
  newWare.ware[0].$.id = wareName;
  const merged = _.merge({ ware: {} }, defaults, newWare);

  return merged;
}

function publishWareMacro(resolver: Resolver, wareId: string, force: boolean) {
  const wareMacroName = resolver.getWareMacroName(wareId);
  const sourceWareMacroPath = resolver.resolveWareMacroPath(
    Sources.FromUnpacked,
    wareId
  );
  const destinationWareMacroPath = resolver.resolveWareMacroPath(
    Sources.FromMod,
    wareId
  );
  if (jetpack.exists(destinationWareMacroPath) && !force) {
    log.warn(
      "Skipping",
      destinationWareMacroPath,
      "(File already exists)",
      MSG_FORCE
    );
    return;
  }
  log.info("Publish", destinationWareMacroPath, "(Ware Macro)");

  createPathAndFile(destinationWareMacroPath);
}

function createPathAndFile(pathName: string) {
  console.log(
    pathName
      .split(Path.sep)
      .splice(-1)
      .join(Path.sep)
  );
  // jetpack.dir(
  //   pathName
  //     .split(Path.sep)
  //     .splice(-1)
  //     .join(Path.sep)
  // );
}
