import { X4Entity, X4EntityType } from "./X4Entity";
import {
  IconEntity,
  Icons,
  Attributes as IconAttributes
} from "@@/XMLTypes/X4LibraryIcons";

import { Icon } from "./Icon";

export type IconEntity = IconEntity;
export type IconEntities = IconEntity[];

export interface IconIndex {
  [key: string]: Icon;
}
export class IconCollection extends X4Entity<Icons> {
  private iconIndex: IconIndex = {};
  protected onImport(_xmlDef: Icons) {
    delete this.iconIndex;
    this.iconIndex = {};
    delete this.xmlDef;
    this.xmlDef = { icon: [] };

    if (Array.isArray(_xmlDef.icon)) {
      _xmlDef.icon.forEach((iconEntity: IconEntity) => {
        const constructorOptions: IconAttributes = iconEntity.Attributes;
        const icon = new Icon(constructorOptions);
        this.add(icon);
      });
    }
  }
  add = (icon: Icon) => {
    if (this.iconIndex[icon.name]) {
      throw new Error(
        `icon ${icon.name} already exists, did you mean replaceWare?`
      );
    }
    this.iconIndex[icon.name] = icon;
    if (Array.isArray(this.xmlDef.icon)) {
      this.xmlDef.icon = [...this.xmlDef.icon, icon.__xmlDef];
    }
  };
  remove = (name: string) => {
    if (!this.iconIndex[name]) {
      throw new Error(`cant remove icon ${name} because it does not exist`);
    }
    delete this.iconIndex[name];
    if (Array.isArray(this.xmlDef.icon)) {
      this.xmlDef.icon = this.xmlDef.icon.filter(
        iconEntity => iconEntity.Attributes.name !== name
      );
    }
  };
  replace = (icon: Icon) => {
    this.remove(icon.name);
    this.add(icon);
  };
  extract = (wareId: string) => {
    return this.iconIndex[wareId];
  };
  constructor(optionalIconList?: Icon[]) {
    super(X4EntityType.LIBRARY_ICONS, "icons", {
      icon: []
    });
    if (Array.isArray(optionalIconList)) {
      optionalIconList.forEach((icon: Icon) => {
        this.add(icon);
      });
    }
  }
}
