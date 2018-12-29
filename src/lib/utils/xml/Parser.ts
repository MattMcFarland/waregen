import { Parser as XParser } from "xml2js";
import xml2jsParserOptions, { ParserOptions } from "./xml2jsOptions";
import safeRead from "../fs/safeRead";

export default class Parser<T = any> {
  private parser: XParser;
  private _settings: ParserOptions;
  get settings(): ParserOptions {
    return this._settings;
  }
  parseString: (xmlString: string) => Promise<T>;
  parseFile: (absPath: string) => Promise<T>;
  constructor(options?: ParserOptions) {
    this._settings = Object.assign(xml2jsParserOptions, options);
    this.parser = new XParser(this._settings);
    this.parseString = (xmlString: string) =>
      new Promise((resolve, reject) => {
        if (typeof xmlString !== "string") {
          throw new TypeError(`expecting string, received ${xmlString}`);
        }
        this.parser.parseString(xmlString, (err: Error, res: T) => {
          if (err) return reject(err);
          if (!res) return reject(`invalid "Falsey" result: ${res}`);
          return resolve(res);
        });
      });
    this.parseFile = async (absPath: string) => {
      const data = await safeRead(absPath);
      return this.parseString(data);
    };
  }
}
