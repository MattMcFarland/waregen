import log from "./logger";
import Path from "path";
import Jetpack from "fs-jetpack";

export default (configXmlPath: string, force: boolean) => {
  if (force) {
    log.warn("FORCE ENABLED - I sure hope you know what you are doing!");
  }
  const configXmlFullPath = Path.resolve(process.cwd(), configXmlPath);
  const configXmlStat = Jetpack.inspect(configXmlFullPath);
  if (!configXmlStat) {
    log.fatal(`${configXmlFullPath} not found!`);
    process.exit(1);
  }
};
