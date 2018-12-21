import { Signale } from "signale";
import chalk from "chalk";
export const log = new Signale({
  disabled: false,
  interactive: false,
  stream: process.stdout,
  scope: "waregen",
  types: {
    process: {
      badge: "🍳",
      color: "gray",
      label: "process"
    },
    skip: {
      badge: "🔽",
      color: "yellow",
      label: "skip"
    },
    write: {
      badge: "📝",
      color: "blue",
      label: "write"
    },
    update: {
      badge: "💉",
      color: "green",
      label: "update"
    },
    read: {
      badge: "🔍",
      color: "gray",
      label: "read"
    }
  }
});

export const die = (msg: string) => {
  log.fatal(msg);
  process.exit(1);
};

process.on("unhandledRejection", err => {
  die(err);
  process.exit(1);
});
