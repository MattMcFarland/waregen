import * as XPath from "xpath";
import XML2JS from "xml2js";

export class XMLWrapper<T> {
  XMLDocument: XMLDocument;
  XMLObject: T;
  xpath: (_s: string) => XPath.SelectedValue[];
  path: string;
  Builder: XML2JS.Builder;
  constructor(path: string, doc: XMLDocument, xmlObject: T) {
    this.XMLDocument = doc;
    this.xpath = (_s: string) => XPath.select(_s, doc);
    this.XMLObject = xmlObject;
    this.path = path;
    this.Builder = XML2JS.Builder.prototype;
  }
}
