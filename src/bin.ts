#!/usr/bin/env node
import Yargs from "yargs";
import { generate } from "./lib";

const args = Yargs.command("$0 [configXML] [options]", "build things", yargs =>
  yargs.positional("configXML", {
    describe: "path to your configXML",
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

if (args.configXML) {
  generate(args.configXML, Boolean(args.force));
}
