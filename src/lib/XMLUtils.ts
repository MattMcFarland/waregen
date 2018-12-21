import Jetpack from "fs-jetpack";
import * as System from "./System";
import XMLDom from "xmldom";
import { XMLWrapper } from "./XMLWrapper";
import XML2JS from "xml2js";
import { promisify } from "util";
import * as XPath from "xpath";

export class XMLUtils {
  static readAbsXMLFile = <T>(absolutePath: string): Promise<XMLWrapper<T>> => {
    return new Promise(async (resolve, reject) => {
      const rawFile = Jetpack.read(absolutePath);

      if (!rawFile) {
        return reject(System.die(`0 bytes ${absolutePath}`));
      }

      if (rawFile && typeof rawFile === "string") {
        const xmlDocument = XMLUtils.parseXMLDocument(rawFile);
        const XmlObject = await XMLUtils.parseXMLObjectAsync(rawFile);
        return resolve(new XMLWrapper(absolutePath, xmlDocument, XmlObject));
      }
      return reject(`invalid XML`);
    });
  };
  static parseXMLObjectAsync = (xmlRawString: string): Promise<any> => {
    const sanitizedXml = XMLUtils.safeString(xmlRawString);
    const parseString = promisify(new XML2JS.Parser().parseString);
    return parseString(sanitizedXml);
  };
  static exportNode = (node: any) => {
    return new XML2JS.Builder().buildObject(node);
  };
  static parseXMLDocument = (xmlRawString: string): XMLDocument => {
    const sanitizedXml = XMLUtils.safeString(xmlRawString);
    return new XMLDom.DOMParser().parseFromString(sanitizedXml);
  };

  static safeString = (str: string) => {
    if (str && str.length) {
      str = str
        .trim()
        .replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, function(c) {
          return `&#${XMLUtils.unicodeCharToHexCodePoint(c)};`;
        });
      // replace remaining non-safe characters
      str = str.replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g, "");
    }
    return str.trim();
  };

  static unicodeCharToHexCodePoint = function(char: string) {
    const code = char.codePointAt(0);
    const hex = (code && code.toString(16)) || "";
    const result = "0000".substring(0, 4 - hex.length) + hex;
    return result;
  };
}
