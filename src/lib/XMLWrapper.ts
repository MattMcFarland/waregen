import * as XPath from "xpath";
import XML2JS from "xml2js";
import fs from "fs";

export class XMLWrapper<T> {
  XMLObject: T;
  xpath: (_s: string) => XPath.SelectedValue[];
  path: string;
  Builder: XML2JS.Builder;
  save: (savePatH: string) => void;
  get InnerXML() {
    return new XML2JS.Builder().buildObject(this.XMLObject);
  }
  constructor(path: string, xmlObject: T) {
    this.XMLObject = xmlObject;
    this.path = path;
    this.Builder = XML2JS.Builder.prototype;
    this.save = savePath => fs.writeFileSync(savePath, this.InnerXML);
  }
}
