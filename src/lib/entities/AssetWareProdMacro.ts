import { X4Entity, X4EntityType } from "./X4Entity";
import { Macros } from "@@/XMLTypes/X4WareProductionMacro";
import idx from "idx";
import { clone } from "@@/utils";

export class AssetWareProdMacro extends X4Entity<Macros> {
  get id() {
    return idx(this.xmlDef, _ => _.macro[0].Attributes.name) || "";
  }
  set id(v: string) {
    if (this.xmlDef.macro && this.xmlDef.macro[0]) {
      this.xmlDef.macro[0].Attributes.name = v;
    }
  }
  get name() {
    return <string>(
      idx(
        this.xmlDef,
        _ => _.macro[0].properties[0].identification[0].Attributes.name
      )
    );
  }
  set name(v: string) {
    const atts = idx(
      this.xmlDef,
      _ => _.macro[0].properties[0].identification[0].Attributes
    );
    if (atts) atts.name = v;
  }
  get shortname() {
    return <string>(
      idx(
        this.xmlDef,
        _ => _.macro[0].properties[0].identification[0].Attributes.shortname
      )
    );
  }
  set shortname(v: string) {
    const atts = idx(
      this.xmlDef,
      _ => _.macro[0].properties[0].identification[0].Attributes
    );
    if (atts) atts.shortname = v;
  }
  get description() {
    return <string>(
      idx(
        this.xmlDef,
        _ => _.macro[0].properties[0].identification[0].Attributes.description
      )
    );
  }
  set description(v: string) {
    const atts = idx(
      this.xmlDef,
      _ => _.macro[0].properties[0].identification[0].Attributes
    );
    if (atts) atts.description = v;
  }
  get production() {
    return <string>(
      idx(
        this.xmlDef,
        _ => _.macro[0].properties[0].production[0].Attributes.wares
      )
    );
  }
  set production(v: string) {
    const prodAtts = idx(
      this.xmlDef,
      _ => _.macro[0].properties[0].production[0].Attributes
    );
    const queueAtts = idx(
      this.xmlDef,
      _ => _.macro[0].properties[0].production[0].queue[0].Attributes
    );
    if (prodAtts) prodAtts.wares = v;
    if (queueAtts) queueAtts.ware = v;
  }
  constructor(xmlObj?: Macros) {
    super(
      X4EntityType.ASSET_WARE_MACRO,
      "macros",
      xmlObj || defaultAssetWareProdMacro()
    );
  }
}

export default AssetWareProdMacro;

function defaultAssetWareProdMacro(): Macros {
  return clone({
    macro: [{ Attributes: { name: "", class: "production" } }]
  });
}
