import { X4Entity, X4EntityType } from "./X4Entity";
import { clone } from "lodash";

import {
  IconEntity,
  Attributes as IconAttributes
} from "@@/XMLTypes/X4LibraryIcons";

export type IconEntity = IconEntity;
export type IconAttributes = IconAttributes;

export const iconDefaults = (): IconAttributes =>
  clone({
    name: "",
    texture: "",
    height: 16,
    width: 16
  });

export class Icon extends X4Entity<IconEntity> {
  get name() {
    return this.xmlDef.Attributes.name;
  }
  set name(v: string) {
    if (typeof v !== "string") throw new TypeError(`${v} must be string`);
    if (typeof v === "string") this.xmlDef.Attributes.name = v;
  }
  get texture() {
    return this.xmlDef.Attributes.texture || iconDefaults().texture;
  }
  set texture(v: string | null | undefined) {
    if (typeof v !== "string") throw new TypeError(`${v} must be string`);
    if (typeof v === "string") this.xmlDef.Attributes.texture = v;
  }
  get height() {
    return this.xmlDef.Attributes.height || iconDefaults().height;
  }
  set height(v: number | null | undefined) {
    if (undefined == v) delete this.xmlDef.Attributes.height;
    if (typeof v !== "number") throw new TypeError(`${v} must be number`);
    if (typeof v === "number") this.xmlDef.Attributes.height = v;
  }
  get width() {
    return this.xmlDef.Attributes.width || iconDefaults().width;
  }
  set width(v: number | null | undefined) {
    if (undefined == v) delete this.xmlDef.Attributes.width;
    if (typeof v !== "number") throw new TypeError(`${v} must be number`);
    if (typeof v === "number") this.xmlDef.Attributes.width = v;
  }
  get active() {
    return this.xmlDef.Attributes.active || iconDefaults().active;
  }
  set active(v: string | null | undefined) {
    if (undefined == v) delete this.xmlDef.Attributes.active;
    if (typeof v !== "string") throw new TypeError(`${v} must be string`);
    if (typeof v === "string") this.xmlDef.Attributes.active = v;
  }
  get inactive() {
    return this.xmlDef.Attributes.inactive || iconDefaults().inactive;
  }
  set inactive(v: string | null | undefined) {
    if (undefined == v) delete this.xmlDef.Attributes.inactive;
    if (typeof v !== "string") throw new TypeError(`${v} must be string`);
    if (typeof v === "string") this.xmlDef.Attributes.inactive = v;
  }
  get selected() {
    return this.xmlDef.Attributes.selected || iconDefaults().selected;
  }
  set selected(v: string | null | undefined) {
    if (undefined == v) delete this.xmlDef.Attributes.selected;
    if (typeof v === "string") this.xmlDef.Attributes.selected = v;
  }
  constructor(
    constructOptions: IconAttributes = iconDefaults(),
    xmlDef?: IconEntity
  ) {
    super(
      X4EntityType.LIBRARY_ICON,
      "icon",
      iconDefaults(),
      xmlDef || {
        Attributes: constructOptions
      }
    );
  }
}

export default Icon;
