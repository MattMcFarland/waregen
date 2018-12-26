import idx from "idx";
import { X4Entity, X4EntityType } from "./X4Entity";
import {
  ModuleEntity,
  Modules as ModuleEntities
} from "@@/XMLTypes/X4LibraryModules";
import { X4Module } from "./X4Module";
export interface ModulesIndex {
  [key: string]: X4Module;
}
export class X4ModuleCollection extends X4Entity<ModuleEntities> {
  private modulesIndex: ModulesIndex = {};
  protected onImport(_xmlDef: ModuleEntities) {
    delete this.modulesIndex;
    this.modulesIndex = {};
    delete this.xmlDef;
    this.xmlDef = { module: [] };

    if (Array.isArray(_xmlDef.module)) {
      _xmlDef.module.forEach((moduleEntity: ModuleEntity) => {
        const wareName =
          idx(moduleEntity, _ => _.category[0].Attributes.ware) || "";
        const id = idx(moduleEntity, _ => _.Attributes.id) || "";
        const mod = new X4Module(id, wareName);
        this.add(mod);
      });
    }
  }
  add = (mod: X4Module) => {
    if (this.modulesIndex[mod.id]) {
      throw new Error(`mod ${mod.id} already exists, did you mean replace?`);
    }
    this.modulesIndex[mod.id] = mod;
    if (Array.isArray(this.xmlDef.module)) {
      this.xmlDef.module = [...this.xmlDef.module, mod.__xmlDef];
    }
  };
  remove = (id: string) => {
    if (!this.modulesIndex[id]) {
      throw new Error(`cant remove ware ${id} because it does not exist`);
    }
    delete this.modulesIndex[id];
    if (Array.isArray(this.xmlDef.module)) {
      this.xmlDef.module = this.xmlDef.module.filter(
        modEntity => modEntity.Attributes.id !== id
      );
    }
  };
  replace = (mod: X4Module) => {
    this.remove(mod.id);
    this.add(mod);
  };
  extract = (id: string) => {
    return this.modulesIndex[id];
  };
  constructor(optionalModuleList?: X4Module[]) {
    super(X4EntityType.LIBRARY_MODULES, "modules", {
      module: []
    });
    if (Array.isArray(optionalModuleList)) {
      optionalModuleList.forEach((mod: X4Module) => {
        this.add(mod);
      });
    }
  }
}
