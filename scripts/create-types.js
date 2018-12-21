const jetpack = require("fs-jetpack");
const parseString = require("xml2js").parseString;
const shelljs = require("shelljs");

const xmlFiles = jetpack.find("scripts/xmlSamples", { matching: "*.xml" });

xmlFiles.forEach(xmlFile => {
  const data = jetpack.read(xmlFile);
  parseString(data, (err, result) => {
    const jsonName = xmlFile.split(".")[0] + ".json";
    const RootName = xmlFile.split("__")[1].split(".")[0];
    jetpack.write(jsonName, JSON.stringify(result));
    shelljs.exec(
      `yarn make_types -i XMLTypes/${RootName}.d.ts ${jsonName} ${RootName}`
    );
    shelljs.exec(`rm ${jsonName}`);
  });
});
