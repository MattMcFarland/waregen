import jetpack from "fs-jetpack";
import Parser from "../src/lib/utils/xml/Parser";
import Path from "path";

const shelljs = require("shelljs");

const xmlSamplesPath = Path.resolve(process.cwd(), "src/assets/xmlSamples");

const xmlFiles = jetpack.find(xmlSamplesPath, {
  matching: "*.xml"
});
console.log("xmlFiles found:\n  ", xmlFiles.join("\n  "));

const parser = new Parser();

xmlFiles.forEach(async (xmlFile: string) => {
  const data = jetpack.read(xmlFile);
  if (data) {
    const xmlObject = await parser.parseString(data);
    const jsonName = xmlFile.split(".")[0] + ".json";
    const RootName = xmlFile.split("__")[1].split(".")[0];
    jetpack.write(jsonName, JSON.stringify(xmlObject));
    shelljs.exec(
      `yarn make_types -i src/lib/XMLTypes/${RootName}.ts ${jsonName} ${RootName}`
    );
    shelljs.exec(`rm ${jsonName}`);
  }
});
