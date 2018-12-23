import { Builder as XBuilder, Parser as XParser, OptionsV2 } from "xml2js";
import { parseBooleans, parseNumbers } from "xml2js/lib/processors";
export interface ParserOptions extends OptionsV2 {}
export interface BuilderOptions extends OptionsV2 {}

export const xml2jsParserOptions: ParserOptions = {
  attrkey: "Attributes" /* Prefix that is used to access the attributes. */,
  charkey:
    "Characters" /* Prefix that is used to access the character content. */,
  explicitCharkey: false,
  trim: false /* Trim the whitespace at the beginning and end of text nodes. */,
  normalizeTags: false /* Normalize all tag names to lowercase. */,
  normalize: false /* Trim whitespaces inside text nodes. */,
  explicitRoot: true /* Set this if you want to get the root node in the resulting object. */,
  emptyTag: "" /* what will the value of empty nodes be. */,
  explicitArray: true /* Always put child nodes in an array if true; otherwise an array is created only if there is more than one. */,
  ignoreAttrs: false /* Ignore all XML attributes and only create text nodes. */,
  mergeAttrs: false /* Merge attributes and child elements as properties of the parent, instead of keying attributes off a child attribute object. This option is ignored if ignoreAttrs is false. */,
  validator: undefined /* You can specify a callable that validates the resulting structure somehow, however you want. See unit tests for an example. */,
  xmlns: false /* Give each element a field usually called '$ns' (the first character is the same as attrkey) that contains its local name and namespace URI. */,
  explicitChildren: false /* Put child elements to separate property. Doesn't work with mergeAttrs = true. If element has no children then "children" won't be created. */,
  childkey:
    "" /* Prefix that is used to access child elements if explicitChildren is set to true. */,
  preserveChildrenOrder: false /* Modifies the behavior of explicitChildren so that the value of the "children" property becomes an ordered array. When this is true, every node will also get a #name field whose value will correspond to the XML nodeName, so that you may iterate the "children" array and still be able to determine node names. The named (and potentially unordered) properties are also retained in this configuration at the same level as the ordered "children" array. */,
  charsAsChildren: false /* Determines whether chars should be considered children if explicitChildren is on. */,
  includeWhiteChars: false /* Determines whether whitespace-only text nodes should be included. */,
  strict: true /* Set sax-js to strict or non-strict parsing mode. Defaults to true which is highly recommended, since parsing HTML which is not well-formed XML might yield just about anything. */,
  attrNameProcessors: undefined /* Allows the addition of attribute name processing functions. Accepts an Array of functions. */,
  attrValueProcessors: [
    parseBooleans,
    parseNumbers
  ] /* Allows the addition of attribute value processing functions. Accepts an Array of functions. */,
  tagNameProcessors: undefined /* Allows the addition of tag name processing functions. Accepts an Array of functions. */,
  valueProcessors: undefined /* Allows the addition of element value processing functions. Accepts an Array of functions. */
};

export class Parser {
  private parser: XParser;
  private _settings: ParserOptions;
  get settings(): ParserOptions {
    return this._settings;
  }
  parseString: (xmlString: string) => Promise<string>;
  constructor(options?: ParserOptions) {
    this._settings = Object.assign(xml2jsParserOptions, options);
    this.parser = new XParser(this._settings);
    this.parseString = (xmlString: string) =>
      new Promise((resolve, reject) => {
        this.parser.parseString(xmlString, (err: Error, res: string) => {
          if (err) return reject(err);
          if (!res) return reject(`invalid "Falsey" result: ${res}`);
          return resolve(res);
        });
      });
  }
}

export class Builder {
  private builder: XBuilder;
  private _settings: ParserOptions;
  get settings(): ParserOptions {
    return this._settings;
  }
  buildObject: (obj: any) => string;
  constructor(options?: ParserOptions) {
    this._settings = Object.assign(xml2jsParserOptions, options);
    this.builder = new XBuilder(this._settings);
    this.buildObject = (obj: any) => this.builder.buildObject(obj);
  }
}
