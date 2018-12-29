import { X4Entity, X4EntityType } from "./X4Entity";
import { Macros } from "..//XMLTypes/X4WareMacro";
import idx from "idx";

export class AssetWareMacro extends X4Entity<Macros> {
  get name() {
    return idx(this.xmlDef, _ => _.macro[0].Attributes.name) || "";
  }
  set name(v: string) {
    this.xmlDef = filledXmlObject(v, this.ref);
  }
  get ref() {
    return idx(this.xmlDef, _ => _.macro[0].component[0].Attributes.ref) || "";
  }
  set ref(v: string) {
    this.xmlDef = filledXmlObject(this.name, v);
  }
  constructor(name: string, ref: string) {
    super(X4EntityType.ASSET_WARE_MACRO, "macros", filledXmlObject(name, ref));
  }
}

function filledXmlObject(name: string, ref: string): Macros {
  if (undefined == name) throw new TypeError("name required");
  if (undefined == ref) throw new TypeError("ref required");
  return {
    macro: [
      {
        Attributes: { name, class: "object" },
        component: [{ Attributes: { ref } }],
        properties: [{ identification: [{ Attributes: { unique: 0 } }] }]
      }
    ]
  };
}

export default AssetWareMacro;
