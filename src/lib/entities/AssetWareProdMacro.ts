import { X4Entity, X4EntityType } from "./X4Entity";
import { Macros } from "@@/XMLTypes/X4WareMacro";
import idx from "idx";

export class AssetWareProdMacro extends X4Entity<Macros> {
  get name() {
    return idx(this.xmlDef, _ => _.macro[0].Attributes.name) || "";
  }
  set name(v: string) {
    if (this.xmlDef.macro && this.xmlDef.macro[0]) {
      this.xmlDef.macro[0].Attributes.name = v;
    }
  }
  constructor(xmlObj: any = {}) {
    super(X4EntityType.ASSET_WARE_MACRO, "macros", xmlObj);
  }
}

export default AssetWareProdMacro;
