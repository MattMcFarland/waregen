import { Parser, Builder, BuilderOptions } from "../utils/xml/XMLParser";
import { cloneDeep, merge } from "lodash";
import { dig } from "../utils/objectUtils";

export enum X4EntityType {
  BASE_ENTITY = "BASE_ENTITY",
  ADDWARE = "ADDWARE",
  WARE_MACRO = "WARE_MACRO",
  WARE_PROD_MACRO = "WARE_PROD_MACRO",
  LIBRARY_BASKET = "LIBRARY_BASKET",
  LIBRARY_BASKETS = "LIBRARY_BASKETS",
  INDEX_COMPONENT = "INDEX_COMPONENT",
  INDEX_COMPONENTS = "INDEX_COMPONENTS",
  LIBRARY_ICON = "LIBRARY_ICON",
  LIBRARY_ICONS = "LIBRARY_ICONS",
  INDEX_MACRO = "INDEX_MACRO",
  INDEX_MACROS = "INDEX_MACROS",
  LIBRARY_MODULE_GROUP = "LIBRARY_MODULE_GROUP",
  LIBRARY_MODULE_GROUPS = "LIBRARY_MODULE_GROUPS",
  LIBRARY_WARE = "LIBRARY_WARE",
  LIBRARY_WARES = "LIBRARY_WARES"
}
export class X4Entity<T> {
  private entityType: X4EntityType = X4EntityType.BASE_ENTITY;
  protected xmlDef: T = <any>{};
  protected onImport(xmlDef: any): void {}
  private buildOptions: BuilderOptions;
  private create: (options: any) => any;
  get __entityType() {
    return this.entityType;
  }
  set __entityType(v) {
    throw new Error("readonly prop __entityType");
  }
  get __xmlDef() {
    return JSON.parse(this.toJson());
  }
  set __xmlDef(v) {
    throw new Error("readonly prop __xmlDef");
  }
  async import(xmlString: string, rootNode?: string): Promise<this> {
    if (!rootNode) {
      this.xmlDef = await (<T>(<any>new Parser({
        explicitRoot: false
      }).parseString(xmlString)));
      this.onImport(this.__xmlDef);
      return this;
    }
    const _fullObj = await new Parser({
      explicitRoot: true,
      rootName: rootNode
    }).parseString(xmlString);
    this.xmlDef = dig(_fullObj, rootNode)[0];
    this.buildOptions.rootName = rootNode;
    this.onImport(this.__xmlDef);
    return this;
  }
  clone(): X4Entity<T> {
    return cloneDeep(this);
  }
  merge(obj: X4Entity<T>): X4Entity<T> {
    if (obj.__entityType !== this.__entityType) {
      throw new TypeError(
        `cannot merge entityTypes ${obj.__entityType} into ${this.__entityType}`
      );
    }
    return merge(cloneDeep(this), obj);
  }
  toXml(pretty: boolean = true, options?: BuilderOptions): string {
    const buildOptions = Object.assign({}, this.buildOptions, options);
    if (pretty) {
      buildOptions.renderOpts = {
        pretty: true,
        indent: "  ",
        newline: "\n"
      };
    } else {
      buildOptions.renderOpts = {
        pretty: false,
        indent: undefined,
        newline: undefined
      };
    }
    return new Builder(buildOptions).buildObject(this.xmlDef);
  }
  toJson(...stringifyOptions: any): string {
    return JSON.stringify(this.xmlDef, ...stringifyOptions);
  }
  constructor(
    entityType: X4EntityType,
    rootName: string,
    defaults: any,
    options?: any
  ) {
    this.buildOptions = {
      headless: true,
      rootName: rootName,
      renderOpts: { pretty: false, indent: undefined, newline: undefined }
    };
    this.create = _options => {
      if (typeof options === "undefined") {
        this.xmlDef = defaults;
        return this;
      }
      if (options) {
        this.xmlDef = _options;
      }
      return this;
    };
    this.create(options);
    this.entityType = entityType;
  }
}
