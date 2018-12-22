import Path from "path";
import Jetpack from "fs-jetpack";
import { Resolver, Sources } from "./PathResolver";
import * as _ from "lodash";

import { die, log } from "./System";
import { setupConfig } from "./config";
import * as XMLUtils from "./XMLUtils";
import { X4WareGenXML } from "../../XMLTypes/X4WareGenXML";
import jetpack from "fs-jetpack";
import { X4WareMacro } from "../../XMLTypes/X4WareMacro";
import { X4WareProductionMacro } from "../../XMLTypes/X4WareProductionMacro";
import * as zlib from "zlib";

import fs from "fs";
import { XMLWrapper } from "./XMLWrapper";
import { X4LibraryModules } from "../../XMLTypes/X4LibraryModules";
import { X4IndexMacros } from "../../XMLTypes/X4IndexMacros";
import { X4LibraryIcons } from "../../XMLTypes/X4LibraryIcons";

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

  generation.forEach(async addWare => {
    const newWareId = addWare.$.id;
    if (!newWareId) return;
    const cloneProductionModuleFrom = addWare.$.cloneProductionModuleFrom;
    const wareName = resolver.getWareName(newWareId);
    log.process(
      `${newWareId} as ${wareName}, production macro to copy ${cloneProductionModuleFrom}`
    );

    const newWare = createWare(
      addWaresXml.XMLObject.addwares.configuration[0].defaults[0],
      addWare,
      wareName
    );

    await publishWareMacro(resolver, newWareId, force);
    await publishProductionMacro(
      resolver,
      newWareId,
      cloneProductionModuleFrom,
      force
    );
    publishProductionIcon(
      resolver,
      newWareId,
      cloneProductionModuleFrom,
      force
    );
    updateManifest(resolver, newWareId, newWare, force);
  });
};

async function updateManifest(
  resolver: Resolver,
  wareId: string,
  newWare: any,
  force: boolean
) {
  const prodMacroName = resolver.getProductionMacroName(wareId);
  const wareMacroName = resolver.getWareMacroName(wareId);
  const relIndexMacrosXmlPath = "index/macros.xml";
  const relIconsXmlPath = "libraries/icons.xml";
  const relProdMacroPath = `assets/structures/production/macros/${prodMacroName}.xml`;
  const relWareMacroPath = `assets/wares/macros/${wareMacroName}.xml`;
  const relIconAssetPath = `assets/fx/gui/textures/stationmodules/${prodMacroName}.dds`;

  const indexMacrosXmlPath = resolver.resolveFromMod(relIndexMacrosXmlPath);
  const iconsXmlPath = resolver.resolveFromMod(relIconsXmlPath);
  const relModWarePath = resolver.resolveRelFromMod(relWareMacroPath);
  const relModProdPath = resolver.resolveRelFromMod(relProdMacroPath);
  const relModIconPath = resolver.resolveRelFromMod(relIconAssetPath);

  const indexMacrosXml = await XMLUtils.getOrCreate<X4IndexMacros>(
    indexMacrosXmlPath,
    {
      index: {
        entry: []
      }
    }
  );
  const iconsXml = await XMLUtils.getOrCreate<X4LibraryIcons>(iconsXmlPath, {
    icons: {
      icon: []
    }
  });

  updateIndex(indexMacrosXml, wareMacroName, relModWarePath);
  updateIndex(indexMacrosXml, prodMacroName, relModProdPath);
  indexMacrosXml.save(indexMacrosXmlPath);

  updateIcons(iconsXml, `module_${prodMacroName}`, relModIconPath);
  iconsXml.save(iconsXmlPath);
}

function updateIndex(
  xmlObj: XMLWrapper<X4IndexMacros>,
  name: string,
  value: string
) {
  xmlObj.XMLObject.index.entry.push({
    $: {
      name,
      value
    }
  });
  return xmlObj;
}

function updateIcons(
  xmlObj: XMLWrapper<X4LibraryIcons>,
  name: string,
  texture: string
) {
  xmlObj.XMLObject.icons.icon.push({
    $: {
      name,
      texture,
      width: "256",
      height: "256"
    }
  });
  return xmlObj;
}

