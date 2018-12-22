import XML2JS from "xml2js";
import fs from "fs";

export class XMLWrapper<T> {
  private XMLObject: T;

  get InnerXML() {
    return new XML2JS.Builder().buildObject(this.XMLObject);
  }
  get definition() {
    return this.XMLObject;
  }
  public path: string;

  public toJSON = () => JSON.stringify(this.XMLObject, null, 2);

  public save = (savePath?: string) =>
    fs.writeFileSync(savePath || this.path, this.InnerXML);

  public parseString = async (str: string) => {
    XML2JS.parseString(
      str,
      (err, res) =>
        new Promise(resolve => {
          this.XMLObject = res;
          return resolve(true);
        })
    );
  };

  constructor(path: string, xmlObject: T) {
    this.XMLObject = xmlObject;
    this.path = path;
  }
}
