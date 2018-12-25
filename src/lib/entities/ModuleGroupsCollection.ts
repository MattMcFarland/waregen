import { X4Entity, X4EntityType } from "./X4Entity";
import {
  GroupEntity as ModuleGroupEntity,
  Groups as ModuleGroups,
  Attributes as ModuleGroupAttributes
} from "@@/XMLTypes/X4LibraryModuleGroups";

import { ModuleGroup } from "./ModuleGroup";

export type ModuleGroupAttributes = ModuleGroupAttributes;
export type ModuleGroupEntity = ModuleGroupEntity;
export type ModuleGroupEntities = ModuleGroupEntity[];

export interface ModuleGroupIndex {
  [key: string]: ModuleGroup;
}
export class ModuleGroupsCollection extends X4Entity<ModuleGroups> {
  private moduleGroupIndex: ModuleGroupIndex = {};
  protected onImport(_xmlDef: ModuleGroups) {
    delete this.moduleGroupIndex;
    this.moduleGroupIndex = {};
    delete this.xmlDef;
    this.xmlDef = { group: [] };

    if (Array.isArray(_xmlDef.group)) {
      _xmlDef.group.forEach((moduleGroupEntity: ModuleGroupEntity) => {
        const constructorOptions: any = {
          ...moduleGroupEntity.Attributes,
          macros:
            Array.isArray(moduleGroupEntity.select) &&
            moduleGroupEntity.select.map(s => s.Attributes.macro)
        };
        moduleGroupEntity.Attributes;

        const moduleGroup = new ModuleGroup(constructorOptions);
        this.add(moduleGroup);
      });
    }
  }
  add = (moduleGroup: ModuleGroup) => {
    if (this.moduleGroupIndex[moduleGroup.name]) {
      throw new Error(
        `moduleGroup ${
          moduleGroup.name
        } already exists, did you mean replaceWare?`
      );
    }
    this.moduleGroupIndex[moduleGroup.name] = moduleGroup;
    if (Array.isArray(this.xmlDef.group)) {
      this.xmlDef.group = [...this.xmlDef.group, moduleGroup.__xmlDef];
    }
  };
  remove = (name: string) => {
    if (!this.moduleGroupIndex[name]) {
      throw new Error(
        `cant remove moduleGroup ${name} because it does not exist`
      );
    }
    delete this.moduleGroupIndex[name];
    if (Array.isArray(this.xmlDef.group)) {
      this.xmlDef.group = this.xmlDef.group.filter(
        moduleGroupEntity => moduleGroupEntity.Attributes.name !== name
      );
    }
  };
  replace = (moduleGroup: ModuleGroup) => {
    this.remove(moduleGroup.name);
    this.add(moduleGroup);
  };
  extract = (wareId: string) => {
    return this.moduleGroupIndex[wareId];
  };
  constructor(optionalModuleGroupList?: ModuleGroup[]) {
    super(X4EntityType.LIBRARY_MODULE_GROUPS, "groups", {
      group: []
    });
    if (Array.isArray(optionalModuleGroupList)) {
      optionalModuleGroupList.forEach((moduleGroup: ModuleGroup) => {
        this.add(moduleGroup);
      });
    }
  }
}

export default ModuleGroupsCollection;
