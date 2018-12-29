#!/usr/bin/env node
import Yargs from "yargs";
import Generator from "./lib/generator";
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
  const generator = new Generator();
  generator.initialize(args);
}
