import { X4Entity, X4EntityType } from "./X4Entity";
import { Macros } from "@@/XMLTypes/X4WareMacro";

export class AssetWareProdMacro extends X4Entity<Macros> {
  constructor(xmlObj: any) {
    super(X4EntityType.ASSET_WARE_MACRO, "macros", xmlObj);
  }
}
