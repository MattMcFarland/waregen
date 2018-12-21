import { Signale } from "signale";

export const log = new Signale({
  disabled: false,
  interactive: false,
  stream: process.stdout,
  scope: "waregen"
});

export const die = (msg: string) => {
  log.fatal(msg);
  process.exit(1);
};

process.on("unhandledRejection", err => {
  die(err);
  process.exit(1);
});
