#!/usr/bin/env node
import Yargs from "yargs";
import WareGen from "./index";

const args = Yargs.usage("Usage: $0 [options]")
  .example(
    "$0 -f addwares.xml",
    "generate wares as declared by the addwares.xml"
  )
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "Path to XML file that holds your config")
  .demandOption(["f"])
  .help("h")
  .alias("h", "help").argv;

if (args.file) {
  WareGen(args.file);
}
