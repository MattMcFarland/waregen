require("yargs")
  .command(
    "use [path]",
    "path to your generation xml",
    (yargs: any) => {},
    (argv: any) => {
      if (argv.verbose) console.info(`start server on :${argv.port}`);
    }
  )
  .option("verbose", {
    alias: "v",
    default: false
  }).argv;
