import jetpack from "fs-jetpack";
import Parser from "../src/lib/utils/xml/Parser";

const shelljs = require("shelljs");

const xmlFiles = jetpack.find("scripts/xmlSamples", { matching: "*.xml" });
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
