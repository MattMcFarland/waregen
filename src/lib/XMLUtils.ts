import Jetpack from "fs-jetpack";
import * as System from "./System";
import { XMLWrapper } from "./XMLWrapper";
import XML2JS from "xml2js";
import { promisify } from "util";
import Path from "path";

export class XMLUtils {
  static readAbsXMLFile = <T>(absolutePath: string): Promise<XMLWrapper<T>> => {
    return new Promise(async (resolve, reject) => {
      const rawFile = Jetpack.read(absolutePath);

      if (!rawFile) {
        return reject(System.die(`0 bytes ${absolutePath}`));
      }

      if (rawFile && typeof rawFile === "string") {
        const XmlObject = await XMLUtils.parseXMLObjectAsync(rawFile);
        return resolve(new XMLWrapper(absolutePath, XmlObject));
      }
      return reject(`invalid XML`);
    });
  };
  static getOrCreate = <T>(
    absolutePath: string,
    obj: T
  ): Promise<XMLWrapper<T>> => {
    return new Promise(async (resolve, reject) => {
      const rawFile = Jetpack.read(absolutePath);
      if (!rawFile) {
        System.log.write(absolutePath);
        Jetpack.dir(
          absolutePath
            .split(Path.sep)
            .slice(0, -1)
            .join(Path.sep)
        );
        const builder = new XML2JS.Builder();
        const parser = new XML2JS.Parser();

        const xml = builder.buildObject(obj);
        return await new XMLWrapper(absolutePath, parser.parseString(xml));
      } else {
        System.log.update(absolutePath);
        return await XMLUtils.readAbsXMLFile<T>(absolutePath);
      }
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
