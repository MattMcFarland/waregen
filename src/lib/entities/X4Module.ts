import idx from "idx";
import { X4Entity, X4EntityType } from "./X4Entity";
import { ModuleEntity } from "@@/XMLTypes/X4LibraryModules";
import { clone } from "@@/lib/utils/object";

export interface ModuleInterface {
  id: string;
  ware: string;
}

export class X4Module extends X4Entity<ModuleEntity> {
  get id() {
    return this.xmlDef.Attributes.id;
  }
  get ware() {
    return idx(this.xmlDef, _ => _.category[0].Attributes.ware) || "";
  }
  set ware(v: string) {
    const id = this.xmlDef.Attributes.id;
    this.xmlDef = baseModule(id, v);
  }
  set id(v: string) {
    const ware = idx(this.xmlDef, _ => _.category[0].Attributes.ware) || "";
    this.xmlDef = baseModule(v, ware);
  }
  constructor(id: string, ware: string) {
    super(X4EntityType.LIBRARY_MODULE, "module", baseModule(id, ware));
  }
}

const baseModule: (id: string, ware: string) => ModuleEntity = (
  id: string,
  ware: string
) =>
  clone({
    Attributes: { id, group: id },
    category: [
      {
        Attributes: {
          ware,
          tags: "[production, module]",
          race: "[argon, paranid, teladi]",
          faction:
            "[argon, paranid, teladi, antigone, holyorder, ministry, hatikvah, alliance, scaleplate]"
        }
      }
    ],
    compatibilities: [
      {
        production: [{ Attributes: { ware, chance: 65 } }],
        limits: [{ Attributes: { production: 1 } }]
      }
    ]
  });
