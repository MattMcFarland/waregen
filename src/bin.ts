import Yargs from "yargs";
import { log } from "./lib/utils";
import { generate } from "./lib/generator";

const args = Yargs.command("$0 [configXML] [options]", "build things", yargs =>
  yargs.positional("configXmlPath", {
    describe: "path to config file",
    type: "string",
    default: "example.xml"
  })
)
  .example("$0 example.xml", "generate wares as declared by example.xml")
  .alias("f", "force")
  .describe("f", "Force overwrites")
  .help("h")
  .alias("h", "help")
  .help().argv;

if (args.configXmlPath && typeof args.configXmlPath === "string") {
  if (args.force) {
    log.warn("Using force, I sure hope you know what you are doing!");
  }
  generate(args)
    .then(() => {
      log.complete("generation complete");
    })
    .catch(e => {
      log.fatal(e);
    });
}
