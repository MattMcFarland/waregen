import Jetpack from "fs-jetpack";
import * as System from "../System";

export default (absolutePath: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const rawFile = Jetpack.read(absolutePath);
      System.log.read(absolutePath);

      if (!rawFile) {
        return reject(System.die(`0 bytes ${absolutePath}`));
      }

      if (rawFile && typeof rawFile === "string") {
        return resolve(safeString(rawFile));
      }
    } catch (e) {
      return reject(e);
    }
  });
};

const safeString = (str: string) => {
  if (str && str.length) {
    str = str.trim().replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, function(c) {
      return `&#${unicodeCharToHexCodePoint(c)};`;
    });
    // replace remaining non-safe characters
    str = str.replace(/[^\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]/g, "");
  }
  return str.trim();
};

const unicodeCharToHexCodePoint = function(char: string) {
  const code = char.codePointAt(0);
  const hex = (code && code.toString(16)) || "";
  const result = "0000".substring(0, 4 - hex.length) + hex;
  return result;
};
