import { Parser, Builder, BuilderOptions } from "../utils/xml";
import { cloneDeep, merge, dig } from "../utils/object";
import idx from "idx";
import { IndexByString } from "@@/utils/object/types";

export enum X4EntityType {
  BASE_ENTITY = "BASE_ENTITY" /* x */,
  HASH = "HASH" /* x */,
  LIBRARY_BASKET = "LIBRARY_BASKET" /* x */,
  LIBRARY_BASKETS = "LIBRARY_BASKETS" /* x */,
  LIBRARY_ICON = "LIBRARY_ICON" /* x */,
  LIBRARY_ICONS = "LIBRARY_ICONS" /* x */,
  LIBRARY_MODULE = "LIBRARY_MODULE" /* x */,
  LIBRARY_MODULES = "LIBRARY_MODULES" /* x */,
  LIBRARY_MODULE_GROUP = "LIBRARY_MODULE_GROUP" /* x */,
  LIBRARY_MODULE_GROUPS = "LIBRARY_MODULE_GROUPS" /* x */,
  LIBRARY_WARE = "LIBRARY_WARE" /* x */,
  LIBRARY_WARES = "LIBRARY_WARES" /* x */,
  ASSET_WARE_MACRO = "ASSET_WARE_MACRO" /* x */,
  ASSET_WARE_PROD_MACRO = "ASSET_WARE_PROD_MACRO" /* x */
}
export interface XMLAttributes {
  Attributes: IndexByString;
}
export type XMLObjectLike = IndexByString[] & XMLAttributes;

export class X4Entity<T> {
  private entityType: X4EntityType = X4EntityType.BASE_ENTITY;
  private create: (options: any) => any;

  protected xmlDef: T = <any>{};
  protected onImport(xmlDef: any): void {}
  protected buildOptions: BuilderOptions;
  protected xmlBuild(
    obj: any,
    pretty: boolean = true,
    options?: BuilderOptions
  ): string {
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
    return new Builder(buildOptions).buildObject(obj);
  }

  public rootName: string;
  public get selector(): string | undefined {
    const keys = Object.keys(this.xmlDef);

    if (keys.length < 1) return undefined;

    const id = this.id;

    if (id) {
      return `*/${this.rootName}[@id='${id}']`;
    } else {
      return undefined;
    }
  }

  public get id() {
    return <string>idx(this.__xmlDef, _ => _.Attributes.id);
  }
  public get __entityType() {
    return this.entityType;
  }
  public get __xmlDef() {
    return JSON.parse(this.toJson());
  }
  public async import(xmlString: string, rootNode?: string): Promise<this> {
    if (!rootNode) {
      this.xmlDef = await (<T>(<any>new Parser({
        explicitRoot: false
      }).parseString(xmlString)));
      typeof this.onImport === "function" && this.onImport(this.__xmlDef);
      return this;
    }
    const _fullObj = await new Parser({
      explicitRoot: true,
      rootName: rootNode
    }).parseString(xmlString);
    this.xmlDef = dig(_fullObj, rootNode)[0];
    this.buildOptions.rootName = rootNode;
    typeof this.onImport === "function" && this.onImport(this.__xmlDef);
    return this;
  }
  public clone(): X4Entity<T> {
    return cloneDeep(this);
  }
  public merge(obj: X4Entity<T>): X4Entity<T> {
    if (obj.__entityType !== this.__entityType) {
      throw new TypeError(
        `cannot merge entityTypes ${obj.__entityType} into ${this.__entityType}`
      );
    }
    return merge(cloneDeep(this), obj);
  }
  public toXml(pretty: boolean = true, options?: BuilderOptions): string {
    return this.xmlBuild(this.xmlDef, pretty, options);
  }
  public toXmlPatch(
    patchType: XMLPatchTypes,
    selector?: string,
    pretty: boolean = true,
    options: BuilderOptions = {}
  ) {
    const obj = {
      [patchType]: [
        {
          Attributes: {
            sel: selector || this.selector
          },
          ...this.__xmlDef
        }
      ]
    };
    return this.xmlBuild(obj, pretty, options);
  }
  // public toXmlPatch(pretty: boolean = true, options: BuilderOptions = {}) {
  //   options.rootName = "diff";
  //   return this.xmlBuild(this.__xmlPatchDef, pretty, options);
  // }

  public toJson(...stringifyOptions: any): string {
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
        this.xmlDef = cloneDeep(defaults);
        return this;
      }
      if (options) {
        this.xmlDef = cloneDeep(_options);
      }
      return this;
    };
    this.create(options);
    this.entityType = entityType;
    this.rootName = rootName;
  }
}

export default X4Entity;

export enum XMLPatchTypes {
  ADD = "add",
  REPLACE = "replace",
  REMOVE = "remove"
}
