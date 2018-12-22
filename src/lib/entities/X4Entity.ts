import { Builder, BuilderOptions } from "../utils/xml/XMLParser";

export class X4Entity {
  protected xmlDef: any = {};
  private buildOptions: BuilderOptions;
  toXml(options?: BuilderOptions): string {
    return new Builder(
      Object.assign({}, this.buildOptions, options)
    ).buildObject(this.xmlDef);
  }
  toJson(...stringifyOptions: any): string {
    return JSON.stringify(this.xmlDef, ...stringifyOptions);
  }
  constructor(rootName: string) {
    this.buildOptions = {
      headless: true,
      rootName: rootName
    };
  }
}
