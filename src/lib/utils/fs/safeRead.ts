import { readFile } from "fs";

import * as System from "../System";

export default (absolutePath: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    System.log.read(absolutePath);
    readFile(absolutePath, (err, result) => {
      if (err) {
        if (err.code === "ENOENT") {
          return System.die(`File not found: ${absolutePath}`);
        }
        return reject(err);
      }
      if (result && typeof result === "string") {
        return resolve(safeString(result));
      }
    });
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
