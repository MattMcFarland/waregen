import { X4Entity } from "@@/entities";
import { GeneratorConfig, GeneratorOptions } from "@@/generator";
import { X4EntityType, XMLPatchTypes } from "@@/entities/X4Entity";
import { PathBuilder } from "@@/utils/PathBuilder";
import FS from "fs";
import Mkdirp from "mkdirp";

export default function enqueueFileWrites(
  entities: X4Entity<any>[],
  config: GeneratorConfig,
  options: GeneratorOptions
) {
  const librariesDir = new PathBuilder(config)
    .dirFullGamepath()
    .dirModPath()
    .append("libraries")
    .resolve();

  const indexDir = new PathBuilder(config)
    .dirFullGamepath()
    .dirModPath()
    .append("index")
    .resolve();

  Mkdirp.sync(librariesDir);
  Mkdirp.sync(indexDir);

  return entities.map(
    entity =>
      new Promise((resolve, reject) => {
        const target = getTargetPath(entity);
        if (entity.__entityType === X4EntityType.LIBRARY_BASKETS) {
          return FS.writeFile(
            target,
            entity.toXmlPatch(XMLPatchTypes.ADD),
            err => {
              if (err) return reject(err);
              return resolve(target);
            }
          );
        }
        FS.writeFile(target, entity.toXml(), err => {
          if (err) return reject(err);
          return resolve(err);
        });
      })
  );

  function getTargetPath(entity: X4Entity<any>) {
    switch (entity.__entityType) {
      case X4EntityType.HASH:
        return indexPath("macros");
      case X4EntityType.LIBRARY_ICONS:
        return librariesPath("icons");
      case X4EntityType.LIBRARY_BASKETS:
        return librariesPath("baskets");
      case X4EntityType.LIBRARY_MODULES:
        return librariesPath("modules");
      case X4EntityType.LIBRARY_MODULE_GROUPS:
        return librariesPath("modulegroups");
      case X4EntityType.LIBRARY_WARES:
        return librariesPath("wares");
      default:
        throw new Error("invalid");
    }
  }

  function librariesPath(baseName: string) {
    return new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .fileLibrary(baseName, "xml")
      .resolve();
  }

  function indexPath(baseName: string) {
    return new PathBuilder(config)
      .dirFullGamepath()
      .dirModPath()
      .fileIndex(baseName, "xml")
      .resolve();
  }
}
