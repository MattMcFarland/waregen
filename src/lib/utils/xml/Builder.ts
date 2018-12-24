import { Builder as XBuilder } from "xml2js";
import xml2jsParserOptions, { BuilderOptions } from "./xml2jsOptions";

export default class Builder {
  private builder: XBuilder;
  private _settings: BuilderOptions;
  get settings(): BuilderOptions {
    return this._settings;
  }
  buildObject: (obj: any) => string;
  constructor(options?: BuilderOptions) {
    this._settings = Object.assign(xml2jsParserOptions, options);
    this.builder = new XBuilder(this._settings);
    this.buildObject = (obj: any) => this.builder.buildObject(obj);
  }
}