function createWare(defaults: any, addWare: any, wareName: string) {
  const newWare = _.cloneDeep(addWare);
  newWare.ware[0].$.id = wareName;
  const merged = _.merge({ ware: {} }, defaults, newWare);

  return merged;
}

async function publishProductionMacro(
  resolver: Resolver,
  wareId: string,
  cloneProductionModuleFrom: string,
  force: boolean
) {
  const wareName = <string>(<unknown>resolver.getWareName(wareId));

  const capitalizedWareName =
    `${wareId[0]}`.toUpperCase() + `${wareId}`.substring(1);
  const prodMacroName = resolver.getProductionMacroName(wareId);
  const sourceProdMacroPath = resolver.resolveProductionModuleFromPath(
    Sources.FromUnpacked,
    wareId,
    cloneProductionModuleFrom
  );
  const destinationProdMacroPath = resolver.resolveProductionModuleFromPath(
    Sources.FromMod,
    wareId,
    cloneProductionModuleFrom
  );

  if (jetpack.exists(destinationProdMacroPath) && !force) {
    log.skip(destinationProdMacroPath, "(File already exists)", MSG_FORCE);
    return;
  }

  log.write(destinationProdMacroPath, "(Production Macro)");

  createPathAndFile(destinationProdMacroPath, sourceProdMacroPath);

  const wareMacroXml = await XMLUtils.readAbsXMLFile<X4WareProductionMacro>(
    destinationProdMacroPath
  );
  const macroElmenet = wareMacroXml.XMLObject.macros.macro[0];

  macroElmenet.$.name = prodMacroName;
  macroElmenet.properties[0].identification[0].$.name = `${capitalizedWareName} Production`;
  macroElmenet.properties[0].identification[0].$.shortname = `${capitalizedWareName}`;
  macroElmenet.properties[0].production[0].$.wares = wareName;
  macroElmenet.properties[0].production[0].queue[0].$.ware = wareName;
  wareMacroXml.save(destinationProdMacroPath);
}

async function publishWareMacro(
  resolver: Resolver,
  wareId: string,
  force: boolean
) {
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
    log.skip(destinationWareMacroPath, "(File already exists)", MSG_FORCE);
    return;
  }

  log.write(destinationWareMacroPath, "(Ware Macro)");

  createPathAndFile(destinationWareMacroPath, sourceWareMacroPath);

  const wareMacroXml = await XMLUtils.readAbsXMLFile<X4WareMacro>(
    destinationWareMacroPath
  );
  wareMacroXml.XMLObject.macros.macro[0].$.name = wareMacroName;

  wareMacroXml.save(destinationWareMacroPath);
}

async function publishProductionIcon(
  resolver: Resolver,
  wareId: string,
  cloneProductionModuleFrom: string,
  force: boolean
) {
  const destinationPath = resolver.resolveProductionModuleIconPath(
    Sources.FromMod,
    wareId,
    cloneProductionModuleFrom
  );
  const sourcePath = resolver.resolveProductionModuleIconPath(
    Sources.FromUnpacked,
    wareId,
    cloneProductionModuleFrom
  );

  if (jetpack.exists(destinationPath) && !force) {
    log.skip(destinationPath, "(File already exists)", MSG_FORCE);
    return;
  }

  log.write(destinationPath, "(Icon Texture)");
  createPathAndFile(destinationPath);

  const writestream = fs.createWriteStream(
    destinationPath.replace("gz", "dds")
  );

  fs.createReadStream(sourcePath)
    .pipe(zlib.createGunzip())
    .pipe(writestream);
}

function createPathAndFile(pathName: string, sourcePath?: string) {
  jetpack.dir(
    pathName
      .split(Path.sep)
      .slice(0, -1)
      .join(Path.sep)
  );
  if (sourcePath) {
    jetpack.copy(sourcePath, pathName, { overwrite: true });
  }
}
