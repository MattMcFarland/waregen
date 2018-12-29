import idx from "idx";
import { X4Entity, X4EntityType } from "./X4Entity";
import {
  GroupEntity as ModuleGroupEntity,
  SelectEntity,
  GroupEntity
} from "../XMLTypes/X4LibraryModuleGroups";

export type ModuleGroupEntity = ModuleGroupEntity;
export type ModuleGroupSelectEntity = SelectEntity;

export interface ModuleGroupConstructOptions {
  name: string;
  macros?: string[];
}

export class ModuleGroup extends X4Entity<ModuleGroupEntity> {
  private proxy: any;
  private _macros: string[] = [];
  get name() {
    return this.xmlDef.Attributes.name;
  }
  set name(v: string) {
    if (undefined == v) throw new TypeError("name must be set");
    if (typeof v !== "string")
      throw new TypeError(`${v}:${typeof name} must be a string`);
    this.xmlDef.Attributes.name = v;
  }
  get macros() {
    return this.proxy;
  }
  set macros(v: string[]) {
    const xmlDef = this.xmlDef;
    const handler = {
      set(target: string[], key: string, value: string) {
        xmlDef.select = [
          ...((xmlDef.select && xmlDef.select) || []),
          mapName(value)
        ];
        return Reflect.set(target, key, value);
      },
      deleteProperty(target: string[], key: string) {
        return Reflect.deleteProperty(target, key);
      }
    };
    this.proxy = new Proxy(this._macros, handler);
    Object.assign(this.proxy, v);
  }
  constructor(
    constructOptions?: ModuleGroupConstructOptions,
    xmlDefOptions?: ModuleGroupEntity
  ) {
    super(
      X4EntityType.LIBRARY_MODULE_GROUPS,
      "group",
      xmlDefOptions || {
        Attributes: {
          name: ""
        },
        select: []
      }
    );
    if (constructOptions) {
      this.name = constructOptions.name || "";
      this.macros = constructOptions.macros || [];
    }
  }
}

export function mapName(name: string): any {
  return {
    Attributes: {
      macro: name
    }
  };
}

export function findInXmlDef(xmlDef: GroupEntity, value: string) {
  const macrosArray = <SelectEntity[]>idx(xmlDef, _ => _.select);
  return macrosArray.find((e: SelectEntity) => e.Attributes.macro === value);
}

export default ModuleGroup;
