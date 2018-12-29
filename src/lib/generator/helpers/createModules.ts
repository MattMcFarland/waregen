import { GeneratorConfig } from "..";
import { X4ModuleCollection, X4Module } from "../../entities";
import { IdRoster } from "../../utils/IdRoster";

export default function createModules(
  config: GeneratorConfig
): X4ModuleCollection {
  const modules = config.addwaresList.map(addware => {
    const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
    return new X4Module(ids.production, ids.ware);
  });
  return new X4ModuleCollection(modules);
}
