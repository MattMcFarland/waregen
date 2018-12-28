import { GeneratorConfig } from "..";
import { ModuleGroupsCollection, ModuleGroup } from "@@/entities";
import { IdRoster } from "@@/utils/IdRoster";

export default function createModuleGroups(
  config: GeneratorConfig
): ModuleGroupsCollection {
  const moduleGroups = config.addwaresList.map(addware => {
    const ids = new IdRoster(addware.Attributes.id, config.modPrefix);
    const group = new ModuleGroup();
    group.name = ids.production;
    group.macros = [ids.productionMacro];
    return group;
  });
  return new ModuleGroupsCollection(moduleGroups);
}
